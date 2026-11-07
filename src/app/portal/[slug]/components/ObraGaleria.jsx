"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ObraGaleria({ obraNome, capaUrl, imagens = [] }) {
  const listaImagens = [
    ...(capaUrl ? [{ url: capaUrl, descricao: "Imagem principal" }] : []),
    ...imagens
      .filter((imagem) => imagem.url && imagem.url !== capaUrl)
      .map((imagem) => ({
        url: imagem.url,
        descricao: imagem.descricao || "",
      })),
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (listaImagens.length <= 1 || pausado) return;

    const intervalo = setInterval(() => {
      setIndiceAtual((atual) => (atual + 1) % listaImagens.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [listaImagens.length, pausado]);

  if (!listaImagens.length) return null;

  function anterior() {
    setIndiceAtual((atual) =>
      atual === 0 ? listaImagens.length - 1 : atual - 1
    );
  }

  function proxima() {
    setIndiceAtual((atual) => (atual + 1) % listaImagens.length);
  }

  const imagemAtual = listaImagens[indiceAtual];

  return (
    <section
      className="mt-5 w-full rounded-2xl border border-white/[0.09] bg-[#151515] p-4 sm:p-5"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)] gap-3">

        {/* MINIATURAS À ESQUERDA */}
        {listaImagens.length > 1 && (
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[380px] order-2 md:order-1">
            {listaImagens.map((imagem, indice) => (
              <button
                key={`${imagem.url}-${indice}`}
                type="button"
                onClick={() => setIndiceAtual(indice)}
                aria-label={`Ver imagem ${indice + 1}`}
                aria-current={indiceAtual === indice}
                className={`relative flex-shrink-0 w-20 h-16 md:w-full md:h-[68px] overflow-hidden rounded-lg border-2 transition-all ${indiceAtual === indice
                  ? "border-orange-500 opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={imagem.url}
                  alt={`${obraNome} - imagem ${indice + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* IMAGEM PRINCIPAL */}
        <div className="relative order-1 md:order-2 min-w-0">
          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
            <img
              key={imagemAtual.url}
              src={imagemAtual.url}
              alt={imagemAtual.descricao || obraNome}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Gradiente para os controles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* SETA ANTERIOR */}
            {listaImagens.length > 1 && (
              <button
                type="button"
                onClick={anterior}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* SETA PRÓXIMA */}
            {listaImagens.length > 1 && (
              <button
                type="button"
                onClick={proxima}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* CONTADOR */}
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 text-white text-xs px-3 py-1">
              {indiceAtual + 1} / {listaImagens.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}