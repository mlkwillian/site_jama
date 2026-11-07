
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const filtros = [
  { id: "todas", label: "Todas" },
  { id: "em_andamento", label: "Em andamento" },
  { id: "concluida", label: "Concluídas" },
  { id: "planejada", label: "Planejada" },
];

const statusConfig = {
  planejada: {
    label: "Planejada",
    color: "bg-[#202020] text-gray-400",
  },
  em_andamento: {
    label: "Em andamento",
    color: "bg-[#092713] text-[#35c65a]",
  },
  concluida: {
    label: "Concluída",
    color: "bg-[#06264b] text-[#55a6ff]",
  },
};

export default function ObrasLista({ obras }) {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todas");

  const obrasFiltradas = useMemo(() => {
    return obras.filter((obra) => {
      const pesquisa = busca.toLowerCase().trim();

      const correspondeBusca =
        obra.nome?.toLowerCase().includes(pesquisa) ||
        obra.cidade?.toLowerCase().includes(pesquisa) ||
        obra.estado?.toLowerCase().includes(pesquisa);

      const correspondeFiltro =
        filtroAtivo === "todas" || obra.status === filtroAtivo;

      return correspondeBusca && correspondeFiltro;
    });
  }, [obras, busca, filtroAtivo]);

  return (
    <div>

      {/* TÍTULO */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Todas as obras
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          {obrasFiltradas.length} de {obras.length} obras
        </p>
      </div>

      {/* PESQUISA E FILTROS */}
      <div className="mb-4 flex flex-wrap items-center gap-2">

        <div className="min-w-[220px] flex-1">
          <input
            type="text"
            placeholder="Buscar por nome ou cidade"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="h-[38px] w-full rounded-xl border border-[#303030] bg-[#1b1b1b] px-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#209d83]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroAtivo(filtro.id)}
              className={`h-[38px] rounded-xl border px-3 text-xs font-medium transition ${
                filtroAtivo === filtro.id
                  ? "border-[#209d83] bg-[#10271f] text-[#35c65a]"
                  : "border-[#303030] bg-[#1b1b1b] text-gray-400 hover:border-[#555] hover:text-white"
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>

      </div>

      {/* LISTAGEM */}
      {obrasFiltradas.length > 0 ? (

        <div className="overflow-hidden rounded-xl border border-[#303030] bg-[#191919]">

          {obrasFiltradas.map((obra) => {
            const percentual = Math.min(
              100,
              Math.max(0, Number(obra.percentual) || 0)
            );

            const status =
              statusConfig[obra.status] || {
                label: obra.status || "Indefinido",
                color: "bg-[#202020] text-gray-400",
              };

            return (
              <Link
                key={obra.id}
                href={`/portal/${obra.slug}`}
                className="group flex min-h-[65px] flex-wrap items-center justify-between gap-4 border-b border-[#303030] px-4 py-3 transition last:border-b-0 hover:bg-[#242424]"
              >

                {/* NOME E LOCALIZAÇÃO */}
                <div className="min-w-[190px] flex-1">
                  <h3 className="text-sm font-semibold text-gray-100 transition group-hover:text-[#35b99c]">
                    {obra.nome}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {obra.cidade} - {obra.estado}
                  </p>
                </div>

                {/* PROGRESSO */}
                <div className="flex min-w-[210px] flex-1 items-center gap-3">

                  <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#101010]">
                    <div
                      className="h-full rounded-full bg-[#209d83] transition-all duration-500"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>

                  <span className="w-10 text-right text-xs font-semibold text-gray-200">
                    {percentual}%
                  </span>

                </div>

                {/* STATUS */}
                <div className="flex min-w-[110px] items-center justify-between gap-3">
                  <span
                    className={`w-[94px] rounded-md px-2 py-1 text-center text-[11px] font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>

                  <span className="text-lg text-gray-400 transition group-hover:translate-x-1 group-hover:text-white">
                    ›
                  </span>
                </div>

              </Link>
            );
          })}

        </div>

      ) : (

        <div className="rounded-xl border border-[#303030] bg-[#191919] px-6 py-16 text-center">
          <h3 className="text-lg font-semibold text-white">
            Nenhuma obra encontrada
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Tente alterar sua pesquisa ou selecionar outro filtro.
          </p>

          <button
            onClick={() => {
              setBusca("");
              setFiltroAtivo("todas");
            }}
            className="mt-5 text-sm font-semibold text-[#35b99c] hover:underline"
          >
            Limpar filtros
          </button>
        </div>

      )}

    </div>
  );
}
