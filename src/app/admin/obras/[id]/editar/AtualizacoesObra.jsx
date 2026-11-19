
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function AtualizacoesObra({ obraId }) {
  const [atualizacoes, setAtualizacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const hoje = new Date().toLocaleDateString("en-CA");

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    percentual: "",
    data_atualizacao: hoje,
  });

  async function carregarAtualizacoes() {
    setCarregando(true);

    const supabase = createClient();

    const { data, error } = await supabase
      .from("obra_atualizacoes")
      .select("*")
      .eq("obra_id", obraId)
      .order("data_atualizacao", { ascending: false });

    if (error) {
      setErro(error.message);
    } else {
      setAtualizacoes(data || []);
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarAtualizacoes();
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
      percentual: "",
      data_atualizacao: hoje,
    });

    setEditandoId(null);
  }

  async function salvarAtualizacao(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (!form.titulo.trim()) {
      setErro("Informe o título da atualização.");
      return;
    }

    if (!form.data_atualizacao) {
      setErro("Informe a data da atualização.");
      return;
    }

    const percentual =
      form.percentual === "" ? null : Number(form.percentual);

    if (
      percentual !== null &&
      (!Number.isFinite(percentual) || percentual < 0 || percentual > 100)
    ) {
      setErro("O percentual deve estar entre 0 e 100.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      const dados = {
        obra_id: obraId,
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim() || null,
        percentual,
        data_atualizacao: form.data_atualizacao,
      };

      let resultado;

      if (editandoId) {
        resultado = await supabase
          .from("obra_atualizacoes")
          .update(dados)
          .eq("id", editandoId)
          .eq("obra_id", obraId);
      } else {
        resultado = await supabase
          .from("obra_atualizacoes")
          .insert(dados);
      }

      if (resultado.error) throw resultado.error;

      setSucesso(
        editandoId
          ? "Atualização editada com sucesso!"
          : "Atualização publicada com sucesso!"
      );

      limparFormulario();
      await carregarAtualizacoes();
    } catch (error) {
      setErro(error.message || "Não foi possível salvar a atualização.");
    } finally {
      setSalvando(false);
    }
  }

  function editarAtualizacao(item) {
    setEditandoId(item.id);

    setForm({
      titulo: item.titulo || "",
      descricao: item.descricao || "",
      percentual: item.percentual ?? "",
      data_atualizacao: item.data_atualizacao || hoje,
    });

    setErro("");
    setSucesso("");
  }

  async function excluirAtualizacao(id) {
    if (!window.confirm("Deseja excluir esta atualização?")) return;

    setErro("");
    setSucesso("");

    const supabase = createClient();

    const { error } = await supabase
      .from("obra_atualizacoes")
      .delete()
      .eq("id", id)
      .eq("obra_id", obraId);

    if (error) {
      setErro(error.message);
      return;
    }

    setSucesso("Atualização excluída com sucesso!");

    if (editandoId === id) limparFormulario();

    await carregarAtualizacoes();
  }

  function formatarData(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <section className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Atualizações da obra
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Registre notícias, acontecimentos e avanços do projeto.
        </p>
      </div>

      <form
        onSubmit={salvarAtualizacao}
        className="space-y-4 rounded-xl border border-gray-200 p-5"
      >
        <h3 className="font-semibold text-gray-800">
          {editandoId ? "Editar atualização" : "Nova atualização"}
        </h3>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Título *
          </label>

          <input
            name="titulo"
            value={form.titulo}
            onChange={atualizarCampo}
            required
            placeholder="Ex.: Conclusão da primeira etapa das fundações"
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
            rows={4}
            placeholder="Descreva o que aconteceu na obra..."
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Data da atualização *
            </label>

            <input
              type="date"
              name="data_atualizacao"
              value={form.data_atualizacao}
              onChange={atualizarCampo}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Percentual da obra (%)
            </label>

            <input
              type="number"
              name="percentual"
              min="0"
              max="100"
              step="0.01"
              value={form.percentual}
              onChange={atualizarCampo}
              placeholder="Ex.: 45"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500">
          O percentual é opcional. Deixe vazio se não quiser informar.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {salvando
              ? "Salvando..."
              : editandoId
                ? "Salvar alterações"
                : "Publicar atualização"}
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
          Histórico de atualizações ({atualizacoes.length})
        </h3>

        {carregando ? (
          <p className="text-sm text-gray-500">
            Carregando atualizações...
          </p>
        ) : atualizacoes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-700">
              Nenhuma atualização cadastrada.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Publique a primeira atualização utilizando o formulário acima.
            </p>
          </div>
        ) : (
          atualizacoes.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {formatarData(item.data_atualizacao)}
                  </p>

                  <h4 className="mt-2 font-semibold text-gray-800">
                    {item.titulo}
                  </h4>

                  {item.descricao && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                      {item.descricao}
                    </p>
                  )}

                  {item.percentual !== null &&
                    item.percentual !== undefined && (
                      <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {item.percentual}% de progresso
                      </span>
                    )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => editarAtualizacao(item)}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirAtualizacao(item.id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
