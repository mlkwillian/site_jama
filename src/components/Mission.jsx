"use client";
import {
  Award,
  ShieldCheck,
  Target,
} from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Mission() {
  const { locale } = useLanguage();

  const t = messages[locale].mission;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const icons = [
    Award,
    ShieldCheck,
    Target,
  ];

  const values = t.values.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section
      id="missao"
      className="bg-primary py-24"
    >

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div
          className="
            grid
            items-center
            gap-16
            lg:grid-cols-2
          "
        >


          {/* Imagem */}
          <div className="relative">


            <img
              src={`${basePath}/images/mission.jpeg`}
              alt="Equipe da Jama Fundações"
              className="
                h-[650px]
                w-full
                rounded-[32px]
                object-cover
              "
            />



            {/* Card */}
            <div
              className="
                absolute
                bottom-8
                left-8
                rounded-2xl
                bg-white
                p-6
                shadow-xl
              "
            >

              <p className="text-sm text-text">
                {t.card.subtitle}
              </p>


              <h3
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-primary
                "
              >
                {t.card.years}
              </h3>


              <p className="mt-1 text-text">
                {t.card.description}
              </p>

            </div>


          </div>





          {/* Conteúdo */}
          <div>


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
                leading-tight
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
                text-white/70
              "
            >
              {t.description}
            </p>






            {/* Valores */}
            <div className="mt-12 space-y-8">


              {values.map((item, index) => {

                const Icon = item.icon;


                return (

                  <div
                    key={index}
                    className="
                      flex
                      gap-5
                    "
                  >


                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-secondary
                        text-white
                      "
                    >
                      <Icon size={26} />
                    </div>




                    <div>

                      <h3
                        className="
                          text-xl
                          font-semibold
                          text-white
                        "
                      >
                        {item.title}
                      </h3>



                      <p
                        className="
                          mt-2
                          leading-7
                          text-white/60
                        "
                      >
                        {item.description}
                      </p>


                    </div>


                  </div>

                );

              })}


            </div>





            {/* CTA */}
            <a
              href="#contato"
              className="
                mt-12
                inline-flex
                rounded-full
                bg-secondary
                px-7
                py-4
                font-semibold
                text-white
                transition
                hover:bg-secondary-hover
              "
            >
              {t.button}
            </a>


          </div>


        </div>


      </div>

    </section>
  );
}