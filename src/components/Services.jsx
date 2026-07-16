"use client";

import {
  ArrowRight,
  Building2,
  Drill,
  Factory,
  LandPlot,
  Pickaxe,
  Warehouse,
} from "lucide-react";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { locale } = useLanguage();

  const t = messages[locale].services;

  const icons = [
    Drill,
    LandPlot,
    Warehouse,
    Pickaxe,
    Building2,
    Factory,
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
         <div
        className="
            grid
            w-full
            grid-cols-1
            gap-6
            md:grid-cols-2
        "
    >


          {services.map((service, index) => {

            const Icon = service.icon;


            return (

              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-black/10
                  bg-white
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-secondary
                  hover:shadow-xl
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
                    transition
                    group-hover:bg-secondary
                    group-hover:text-white
                  "
                >
                  <Icon size={26} />
                </div>





                {/* Título */}
                <h3
                  className="
                    mt-6
                    text-2xl
                    font-semibold
                    text-primary
                  "
                >
                  {service.title}
                </h3>





                {/* Descrição */}
                <p
                  className="
                    mt-4
                    leading-7
                    text-black/60
                  "
                >
                  {service.description}
                </p>





                {/* Link */}
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
                  {t.learnMore}

                  <ArrowRight size={18} />

                </button>



              </div>

            );

          })}


        </div>


      </div>


    </section>
  );
}