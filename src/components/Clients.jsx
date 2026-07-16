"use client";

import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  "/logos/logo1.jpeg",
  "/logos/logo2.jpeg",
  "/logos/logo3.jpeg",
  "/logos/logo4.jpeg",
  "/logos/logo5.jpeg",
  "/logos/logo6.jpeg",
  "/logos/logo7.jpeg",
  "/logos/logo8.jpeg",
  "/logos/logo9.jpeg",
  "/logos/logo10.jpeg",
  "/logos/logo11.jpeg",
  "/logos/logo12.jpeg",
  "/logos/logo13.jpeg",
  "/logos/logo14.jpeg",
  "/logos/logo15.jpeg",
  "/logos/logo16.jpeg",
  "/logos/logo17.jpeg",
  "/logos/logo18.jpeg",
  "/logos/logo19.jpeg",
  "/logos/logo20.jpeg",
  "/logos/logo21.jpeg",
  "/logos/logo22.jpeg",
  "/logos/logo23.jpeg",
];

export default function Clients() {
    const { locale } = useLanguage();

    const t = messages[locale].clients;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center">
          <span
            className="
              text-sm
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
              text-3xl
              font-bold
              text-primary
              lg:text-4xl
            "
          >
            {t.title}
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-text
            "
          >
            {t.description}
          </p>
        </div>


        {/* Carrossel */}
        <div className="relative mt-18 overflow-hidden">

          {/* Fade lateral */}
          <div
            className="
              absolute
              left-0
              top-0
              z-10
              h-full
              w-24
              bg-gradient-to-r
              from-white
              to-transparent
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              z-10
              h-full
              w-24
              bg-gradient-to-l
              from-white
              to-transparent
            "
          />


          <div className="flex animate-marquee gap-20">

            {[...clients, ...clients].map((logo, index) => (
              <div
                key={index}
                className="
                  flex
                  h-20
                  min-w-[180px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-border
                  bg-white
                  px-6
                  transition-all
                  duration-300
                  hover:border-secondary
                  hover:shadow-lg
                "
              >

                <img
                  src={logo}
                  alt="Cliente Jama Fundações"
                  className="
                    max-h-12
                    w-auto
                    object-contain
                    grayscale
                    opacity-70
                    transition-all
                    duration-300
                    hover:grayscale-0
                    hover:opacity-100
                  "
                />

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}