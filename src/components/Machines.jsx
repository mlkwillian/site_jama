
"use client";

import { ArrowRight, Truck, Settings2 } from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Equipment() {
    const { locale } = useLanguage();

    const t = messages[locale].equipment;
    const equipments = t.items;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    return (
        <section id="equipment" className="bg-background py-24">
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

                    
                </div>


                {/* Cards */}
                <div className="mt-16 grid gap-8 grid-cols-2">
                    {equipments.map((item, index) => (
                        <article
                            key={index}
                            className="
        group flex flex-col overflow-hidden
        rounded-3xl border border-border
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-secondary hover:shadow-xl
        md:flex-row
      "
                        >
                            {/* Imagem */}
                            <div className="relative h-72 overflow-hidden md:h-auto md:w-1/2">
                                <img
                                    src={`${basePath}${item.image}`}
                                    alt={item.title}
                                    className="
            h-full w-full object-cover
            transition duration-700
            group-hover:scale-110
          "
                                />

                                <div className="
          absolute inset-0
          bg-gradient-to-t
          from-primary/60 via-transparent to-transparent
          md:bg-gradient-to-r
          md:from-transparent md:to-primary/10
        " />

                                <span className="
          absolute bottom-5 left-6
          flex items-center gap-2
          rounded-full bg-secondary px-4 py-2
          text-sm font-semibold text-white
        ">
                                    <Truck size={16} />
                                    {item.category}
                                </span>
                            </div>

                            {/* Conteúdo */}
                            <div className="
        flex flex-1 flex-col justify-center
        p-8 md:w-1/2 lg:p-10
      ">
                                <h3 className="text-2xl font-bold text-primary lg:text-3xl">
                                    {item.title}
                                </h3>

                                <p className="mt-5 leading-7 text-text">
                                    {item.description}
                                </p>

                                <div className="
          mt-6 flex items-center gap-2
          text-sm font-medium text-secondary
        ">
                                    <Settings2 size={18} />
                                    {item.application}
                                </div>

                                <a
                                    href="#contact"
                                    className="
            mt-8 flex w-fit items-center gap-2
            font-semibold text-secondary
            transition-all group-hover:gap-4
          "
                                >
                                    {t.detailsButton}
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>


            </div>
        </section>
    );
}
