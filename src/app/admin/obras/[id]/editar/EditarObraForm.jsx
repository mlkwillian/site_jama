
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import EtapasObra from "./EtapasObra";
import ProgressoMensal from "./ProgressoMensal";
import AtualizacoesObra from "./AtualizacoesObra";

export default function EditarObraForm({ obra }) {
  const router = useRouter();

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [form, setForm] = useState({
    nome: obra.nome || "",
    descricao: obra.descricao || "",
    cidade: obra.cidade || "",
    estado: obra.estado || "",
    data_inicio: obra.data_inicio || "",
    previsao_conclusao: obra.previsao_conclusao || "",
    percentual: obra.percentual ?? 0,
    status: obra.status || "planejada",
    responsavel_tecnico: obra.responsavel_tecnico || "",
    registro_profissional: obra.registro_profissional || "",
    publicada: obra.publicada ?? false,
    area_construida: obra.area_construida ?? "",
    data_ultimo_acidente: obra.data_ultimo_acidente || "",
  });

  const [capa, setCapa] = useState(null);
  const [modelo3D, setModelo3D] = useState(null);
  const [removerModelo, setRemoverModelo] = useState(false);

  function atualizarCampo(e) {
    const { name, value, type, checked } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function gerarSlug(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function enviarArquivo(arquivo, tipo) {
    const dados = new FormData();
    dados.append("file", arquivo);
    dados.append("tipo", tipo);

    const resposta = await fetch("/api/upload", {
      method: "POST",
      body: dados,
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.error || "Erro ao enviar arquivo.");
    }

    return resultado;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    const percentual = Number(form.percentual);

    if (percentual < 0 || percentual > 100 || !Number.isFinite(percentual)) {
      setErro("O percentual deve estar entre 0 e 100.");
      return;
    }

    if (form.status === "concluida" && percentual !== 100) {
      setErro("Uma obra concluída precisa estar com 100% de progresso.");
      return;
    }

    if (form.status !== "concluida" && percentual === 100) {
      setErro("Uma obra com 100% de progresso deve estar como concluída.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      let imagem = {
        url: obra.capa_url,
        public_id: obra.capa_public_id,
      };

      let modeloUrl = removerModelo ? null : obra.modelo_3d_url || null;

      if (capa) {
        const resultado = await enviarArquivo(capa, "imagem");

        imagem = {
          url: resultado.url,
          public_id: resultado.public_id,
        };
      }

      if (modelo3D) {
        const resultado = await enviarArquivo(modelo3D, "modelo3d");
        modeloUrl = resultado.url;
      }

      const { error } = await supabase
        .from("obras")
        .update({
          ...form,
          percentual,
          area_construida: form.area_construida
            ? Number(form.area_construida)
            : null,
          data_inicio: form.data_inicio || null,
          previsao_conclusao: form.previsao_conclusao || null,
          data_ultimo_acidente: form.data_ultimo_acidente || null,
          slug: gerarSlug(form.nome),
          capa_url: imagem.url,
          capa_public_id: imagem.public_id,
          modelo_3d_url: modeloUrl,
        })
        .eq("id", obra.id);

      if (error) throw error;

      setSucesso("Obra atualizada com sucesso!");
      setCapa(null);
      setModelo3D(null);
      setRemoverModelo(false);

      router.refresh();
    } catch (error) {
      setErro(error.message || "Não foi possível atualizar a obra.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/obras"
            className="text-sm font-semibold text-gray-500 hover:text-primary"
          >
            ← Voltar para obras
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-primary">
            Gerenciar obra
          </h1>

          <p className="mt-2 text-gray-500">
            Gerencie os dados e as informações técnicas do projeto.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
        >
          <section className="space-y-5">
            <h2 className="text-xl font-bold text-primary">
              Informações gerais
            </h2>

            <div>
              <label className="mb-2 block font-medium">Nome da obra *</label>
              <input
                name="nome"
                value={form.nome}
                onChange={atualizarCampo}
                required
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={atualizarCampo}
                rows={4}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">Cidade</label>
                <input
                  name="cidade"
                  value={form.cidade}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Estado</label>
                <input
                  name="estado"
                  value={form.estado}
                  onChange={atualizarCampo}
                  maxLength={2}
                  placeholder="SP"
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Área construída (m²)
                </label>
                <input
                  type="number"
                  name="area_construida"
                  min="0"
                  step="0.01"
                  value={form.area_construida}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-primary">
              Responsabilidade técnica
            </h2>

            <div>
              <label className="mb-2 block font-medium">
                Responsável técnico
              </label>
              <input
                name="responsavel_tecnico"
                value={form.responsavel_tecnico}
                onChange={atualizarCampo}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Registro profissional
              </label>
              <input
                name="registro_profissional"
                value={form.registro_profissional}
                onChange={atualizarCampo}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Data do último acidente
              </label>
              <input
                type="date"
                name="data_ultimo_acidente"
                value={form.data_ultimo_acidente}
                onChange={atualizarCampo}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
              <p className="mt-1 text-sm text-gray-500">
                Deixe vazio caso não exista uma data a informar.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-primary">
              Andamento da obra
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">Data de início</label>
                <input
                  type="date"
                  name="data_inicio"
                  value={form.data_inicio}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Previsão de conclusão
                </label>
                <input
                  type="date"
                  name="previsao_conclusao"
                  value={form.previsao_conclusao}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Percentual concluído
                </label>
                <input
                  type="number"
                  name="percentual"
                  min="0"
                  max="100"
                  value={form.percentual}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={atualizarCampo}
                  className="w-full rounded-lg border border-gray-300 p-3"
                >
                  <option value="planejada">Planejada</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluida">Concluída</option>
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-primary">Imagem de capa</h2>

            {obra.capa_url && (
              <div>
                <p className="mb-2 text-sm text-gray-500">Imagem atual:</p>
                <img
                  src={obra.capa_url}
                  alt="Capa atual da obra"
                  className="h-48 w-full rounded-xl object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setCapa(e.target.files?.[0] || null)}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <p className="text-sm text-gray-500">
              Selecione uma nova imagem somente se desejar substituir a atual.
              Limite de 10 MB.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-primary">
              Modelo 3D da obra
            </h2>

            {obra.modelo_3d_url && !removerModelo && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 font-medium text-gray-700">
                  Modelo 3D cadastrado
                </p>
                <a
                  href={obra.modelo_3d_url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm text-blue-600 underline"
                >
                  Abrir arquivo atual
                </a>

                <button
                  type="button"
                  onClick={() => setRemoverModelo(true)}
                  className="mt-3 block text-sm font-semibold text-red-600"
                >
                  Remover modelo atual
                </button>
              </div>
            )}

            {removerModelo && (
              <p className="text-sm text-orange-700">
                O modelo atual será removido do cadastro ao salvar.
                <button
                  type="button"
                  onClick={() => setRemoverModelo(false)}
                  className="ml-2 font-semibold underline"
                >
                  Desfazer
                </button>
              </p>
            )}

            <input
              type="file"
              accept=".glb,model/gltf-binary"
              onChange={(e) => {
                const arquivo = e.target.files?.[0];

                if (!arquivo) {
                  setModelo3D(null);
                  return;
                }

                if (!arquivo.name.toLowerCase().endsWith(".glb")) {
                  setErro("Selecione um arquivo no formato GLB.");
                  e.target.value = "";
                  return;
                }

                if (arquivo.size > 50 * 1024 * 1024) {
                  setErro("O modelo 3D deve ter no máximo 50 MB.");
                  e.target.value = "";
                  return;
                }

                setErro("");
                setModelo3D(arquivo);
                setRemoverModelo(false);
              }}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {modelo3D && (
              <p className="text-sm text-gray-600">
                Novo arquivo: {modelo3D.name} (
                {(modelo3D.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}

            <p className="text-sm text-gray-500">
              Envie um arquivo GLB de até 50 MB. Um novo arquivo substituirá
              o endereço do modelo anterior no cadastro.
            </p>
          </section>

          <section>
            <label className="flex items-center gap-3 font-medium">
              <input
                type="checkbox"
                name="publicada"
                checked={form.publicada}
                onChange={atualizarCampo}
                className="h-5 w-5"
              />
              Publicar esta obra no portal público
            </label>
          </section>

          {erro && (
            <p className="rounded-lg bg-red-50 p-4 text-red-700">{erro}</p>
          )}

          {sucesso && (
            <p className="rounded-lg bg-green-50 p-4 text-green-700">
              {sucesso}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={salvando}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>

            <Link
              href="/admin/obras"
              className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </Link>
          </div>
        </form>
        <EtapasObra obraId={obra.id} />
        <ProgressoMensal obraId={obra.id} />
        <AtualizacoesObra obraId={obra.id} />
      </div>
    </main>
  );
}
