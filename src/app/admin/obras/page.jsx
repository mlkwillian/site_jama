
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
    title: "Gerenciar Obras | JAMA Fundações",
};

export default async function AdminObrasPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/admin/login");

    const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

    if (adminError || !isAdmin) redirect("/admin/login");

    const { data: obras, error } = await supabase
        .from("obras")
        .select(`
      id,
      nome,
      cidade,
      estado,
      status,
      percentual,
      publicada,
      criado_em
    `)
        .order("criado_em", { ascending: false });

    const statusLabel = {
        planejada: "Planejada",
        em_andamento: "Em andamento",
        concluida: "Concluída",
    };

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
                            JAMA Fundações
                        </p>

                        <h1 className="text-3xl font-bold text-primary">
                            Gerenciar Obras
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Visualize e gerencie os projetos cadastrados.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/"
                            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
                        >
                            Voltar ao site
                        </Link>

                        <Link
                            href="/admin/obras/nova"
                            className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:opacity-90"
                        >
                            + Nova obra
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-primary">
                        Obras cadastradas ({obras?.length || 0})
                    </h2>

                    {error ? (
                        <p className="text-red-600">
                            Erro ao carregar as obras: {error.message}
                        </p>
                    ) : !obras || obras.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-gray-500">
                                Nenhuma obra cadastrada ainda.
                            </p>
                            <Link
                                href="/admin/obras/nova"
                                className="mt-4 inline-block font-semibold text-primary underline"
                            >
                                Cadastrar primeira obra
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b text-sm text-gray-500">
                                        <th className="px-4 py-4">Obra</th>
                                        <th className="px-4 py-4">Localização</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4">Progresso</th>
                                        <th className="px-4 py-4">Publicação</th>
                                        <th className="px-4 py-4">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {obras.map((obra) => (
                                        <tr
                                            key={obra.id}
                                            className="border-b last:border-0 hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-5 font-semibold text-primary">
                                                {obra.nome}
                                            </td>

                                            <td className="px-4 py-5 text-gray-600">
                                                {[obra.cidade, obra.estado]
                                                    .filter(Boolean)
                                                    .join(" - ") || "Não informado"}
                                            </td>

                                            <td className="px-4 py-5 text-gray-600">
                                                {statusLabel[obra.status] || obra.status}
                                            </td>

                                            <td className="px-4 py-5 text-gray-600">
                                                {obra.percentual}%
                                            </td>

                                            <td className="px-4 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${obra.publicada
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {obra.publicada ? "Publicada" : "Rascunho"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                <Link
                                                    href={`/admin/obras/${obra.id}/editar`}
                                                    className="font-semibold text-primary hover:underline"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
