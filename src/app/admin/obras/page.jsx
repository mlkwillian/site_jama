
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Painel Administrativo | JAMA Fundações",
};

export default async function AdminObrasPage() {
  const supabase = await createClient();

  // Verifica se existe uma sessão autenticada
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Confirma se o usuário está cadastrado como administrador
  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-primary px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              JAMA Fundações
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Painel administrativo
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary">
            Gerenciamento de obras
          </h2>
          <p className="mt-2 text-gray-500">
            Gerencie os projetos publicados no portal da JAMA.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-primary">
            Bem-vindo ao painel!
          </h3>

          <p className="mt-3 text-gray-600">
            Sua área administrativa está pronta para receber
            os recursos de cadastro e gerenciamento de obras.
          </p>

          <p className="mt-6 text-sm text-gray-400">
            Usuário autenticado: {user.email}
          </p>
        </div>
      </section>
    </main>
  );
}
