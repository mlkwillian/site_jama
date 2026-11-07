import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import ObraDashboard from "./components/ObraDashboard";

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
    title: obra ? `${obra.nome} | JAMA Fundações` : "Obra | JAMA Fundações",
    description: obra?.descricao || "Acompanhe nossos projetos.",
  };
}

export default async function ObraDetalhesPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: obra, error } = await supabase
    .from("obras")
    .select(`
      id, nome, slug, descricao, cidade, estado,
      data_inicio, previsao_conclusao, percentual, status,
      responsavel_tecnico, registro_profissional, capa_url,
      area_construida, data_ultimo_acidente, modelo_3d_url
    `)
    .eq("slug", slug)
    .eq("publicada", true)
    .single();

  if (error || !obra) notFound();

  const [
    { data: imagens },
    { data: etapas },
    { data: atualizacoes },
    { data: progresso },
    { data: obrasPublicadas },
  ] = await Promise.all([
    supabase
      .from("obra_imagens")
      .select("id, url, descricao, ordem")
      .eq("obra_id", obra.id)
      .order("ordem", { ascending: true }),
    supabase
      .from("obra_etapas")
      .select("id, titulo, descricao, status, percentual, data_inicio, data_conclusao, ordem")
      .eq("obra_id", obra.id)
      .order("ordem", { ascending: true }),
    supabase
      .from("obra_atualizacoes")
      .select("id, titulo, descricao, percentual, data_atualizacao")
      .eq("obra_id", obra.id)
      .order("data_atualizacao", { ascending: false })
      .limit(12),
    supabase
      .from("obra_progresso_mensal")
      .select("id, mes_referencia, percentual_previsto, percentual_realizado")
      .eq("obra_id", obra.id)
      .order("mes_referencia", { ascending: true }),
    supabase
      .from("obras")
      .select("nome, slug")
      .eq("publicada", true)
      .order("criado_em", { ascending: true }),
  ]);

  const lista = obrasPublicadas || [];
  const indice = lista.findIndex((item) => item.slug === obra.slug);
  const anterior = indice > 0 ? lista[indice - 1] : null;
  const proxima = indice >= 0 && indice < lista.length - 1 ? lista[indice + 1] : null;

  return (
    <main className="min-h-screen flex flex-col bg-[#141414] text-white">

      {/* HEADER PRINCIPAL */}
      <Header compact />

    <ObraDashboard
      obra={obra}
      imagens={imagens || []}
      etapas={etapas || []}
      atualizacoes={atualizacoes || []}
      progresso={progresso || []}
      anterior={anterior}
      proxima={proxima}
      totalObras={lista.length}
      indiceObra={indice}
    />
    
    </main>
  );
}
