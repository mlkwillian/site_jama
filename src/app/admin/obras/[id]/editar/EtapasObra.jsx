
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function EtapasObra({ obraId }) {
  const [etapas, setEtapas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    status: "pendente",
    percentual: 0,
    data_inicio: "",
    data_conclusao: "",
  });

  const [editandoId, setEditandoId] = useState(null);

  async function carregarEtapas() {
    setCarregando(true);
    setErro("");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("obra_etapas")
      .select("*")
      .eq("obra_id", obraId)
      .order("ordem", { ascending: true });

    if (error) {
      setErro(error.message);
    } else {
      setEtapas(data || []);
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarEtapas();
  }, [obraId]);

  function atualizarCampo(e) {
    const { name, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function limparFormulario() {
    setForm({
      titulo: "",
      descricao: "",
      status: "pendente",
      percentual: 0,
      data_inicio: "",
      data_conclusao: "",
    });

    setEditandoId(null);
  }

  async function salvarEtapa(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    const percentual = Number(form.percentual);

    if (percentual < 0 || percentual > 100) {
      setErro("O percentual deve estar entre 0 e 100.");
      return;
    }

    if (form.status === "concluida" && percentual !== 100) {
      setErro("Uma etapa concluída precisa estar com 100%.");
      return;
    }

    if (form.status !== "concluida" && percentual === 100) {
      setErro("Uma etapa com 100% deve estar como concluída.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      const dados = {
        obra_id: obraId,
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim() || null,
        status: form.status,
        percentual,
        data_inicio: form.data_inicio || null,
        data_conclusao:
          form.status === "concluida"
            ? form.data_conclusao || null
            : null,
      };

      let resultado;

      if (editandoId) {
        resultado = await supabase
          .from("obra_etapas")
          .update(dados)
          .eq("id", editandoId)
          .eq("obra_id", obraId);
      } else {
        resultado = await supabase
          .from("obra_etapas")
          .insert({
            ...dados,
            ordem: etapas.length + 1,
          });
      }

      if (resultado.error) throw resultado.error;

      setSucesso(
        editandoId
          ? "Etapa atualizada com sucesso!"
          : "Etapa cadastrada com sucesso!"
      );

      limparFormulario();
      await carregarEtapas();
    } catch (error) {
      setErro(error.message || "Não foi possível salvar a etapa.");
    } finally {
      setSalvando(false);
    }
  }

  function editarEtapa(etapa) {
    setEditandoId(etapa.id);

    setForm({
      titulo: etapa.titulo || "",
      descricao: etapa.descricao || "",
      status: etapa.status || "pendente",
      percentual: etapa.percentual ?? 0,
      data_inicio: etapa.data_inicio || "",
      data_conclusao: etapa.data_conclusao || "",
    });

    setErro("");
    setSucesso("");
  }

  async function excluirEtapa(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta etapa?"
    );

    if (!confirmar) return;

    setErro("");
    setSucesso("");

    const supabase = createClient();

    const { error } = await supabase
      .from("obra_etapas")
      .delete()
      .eq("id", id)
      .eq("obra_id", obraId);

    if (error) {
      setErro(error.message);
      return;
    }

    setSucesso("Etapa excluída com sucesso!");
    if (editandoId === id) limparFormulario();

    await carregarEtapas();
  }

  return (
    <section className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Etapas da obra
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Cadastre e acompanhe cada fase da execução.
        </p>
      </div>

      <form onSubmit={salvarEtapa} className="space-y-4 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800">
          {editandoId ? "Editar etapa" : "Nova etapa"}
        </h3>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Nome da etapa *
          </label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={atualizarCampo}
            required
            placeholder="Ex.: Execução das fundações"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={atualizarCampo}
            rows={3}
            placeholder="Descreva os serviços desta etapa..."
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
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
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={atualizarCampo}
              className="w-full rounded-lg border border-gray-300 p-3"
            >
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Data de início
            </label>
            <input
              type="date"
              name="data_inicio"
              value={form.data_inicio}
              onChange={atualizarCampo}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Data de conclusão
            </label>
            <input
              type="date"
              name="data_conclusao"
              value={form.data_conclusao}
              onChange={atualizarCampo}
              disabled={form.status !== "concluida"}
              className="w-full rounded-lg border border-gray-300 p-3 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {salvando ? "Salvando..." : editandoId ? "Salvar etapa" : "Cadastrar etapa"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limparFormulario}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700"
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {erro && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {erro}
        </p>
      )}

      {sucesso && (
        <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {sucesso}
        </p>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">
          Etapas cadastradas ({etapas.length})
        </h3>

        {carregando ? (
          <p className="text-sm text-gray-500">Carregando etapas...</p>
        ) : etapas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-700">
              Nenhuma etapa cadastrada.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Utilize o formulário acima para cadastrar a primeira etapa.
            </p>
          </div>
        ) : (
          etapas.map((etapa) => (
            <div
              key={etapa.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {etapa.titulo}
                  </h4>

                  {etapa.descricao && (
                    <p className="mt-1 text-sm text-gray-500">
                      {etapa.descricao}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                      {etapa.status === "concluida"
                        ? "Concluída"
                        : etapa.status === "em_andamento"
                          ? "Em andamento"
                          : "Pendente"}
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                      {etapa.percentual ?? 0}% concluído
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${etapa.percentual ?? 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => editarEtapa(etapa)}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirEtapa(etapa.id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
