"use client";

import {
  ShieldCheck,
  BadgeCheck,
  HardHat,
  Drill,
} from "lucide-react";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";



export default function Differentials() {
  const { locale } = useLanguage();

  const t = messages[locale].differentials;

  const icons = [
    
    ShieldCheck,
    BadgeCheck,
    Drill,
    HardHat,
  ];
  console.log(icons);

  const items = t.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));


  return (
    <section
      id="diferenciais"
      className="bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="max-w-3xl">

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
              text-text
            "
          >
            {t.description}
          </p>

        </div>



        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-border
                  bg-white
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-secondary
                  hover:shadow-2xl
                "
              >

                {/* Ícone */}
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-secondary
                    text-white
                    transition
                    group-hover:scale-110
                  "
                >
                  <Icon size={30} />
                </div>



                {/* Número */}
                <span
                  className="
                    mt-8
                    block
                    text-sm
                    font-semibold
                    text-secondary
                  "
                >
                  0{index + 1}
                </span>



                {/* Título */}
                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-primary
                  "
                >
                  {item.title}
                </h3>



                {/* Descrição */}
                <p
                  className="
                    mt-4
                    leading-7
                    text-text
                  "
                >
                  {item.description}
                </p>



                {/* Linha decorativa */}
                <div
                  className="
                    mt-8
                    h-[2px]
                    w-12
                    bg-secondary
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}