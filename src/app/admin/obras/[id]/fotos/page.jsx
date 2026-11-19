
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GaleriaObraForm from "./GaleriaObraForm";

export const metadata = {
  title: "Galeria de Fotos | JAMA Fundações",
};

export default async function FotosObraPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: isAdmin, error: adminError } =
    await supabase.rpc("is_admin");

  if (adminError || !isAdmin) redirect("/admin/login");

  const { data: obra, error: obraError } = await supabase
    .from("obras")
    .select("id, nome")
    .eq("id", id)
    .single();

  if (obraError || !obra) notFound();

  const { data: imagens, error: imagensError } = await supabase
    .from("obra_imagens")
    .select("id, url, descricao, ordem")
    .eq("obra_id", id)
    .order("ordem", { ascending: true });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/admin/obras"
          className="font-semibold text-gray-500 hover:text-primary"
        >
          ← Voltar para obras
        </Link>

        <div className="mb-10 mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            JAMA Fundações
          </p>

          <h1 className="mt-3 text-3xl font-bold text-primary">
            Galeria de fotos
          </h1>

          <p className="mt-2 text-gray-500">
            Obra: {obra.nome}
          </p>
        </div>

        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-primary">
            Adicionar fotografias
          </h2>

          <GaleriaObraForm obraId={obra.id} />
        </section>

        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-primary">
            Fotografias cadastradas ({imagens?.length || 0})
          </h2>

          {imagensError ? (
            <p className="text-red-600">
              Não foi possível carregar as fotografias.
            </p>
          ) : !imagens || imagens.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              Nenhuma fotografia adicionada ainda.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {imagens.map((imagem) => (
                <div
                  key={imagem.id}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={imagem.url}
                    alt={imagem.descricao || "Fotografia da obra"}
                    className="h-52 w-full object-cover"
                  />

                  <p className="truncate p-3 text-sm text-gray-600">
                    {imagem.descricao || "Fotografia da obra"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
