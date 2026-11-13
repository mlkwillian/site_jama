"use client";
import { useState } from "react";

import {
  ArrowRight,
  Building2,
  Drill,
  Factory,
  Forklift,
  Warehouse,
  Cog,
  SquareSquare,
} from "lucide-react";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const [flippedCard, setFlippedCard] = useState(null);
  const { locale } = useLanguage();

  const t = messages[locale].services;

  const icons = [
    SquareSquare,
    Forklift,
    Warehouse,
    Cog,
    Building2,
    Factory,



  ];

  const services = t.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section
      id="servicos"
      className="bg-white py-24"
    >

      <div
        className="
    mx-auto
    grid
    max-w-7xl
    gap-10
    px-6
    lg:grid-cols-[420px_1fr]
    lg:gap-20
    lg:px-8
  "
      >
        <div className="h-fit lg:sticky lg:top-32">


          <span
            className="
              font-semibold
              uppercase
              tracking-[0.3em]
              text-secondary
            "
          >
            {t.badge}
          </span>




          <h2
            className="
              mt-4
              text-4xl
              font-bold
              leading-tight
              text-primary
              lg:text-5xl
            "
          >
            {t.title}
          </h2>




          <p
            className="
              mt-6
              text-lg
              leading-8
              text-black/60
            "
          >
            {t.description}
          </p>




          <a
            href="#contato"
            className="
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-secondary
              px-6
              py-4
              font-semibold
              text-white
              transition
              hover:bg-secondary-hover
            "
          >
            {t.button}

            <ArrowRight size={18} />

          </a>


        </div>






        {/* Cards */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

          {services.map((service, index) => {

            const Icon = service.icon;
            const isFlipped = flippedCard === index;

            return (

              <div
                key={index}
                className="group min-h-[340px] h-auto [perspective:1000px]"
              >

                <div
                  className={`
  relative
  h-full
  min-h-[340px]
  w-full
  transition-transform
  duration-700
  [transform-style:preserve-3d]
  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
`}
                >

                  {/* FRENTE DO CARD */}
                  <div
                    className="
              absolute
              inset-0
              flex
              flex-col
              rounded-3xl
              border
              border-black/10
              bg-white
              p-8
              transition-all
              duration-300
              hover:border-secondary
              hover:shadow-xl
              [backface-visibility:hidden]
            "
                  >

                    {/* Ícone */}
                    <div
                      className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-primary
                text-secondary-light
              "
                    >
                      <Icon size={26} />
                    </div>

                    {/* Título */}
                    <h3 className="mt-6 text-2xl font-semibold text-primary">
                      {service.title}
                    </h3>

                    {/* Descrição */}
                    <p className="mt-4 leading-7 text-black/60">
                      {service.description}
                    </p>

                    {/* Saiba mais */}
                    <button
                      onClick={() => setFlippedCard(index)}
                      className="
                mt-auto
                flex
                items-center
                gap-2
                pt-6
                font-semibold
                text-secondary
                transition-all
                hover:gap-4
              "
                    >
                      {t.learnMore}
                      <ArrowRight size={18} />
                    </button>

                  </div>


                  {/* VERSO DO CARD */}
                  <div
                    onClick={() => setFlippedCard(null)}
                    className="
    absolute
    inset-0
    flex
    cursor-pointer
    flex-col
    rounded-3xl
    bg-primary
    p-6
    text-white
    [transform:rotateY(180deg)]
    [backface-visibility:hidden]
  "
                  >
                    {/* Ícone */}
                    <div
                      className="
      flex
      h-11
      w-11
      shrink-0
      items-center
      justify-center
      rounded-xl
      bg-secondary
      text-white
    "
                    >
                      <Icon size={22} />
                    </div>

                    {/* Título */}
                    <h3 className="mt-4 text-lg font-semibold">
                      {service.title}
                    </h3>

                    {/* Informações */}
                    <p className="mt-2 text-sm leading-5 text-white/80">
                      {service.details || service.description}
                    </p>

                    {/* Voltar */}
                    <span
                      className="
      mt-auto
      pt-3
      text-xs
      font-semibold
      text-secondary-light
    "
                    >
                      ← Clique para voltar
                    </span>
                  </div>

                </div>

              </div>

            );

          })}

        </div>


      </div>


    </section>
  );
}