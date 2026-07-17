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
                border-b
                border-black/10
                pb-5
              "
            >

              <div>

                <p className="text-sm text-black/50">
                  {t.badge}
                </p>


                <h3 className="text-xl font-bold text-primary">
                  {t.dashboard.project}
                </h3>

              </div>



              <span
                className="
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
            <div className="mt-8">


              <div className="flex justify-between">

                <span className="text-black/60">
                  {t.dashboard.progress}
                </span>


                <span className="font-bold text-primary">
                  30%
                </span>


              </div>




              <div className="mt-3 h-3 rounded-full bg-black/10">

                <div
                  className="
                    h-3
                    w-[30%]
                    rounded-full
                    bg-secondary
                  "
                />

              </div>


            </div>






            {/* Cards */}
            <div className="mt-8 grid gap-4">


              {cards.map((item, index) => {

                const Icon = item.icon;


                return (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      bg-black/5
                      p-4
                    "
                  >

                    <Icon
                      className="text-secondary"
                    />


                    <div>

                      <h4 className="font-semibold text-primary">
                        {item.title}
                      </h4>


                      <p className="text-sm text-black/50">
                        {item.text}
                      </p>


                    </div>


                  </div>

                );

              })}


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
          <a
            href="#"
            className="
              mt-10
              inline-flex
              items-center
              gap-2
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

            <ArrowRight size={18} />

          </a>


        </div>


      </div>


    </section>
  );
}