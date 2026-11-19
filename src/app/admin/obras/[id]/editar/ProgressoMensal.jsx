
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function ProgressoMensal({ obraId }) {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    mes_referencia: "",
    percentual_previsto: 0,
    percentual_realizado: 0,
  });

  async function carregarRegistros() {
    setCarregando(true);

    const supabase = createClient();

    const { data, error } = await supabase
      .from("obra_progresso_mensal")
      .select("*")
      .eq("obra_id", obraId)
      .order("mes_referencia", { ascending: true });

    if (error) {
      setErro(error.message);
    } else {
      setRegistros(data || []);
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarRegistros();
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
      mes_referencia: "",
      percentual_previsto: 0,
      percentual_realizado: 0,
    });

    setEditandoId(null);
  }

  async function salvarRegistro(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    const previsto = Number(form.percentual_previsto);
    const realizado = Number(form.percentual_realizado);

    if (
      previsto < 0 ||
      previsto > 100 ||
      realizado < 0 ||
      realizado > 100
    ) {
      setErro("Os percentuais devem estar entre 0 e 100.");
      return;
    }

    if (!form.mes_referencia) {
      setErro("Informe o mês de referência.");
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();

      const dados = {
        obra_id: obraId,
        mes_referencia: `${form.mes_referencia}-01`,
        percentual_previsto: previsto,
        percentual_realizado: realizado,
      };

      let resultado;

      if (editandoId) {
        resultado = await supabase
          .from("obra_progresso_mensal")
          .update(dados)
          .eq("id", editandoId)
          .eq("obra_id", obraId);
      } else {
        resultado = await supabase
          .from("obra_progresso_mensal")
          .insert(dados);
      }

      if (resultado.error) throw resultado.error;

      setSucesso(
        editandoId
          ? "Progresso mensal atualizado!"
          : "Progresso mensal cadastrado!"
      );

      limparFormulario();
      await carregarRegistros();
    } catch (error) {
      setErro(
        error.code === "23505"
          ? "Já existe um registro para esse mês. Edite o registro existente."
          : error.message || "Não foi possível salvar o progresso."
      );
    } finally {
      setSalvando(false);
    }
  }

  function editarRegistro(registro) {
    setEditandoId(registro.id);

    setForm({
      mes_referencia: registro.mes_referencia.slice(0, 7),
      percentual_previsto: registro.percentual_previsto ?? 0,
      percentual_realizado: registro.percentual_realizado ?? 0,
    });

    setErro("");
    setSucesso("");
  }

  async function excluirRegistro(id) {
    if (!window.confirm("Deseja excluir este registro mensal?")) return;

    setErro("");
    setSucesso("");

    const supabase = createClient();

    const { error } = await supabase
      .from("obra_progresso_mensal")
      .delete()
      .eq("id", id)
      .eq("obra_id", obraId);

    if (error) {
      setErro(error.message);
      return;
    }

    setSucesso("Registro excluído com sucesso!");

    if (editandoId === id) limparFormulario();

    await carregarRegistros();
  }

  function formatarMes(data) {
    const [ano, mes] = data.slice(0, 7).split("-");
    const dataFormatada = new Date(Number(ano), Number(mes) - 1, 1);

    return dataFormatada.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Progresso mensal
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Compare o avanço planejado com o avanço real da obra.
        </p>
      </div>

      <form
        onSubmit={salvarRegistro}
        className="space-y-4 rounded-xl border border-gray-200 p-5"
      >
        <h3 className="font-semibold text-gray-800">
          {editandoId ? "Editar mês" : "Cadastrar mês"}
        </h3>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Mês de referência *
          </label>

          <input
            type="month"
            name="mes_referencia"
            value={form.mes_referencia}
            onChange={atualizarCampo}
            required
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Percentual previsto
            </label>

            <input
              type="number"
              name="percentual_previsto"
              min="0"
              max="100"
              step="0.01"
              value={form.percentual_previsto}
              onChange={atualizarCampo}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Percentual realizado
            </label>

            <input
              type="number"
              name="percentual_realizado"
              min="0"
              max="100"
              step="0.01"
              value={form.percentual_realizado}
              onChange={atualizarCampo}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>

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
                : "Cadastrar progresso"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limparFormulario}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700"
            >
              Cancelar
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
          Histórico mensal ({registros.length})
        </h3>

        {carregando ? (
          <p className="text-sm text-gray-500">Carregando histórico...</p>
        ) : registros.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-700">
              Nenhum progresso mensal cadastrado.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Cadastre o primeiro mês para começar o histórico.
            </p>
          </div>
        ) : (
          registros.map((registro) => (
            <div
              key={registro.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold capitalize text-gray-800">
                    {formatarMes(registro.mes_referencia)}
                  </h4>

                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    <span className="text-gray-600">
                      Previsto: <strong>{registro.percentual_previsto}%</strong>
                    </span>

                    <span className="text-gray-600">
                      Realizado: <strong>{registro.percentual_realizado}%</strong>
                    </span>
                  </div>

                  <p className={`mt-2 text-sm font-medium ${
                    Number(registro.percentual_realizado) >= Number(registro.percentual_previsto)
                      ? "text-green-700"
                      : "text-orange-700"
                  }`}>
                    {Number(registro.percentual_realizado) >= Number(registro.percentual_previsto)
                      ? "Dentro ou acima do previsto"
                      : "Abaixo do previsto"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => editarRegistro(registro)}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirRegistro(registro.id)}
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
