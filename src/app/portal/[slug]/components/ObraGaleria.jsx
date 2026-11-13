
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const textosGaleria = {
  pt: {
    mainImage: "Imagem principal",
    viewImage: "Ver imagem",
    previous: "Imagem anterior",
    next: "Próxima imagem",
  },
  en: {
    mainImage: "Main image",
    viewImage: "View image",
    previous: "Previous image",
    next: "Next image",
  },
};

export default function ObraGaleria({
  obraNome,
  capaUrl,
  imagens = [],
  locale = "pt",
}) {
  const t = textosGaleria[locale] || textosGaleria.pt;

  const listaImagens = [
    ...(capaUrl ? [{ url: capaUrl, descricao: t.mainImage }] : []),
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
    setIndiceAtual(0);
  }, [obraNome]);

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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[120px_minmax(0,1fr)]">

        {listaImagens.length > 1 && (
          <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:max-h-[380px] md:flex-col md:overflow-y-auto">
            {listaImagens.map((imagem, indice) => (
              <button
                key={`${imagem.url}-${indice}`}
                type="button"
                onClick={() => setIndiceAtual(indice)}
                aria-label={`${t.viewImage} ${indice + 1}`}
                aria-current={indiceAtual === indice}
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-[68px] md:w-full ${
                  indiceAtual === indice
                    ? "border-orange-500 opacity-100"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={imagem.url}
                  alt={`${obraNome} - ${t.viewImage} ${indice + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="relative order-1 min-w-0 md:order-2">
          <div className="relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 sm:h-[320px] md:h-[380px]">
            <img
              key={imagemAtual.url}
              src={imagemAtual.url}
              alt={imagemAtual.descricao || obraNome}
              className="h-full w-full object-cover transition-opacity duration-500"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {listaImagens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={anterior}
                  aria-label={t.previous}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/75"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={proxima}
                  aria-label={t.next}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/75"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {indiceAtual + 1} / {listaImagens.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
