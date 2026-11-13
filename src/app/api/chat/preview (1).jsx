
"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowRight as ArrowNext,
  Truck,
  Settings2,
} from "lucide-react";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Equipment() {
  const { locale } = useLanguage();

  const t = messages[locale].equipment;
  const equipments = t.items;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section id="equipment" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-semibold uppercase tracking-[0.3em] text-secondary">
              {t.badge}
            </span>

            <h2 className="mt-4 text-4xl font-bold text-primary lg:text-5xl">
              {t.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-text">
              {t.description}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {equipments.map((item, index) => (
            <article
              key={index}
              className="
                group flex flex-col overflow-hidden
                rounded-3xl border border-border
                bg-white shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-secondary hover:shadow-xl
                md:flex-row
              "
            >

              {/* Carrossel */}
              <EquipmentCarousel
                item={item}
                basePath={basePath}
              />

              {/* Conteúdo */}
              <div className="
                flex flex-1 flex-col justify-center
                p-8 md:w-1/2 lg:p-10
              ">
                <h3 className="text-2xl font-bold text-primary lg:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-text">
                  {item.description}
                </p>

                <div className="
                  mt-6 flex items-center gap-2
                  text-sm font-medium text-secondary
                ">
                  <Settings2 size={18} />
                  {item.application}
                </div>

                <a
                  href="#contact"
                  className="
                    mt-8 flex w-fit items-center gap-2
                    font-semibold text-secondary
                    transition-all group-hover:gap-4
                  "
                >
                  {t.detailsButton}
                  <ArrowRight size={18} />
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}


/* Carrossel independente para cada equipamento */
function EquipmentCarousel({ item, basePath }) {
  const images = item.images?.length
    ? item.images
    : [item.image];

  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="
      relative h-72 overflow-hidden
      md:h-auto md:min-h-[350px] md:w-1/2
    ">

      {/* Imagem */}
      <img
        key={current}
        src={`${basePath}${images[current]}`}
        alt={`${item.title} - imagem ${current + 1}`}
        className="
          absolute inset-0
          h-full w-full object-cover
          animate-in fade-in duration-500
        "
      />

      {/* Gradiente */}
      <div className="
        absolute inset-0
        bg-gradient-to-t
        from-primary/60 via-transparent to-transparent
      " />

      {/* Categoria */}
      <span className="
        absolute bottom-5 left-5 z-10
        flex items-center gap-2
        rounded-full bg-secondary px-4 py-2
        text-sm font-semibold text-white
      ">
        <Truck size={16} />
        {item.category}
      </span>

      {/* Setas */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Imagem anterior"
            className="
              absolute left-3 top-1/2 z-10
              flex h-10 w-10 -translate-y-1/2
              items-center justify-center
              rounded-full bg-white/90 text-primary
              shadow-md transition
              hover:bg-secondary hover:text-white
            "
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Próxima imagem"
            className="
              absolute right-3 top-1/2 z-10
              flex h-10 w-10 -translate-y-1/2
              items-center justify-center
              rounded-full bg-white/90 text-primary
              shadow-md transition
              hover:bg-secondary hover:text-white
            "
          >
            <ArrowNext size={20} />
          </button>

          {/* Indicadores */}
          <div className="
            absolute bottom-7 right-5 z-10
            flex items-center gap-2
          ">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ir para imagem ${index + 1}`}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    current === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white"
                  }
                `}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
