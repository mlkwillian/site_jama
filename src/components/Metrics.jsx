"use client";

import CountUp from "react-countup";
import {
  Building2,
  HardHat,
  MapPinned,
  Drill,
} from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Metrics() {
  const { locale } = useLanguage();

  const t = messages[locale].metrics;

  const icons = [
    Building2,
    Drill,
    MapPinned,
    HardHat,
  ];

  const metrics = t.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));
  return (
    <section className="bg-primary py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">


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





        {/* Cards */}
        <div
          className="
            mt-20
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {metrics.map((item, index) => {

            const Icon = item.icon;


            return (
              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur
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
                  "
                >
                  <Icon size={30} />
                </div>





                {/* Número */}
                <h3
                  className="
                    mt-8
                    text-4xl
                    font-bold
                    text-white
                  "
                >

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
                <p
                  className="
                    mt-3
                    text-lg
                    text-white/70
                  "
                >
                  {item.label}
                </p>





                {/* Linha */}
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