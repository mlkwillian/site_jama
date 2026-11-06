
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const supabase = await createClient();

    const { data: obra } = await supabase
        .from("obras")
        .select("nome, descricao")
        .eq("slug", slug)
        .eq("publicada", true)
        .single();

    return {
        title: obra
            ? `${obra.nome} | JAMA Fundações`
            : "Obra | JAMA Fundações",
        description: obra?.descricao || "Conheça nossos projetos.",
    };
}

export default async function ObraDetalhesPage({ params }) {
    const { slug } = await params;

    const supabase = await createClient();

    const { data: obra, error } = await supabase
        .from("obras")
        .select(`
      id,
      nome,
      slug,
      descricao,
      cidade,
      estado,
      data_inicio,
      previsao_conclusao,
      percentual,
      status,
      responsavel_tecnico,
      registro_profissional,
      capa_url
    `)
        .eq("slug", slug)
        .eq("publicada", true)
        .single();

    if (error || !obra) notFound();

    const { data: imagens } = await supabase
        .from("obra_imagens")
        .select("id, url, descricao, ordem")
        .eq("obra_id", obra.id)
        .order("ordem", { ascending: true });

    const statusLabel = {
        planejada: "Planejada",
        em_andamento: "Em andamento",
        concluida: "Concluída",
    };

    function formatarData(data) {
        if (!data) return "Não informado";

        return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
    }

    return (
        <main className="min-h-screen bg-gray-50">

            <section className="bg-primary px-6 py-12 text-white">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/portal"
                        className="text-sm font-semibold text-white/70 hover:text-white"
                    >
                        ← Voltar ao portfólio
                    </Link>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                        JAMA Fundações
                    </p>

                    <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                        {obra.nome}
                    </h1>

                    <p className="mt-4 text-white/70">
                        {[obra.cidade, obra.estado].filter(Boolean).join(" - ")}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">

                {obra.capa_url && (
                    <div className="mb-12 overflow-hidden rounded-2xl">
                        <img
                            src={obra.capa_url}
                            alt={obra.nome}
                            className="h-[280px] w-full object-cover md:h-[480px]"
                        />
                    </div>
                )}

                {imagens && imagens.length > 0 && (
                    <section className="mb-12">
                        <h2 className="mb-6 text-2xl font-bold text-primary">
                            Galeria de fotos
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {imagens.map((imagem) => (
                                <div
                                    key={imagem.id}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    <img
                                        src={imagem.url}
                                        alt={imagem.descricao || `Foto da obra ${obra.nome}`}
                                        className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid gap-10 lg:grid-cols-3">

                    <div className="space-y-10 lg:col-span-2">

                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                Sobre o projeto
                            </h2>

                            <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
                                {obra.descricao || "Informações deste projeto em breve."}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                Andamento da obra
                            </h2>

                            <div className="mt-5">
                                <div className="mb-3 flex justify-between font-semibold text-primary">
                                    <span>Progresso da execução</span>
                                    <span>{obra.percentual}%</span>
                                </div>

                                <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-secondary transition-all"
                                        style={{
                                            width: `${obra.percentual}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <aside className="h-fit rounded-2xl bg-white p-7 shadow-sm">
                        <h2 className="text-xl font-bold text-primary">
                            Informações da obra
                        </h2>

                        <div className="mt-6 space-y-6">

                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="mt-1 font-semibold text-primary">
                                    {statusLabel[obra.status] || obra.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Início da obra</p>
                                <p className="mt-1 font-semibold text-primary">
                                    {formatarData(obra.data_inicio)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Previsão de conclusão
                                </p>
                                <p className="mt-1 font-semibold text-primary">
                                    {formatarData(obra.previsao_conclusao)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Responsável técnico
                                </p>
                                <p className="mt-1 font-semibold text-primary">
                                    {obra.responsavel_tecnico || "Não informado"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Registro profissional
                                </p>
                                <p className="mt-1 font-semibold text-primary">
                                    {obra.registro_profissional || "Não informado"}
                                </p>
                            </div>

                        </div>
                    </aside>

                </div>

            </section>
        </main>
    );
}
