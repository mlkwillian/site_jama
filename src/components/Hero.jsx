"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";



export default function Hero() {
    const { locale } = useLanguage();

    const t = messages[locale].hero;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    return (
        <section className="relative min-h-screen overflow-hidden bg-primary">


            {/* Vídeo Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    "
            >
                <source
                    src={`${basePath}/videos/hero.mp4`}
                    type="video/mp4"
                />
            </video>




            {/* Overlay */}
            <div
                className="
          absolute
          inset-0
          bg-gradient-to-r
          from-primary
          via-primary/90
          to-primary/60
        "
            />



            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-screen
                    max-w-7xl
                    items-center
                    px-6
                    pb-16
                    pt-28
                    lg:px-8
                    "
            >


                <div
                    className="
            max-w-4xl
          "
                >

                    {/* Badge */}
                    <motion.span
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        className="
                            rounded-full
                            border
                            border-secondary/40
                            bg-secondary/20
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-secondary-light
                        "
                    >
                        {t.badge}
                    </motion.span>


                    {/* Título */}
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                        }}
                        className="
                            mt-8
                            text-5xl
                            font-bold
                            leading-tight
                            text-white
                            lg:text-6xl
                        "
                    >
                        {t.title}

                        <span className="block text-secondary-light">
                            {t.titleHighlight}
                        </span>

                    </motion.h1>


                    {/* Descrição */}
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                        }}
                        className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-8
                            text-white/70
                        "
                    >
                        {t.description}
                    </motion.p>



                    {/* Botões */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                        }}
                        className="
                            mt-10
                            flex
                            flex-wrap
                            gap-4
                        "
                    >

                        <a
                            href="#contato"
                            className="
                                flex
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
                            {t.buttons.quote}

                            <ArrowRight size={18} />

                        </a>

                        <a
                            href="#cases"
                            className="
                                rounded-full
                                border
                                border-white/30
                                px-7
                                py-4
                                font-semibold
                                text-white
                                transition
                                hover:bg-white
                                hover:text-primary
                            "
                        >
                            {t.buttons.projects}

                        </a>


                    </motion.div>







                    {/* Indicadores */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                        }}
                        className="
                            mt-16
                            grid
                            grid-cols-3
                            gap-8
                        "
                    >


                        <div>

                            <h3
                                className="
                  text-3xl
                  font-bold
                  text-white
                "
                            >
                                {t.stats.works.value}
                            </h3>

                            <p
                                className="
                  mt-1
                  text-sm
                  text-white/50
                "
                            >
                                {t.stats.works.label}
                            </p>

                        </div>





                        <div>

                            <h3
                                className="
                  text-3xl
                  font-bold
                  text-white
                "
                            >
                                {t.stats.experience.value}
                            </h3>

                            <p
                                className="
                  mt-1
                  text-sm
                  text-white/50
                "
                            >
                                {t.stats.experience.label}
                            </p>

                        </div>





                        <div>

                            <h3
                                className="
                  text-3xl
                  font-bold
                  text-white
                "
                            >
                                {t.stats.commitment.value}
                            </h3>

                            <p
                                className="
                  mt-1
                  text-sm
                  text-white/50
                "
                            >
                                {t.stats.commitment.label}
                            </p>

                        </div>


                    </motion.div>




                </div>


            </div>



        </section >
    );
}