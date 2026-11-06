
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Portfólio de Obras | JAMA Fundações",
  description: "Acompanhe as obras e projetos da JAMA Fundações.",
};

export default async function PortalPage() {
  const supabase = await createClient();

  const { data: obras, error } = await supabase
    .from("obras")
    .select(`
      id,
      nome,
      slug,
      descricao,
      cidade,
      estado,
      status,
      percentual,
      previsao_conclusao,
      capa_url
    `)
    .eq("publicada", true)
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao carregar obras:", error.message);
  }

  const listaObras = error ? [] : obras || [];

  const statusLabel = {
    planejada: "Planejada",
    em_andamento: "Em andamento",
    concluida: "Concluída",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-primary px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-secondary">
            JAMA Fundações
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Nosso Portal de Obras
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Acompanhe nossos projetos, conheça nossas realizações
            e veja de perto a evolução de cada obra.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary">
            Nossas obras
          </h2>

          <p className="mt-3 text-gray-500">
            Conheça os projetos publicados pela JAMA Fundações.
          </p>
        </div>

        {listaObras.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-primary">
              Em breve, novas obras por aqui.
            </h3>

            <p className="mt-3 text-gray-500">
              Estamos preparando nosso portfólio para apresentar
              nossos projetos e realizações.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listaObras.map((obra) => (
              <article
                key={obra.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 bg-gray-200">
                  {obra.capa_url ? (
                    <img
                      src={obra.capa_url}
                      alt={`Fotografia da obra ${obra.nome}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      Fotografia em breve
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-sm font-semibold text-secondary">
                    {statusLabel[obra.status] || obra.status}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-primary">
                    {obra.nome}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {obra.cidade} - {obra.estado}
                  </p>

                  <p className="mt-4 line-clamp-3 text-gray-600">
                    {obra.descricao || "Conheça os detalhes deste projeto."}
                  </p>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-500">Andamento</span>
                      <strong className="text-primary">
                        {obra.percentual}%
                      </strong>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{
                          width: `${obra.percentual}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/portal/${obra.slug}`}
                    className="mt-6 flex items-center justify-center rounded-xl bg-secondary px-5 py-3 font-bold text-white transition hover:brightness-110"
                  >
                    Ver detalhes da obra
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
