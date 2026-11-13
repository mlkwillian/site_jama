
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    const { data: admin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setErro("Este usuário não tem autorização administrativa.");
      setCarregando(false);
      return;
    }

    router.replace("/admin/obras");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">
            JAMA Fundações
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Área administrativa
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="Seu e-mail administrativo"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Sua senha"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {erro && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-secondary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Acessar painel"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          JAMA Fundações · Acesso restrito
        </p>
      </div>
    </main>
  );
}
