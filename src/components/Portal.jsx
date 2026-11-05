"use client";
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  FileText,
  UserRound,
  Clock,
} from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Portal() {
  const { locale } = useLanguage();

  const t = messages[locale].portal;

  const icons = [
    CalendarDays,
    FileText,
    UserRound,
    Clock,
    CircleCheck,

  ];

  const cards = t.dashboard.cards.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section className="bg-white py-24">

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          px-6
          lg:grid-cols-2
          lg:px-8
        "
      >


       
{/* Dashboard */}
<div className="order-2 lg:order-1">

  <div
    className="
      rounded-[32px]
      border
      border-black/10
      bg-white
      p-6
      shadow-2xl
    "
  >

    {/* Topo */}
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-black/10
        pb-6
      "
    >

      <div>

        <p className="text-sm text-black/50">
          {t.badge}
        </p>

        <h3 className="text-2xl font-bold leading-tight text-primary">
          {t.dashboard.project}
        </h3>

      </div>

      <span
        className="
          shrink-0
          rounded-full
          bg-secondary/10
          px-4
          py-2
          text-sm
          font-semibold
          text-secondary
        "
      >
        {t.dashboard.status}
      </span>

    </div>


    {/* Progresso */}
    <div className="py-8">

      <div className="flex items-center justify-between mb-4">

        <span className="text-base text-black/50">
          {t.dashboard.progress}
        </span>

        <span className="text-3xl font-bold text-secondary">
          85%
        </span>

      </div>

      {/* Barra de progresso */}
      <div className="h-4 w-full overflow-hidden rounded-full bg-black/10">

        <div
          className="
            h-full
            w-[85%]
            rounded-full
            bg-secondary
          "
        />

      </div>

      <div className="mt-3 flex justify-between text-sm text-black/40">
        <span>Início</span>
        <span>Entrega</span>
      </div>

    </div>


    {/* Rodapé */}
    <div className="border-t border-black/10 pt-7">

      <p className="mb-6 text-base leading-relaxed text-black/50">
        {t.dashboard.description}
      </p>

      <a
        href="#portal"
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-[20px]
          bg-secondary
          px-6
          py-5
          text-lg
          font-bold
          text-white
          transition-all
          duration-300
          hover:brightness-110
          hover:shadow-lg
        "
      >
        {t.dashboard.button} →
      </a>

    </div>

  </div>

</div>





        {/* Texto */}
        <div className="order-1 lg:order-2">


          <span
            className="
              font-semibold
              uppercase
              tracking-[0.3em]
              text-secondary
            "
          >
            {t.dashboard.label}
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





          {/* Lista */}
          <div className="mt-10 space-y-5">


            {t.features.map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <CircleCheck
                  className="text-secondary"
                  size={22}
                />


                <span className="text-black/70">
                  {item}
                </span>


              </div>

            ))}


          </div>





          {/* CTA */}
          {/* CTA */}



        </div>


      </div>


    </section>
  );
}