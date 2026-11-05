
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

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
    publicada: obra.publicada || false,
  });

  const [capa, setCapa] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (form.status === "concluida" && Number(form.percentual) !== 100) {
      setErro("Uma obra concluída precisa estar com 100% de progresso.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      let imagem = {
        url: obra.capa_url,
        public_id: obra.capa_public_id,
      };

      if (capa) {
        const dadosImagem = new FormData();
        dadosImagem.append("file", capa);

        const resposta = await fetch("/api/upload", {
          method: "POST",
          body: dadosImagem,
        });

        const resultadoImagem = await resposta.json();

        if (!resposta.ok) {
          throw new Error(
            resultadoImagem.error || "Erro ao enviar a imagem."
          );
        }

        imagem = {
          url: resultadoImagem.url,
          public_id: resultadoImagem.public_id,
        };
      }

      const { error } = await supabase
        .from("obras")
        .update({
          ...form,
          percentual: Number(form.percentual),
          data_inicio: form.data_inicio || null,
          previsao_conclusao: form.previsao_conclusao || null,
          slug: gerarSlug(form.nome),
          capa_url: imagem.url,
          capa_public_id: imagem.public_id,
        })
        .eq("id", obra.id);

      if (error) throw error;

      setSucesso("Obra atualizada com sucesso!");

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
            Editar obra
          </h1>

          <p className="mt-2 text-gray-500">
            Atualize as informações do projeto.
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
            <h2 className="text-xl font-bold text-primary">
              Imagem de capa
            </h2>

            {obra.capa_url && (
              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Imagem atual:
                </p>
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
            <p className="rounded-lg bg-red-50 p-4 text-red-700">
              {erro}
            </p>
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
      </div>
    </main>
  );
}
