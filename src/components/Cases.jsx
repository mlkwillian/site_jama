import { ArrowRight, MapPin } from "lucide-react";

const cases = [
  {
    image: "/images/cases/case-1.jpg",
    title: "Centro Logístico Alpha",
    city: "São Paulo • SP",
    service: "Estacas Hélice Contínua",
  },
  {
    image: "/images/cases/case-2.jpg",
    title: "Shopping Plaza",
    city: "Campinas • SP",
    service: "Fundações Profundas",
  },
  {
    image: "/images/cases/case-3.jpg",
    title: "Complexo Industrial Beta",
    city: "Sorocaba • SP",
    service: "Contenções",
  },
  {
    image: "/images/cases/case-4.jpg",
    title: "Hospital Regional",
    city: "Ribeirão Preto • SP",
    service: "Estacas Escavadas",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-semibold uppercase tracking-[0.3em] text-secondary">
              Cases de Sucesso
            </span>

            <h2 className="mt-4 text-4xl font-bold text-primary lg:text-5xl">
              Obras que reforçam nossa experiência.
            </h2>

            <p className="mt-6 text-lg leading-8 text-text">
              Cada projeto é executado com planejamento, segurança e precisão,
              entregando resultados que geram confiança aos nossos clientes.
            </p>
          </div>

          <a
            href="#contato"
            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-secondary
              transition-all
              hover:gap-4
            "
          >
            Ver todos os projetos
            <ArrowRight size={18} />
          </a>
        </div>


        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {cases.map((item, index) => (
            <article
              key={index}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-secondary
                hover:shadow-2xl
              "
            >

              {/* Imagem */}
              <div className="relative h-80 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />


                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-primary
                    via-primary/30
                    to-transparent
                  "
                />


                <span
                  className="
                    absolute
                    left-6
                    top-6
                    rounded-full
                    bg-secondary
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {item.service}
                </span>

              </div>


              {/* Conteúdo */}
              <div className="p-8">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text
                  "
                >
                  <MapPin
                    size={16}
                    className="text-secondary"
                  />

                  {item.city}
                </div>


                <h3
                  className="
                    mt-3
                    text-2xl
                    font-bold
                    text-primary
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    mt-4
                    leading-7
                    text-text
                  "
                >
                  Execução de fundações com alto padrão técnico,
                  equipe especializada e acompanhamento completo da obra.
                </p>


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
                  Ver detalhes
                  <ArrowRight size={18} />
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}