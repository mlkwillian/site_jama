
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import ObrasLista from "./ObrasLista";
import RodapePortal from "./RodapePortal";

export const metadata = {
  title: "Todas as obras | JAMA Fundações",
  description: "Acompanhe o andamento das obras da JAMA Fundações.",
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

  return (
    <main className="min-h-screen flex flex-col bg-[#141414] text-white">

      {/* HEADER PRINCIPAL */}
      <Header compact />

      {/* CONTEÚDO */}
      <section className="mx-auto w-full max-w-[1180px] flex-1 px-6 pb-14 pt-[150px]">

        <ObrasLista obras={listaObras} />

      </section>

      {/* RODAPÉ */}
      <RodapePortal />

    </main>
  );
}
