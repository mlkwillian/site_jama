"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Cases() {
  const { locale } = useLanguage();

  const t = messages[locale].cases;

  const cases = t.items.map((item) => ({
    ...item,
  }));

  return (
    <section id="cases" className="bg-background py-24">
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

          <a
            href="https://www.instagram.com/fundacoesjama/"
            target="_blank"
            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-secondary
              transition-all
              hover:gap-4
            "
          >
            {t.button}
            <ArrowRight size={18} />
          </a>
        </div>


        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {cases.map((item, index) => (
            <article
              key={index}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-secondary
                hover:shadow-2xl
              "
            >

              {/* Imagem */}
              <div className="relative h-80 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />


                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-primary
                    via-primary/30
                    to-transparent
                  "
                />




              </div>


              {/* Conteúdo */}
              <div className="p-8">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text
                  "
                >
                  <MapPin
                    size={16}
                    className="text-secondary"
                  />

                  {item.city}
                </div>


                <h3
                  className="
                    mt-3
                    text-2xl
                    font-bold
                    text-primary
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    mt-4
                    leading-7
                    text-text
                  "
                >
                  {item.description}
                </p>


                <button
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-secondary
                    transition-all
                    group-hover:gap-4
                  "
                >
                  {t.detailsButton}
                  <ArrowRight size={18} />
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}