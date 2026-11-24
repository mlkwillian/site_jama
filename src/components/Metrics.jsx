"use client";

import CountUp from "react-countup";
import {
  Building2,
  HardHat,
  MapPinned,
  SquareChartGantt,
  SquareSquare,
  Warehouse,
} from "lucide-react";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Metrics() {
  const { locale } = useLanguage();

  const t = messages[locale].metrics;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const icons = [
    Building2,
    SquareChartGantt,
    MapPinned,
    HardHat,
    Warehouse,
    SquareSquare,
  ];

  const metrics = t.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));
  return (
    <section className="bg-primary py-28">

      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">


        {/* Cabeçalho */}
        <div className="mx-auto max-w-3xl text-center">


          <span
            className="
              font-semibold
              uppercase
              tracking-[0.3em]
              text-secondary-light
            "
          >
            {t.badge}
          </span>



          <h2
            className="
              mt-4
              text-4xl
              font-bold
              text-white
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
              text-white/60
            "
          >
            {t.description}
          </p>


        </div>


        <div className="mt-20 grid grid-cols-1 items-center gap-10 xl:grid-cols-[3.2fr_1fr]">

  {/* Cards - mais espaço */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

    {metrics.map((item, index) => {
      const Icon = item.icon;

      return (
        <div
          key={index}
          className="
            group
            flex flex-col
            rounded-3xl
            border border-white/10
            bg-white/[0.04]
            p-6 lg:p-8
            backdrop-blur-xl
            transition-all duration-300
            hover:-translate-y-1.5
            hover:border-secondary/60
            hover:bg-white/[0.07]
            hover:shadow-2xl
          "
        >
          {/* Ícone */}
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-secondary
              text-white
              transition-transform duration-300
              group-hover:scale-110
            "
          >
            <Icon size={28} />
          </div>

          {/* Número */}
          <h3 className="mt-6 text-3xl font-bold text-white lg:text-4xl">
            <CountUp
              end={item.value}
              duration={2.5}
              separator="."
            />

            <span className="text-secondary-light">
              {item.suffix}
            </span>
          </h3>

          {/* Texto */}
          <p className="mt-3 text-base leading-relaxed text-white/70">
            {item.label}
          </p>

          {/* Linha */}
          <div
            className="
              mt-8 h-[2px] w-12
              rounded-full bg-secondary
              transition-all duration-300
              group-hover:w-full
            "
          />
        </div>
      );
    })}

  </div>

  {/* Imagem */}
  <div className="flex items-center justify-center">
    <img
      src={`${basePath}/images/mapa.jpeg`}
      alt="Mapa de atuação da Jama Fundações"
      className="
       w-full
      max-w-[400px]
      h-auto
      rounded-3xl
      object-contain
      transition-transform
      duration-500
      hover:scale-[1.02]
      "
    />
  </div>

</div>
</div>

    </section>
  );
}