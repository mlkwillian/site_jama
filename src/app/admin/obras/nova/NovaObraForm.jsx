
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

function gerarSlug(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function NovaObraForm() {
    const router = useRouter();
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [capa, setCapa] = useState(null);
    const [enviandoImagem, setEnviandoImagem] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        cidade: "",
        estado: "",
        data_inicio: "",
        previsao_conclusao: "",
        percentual: 0,
        status: "planejada",
        responsavel_tecnico: "",
        registro_profissional: "",
        publicada: false,
    });

    function atualizarCampo(e) {
        const { name, value, type, checked } = e.target;

        setForm((atual) => ({
            ...atual,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "percentual"
                        ? Number(value)
                        : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (
            form.status === "concluida" &&
            form.percentual !== 100
        ) {
            setErro("Uma obra concluída precisa estar com 100% de execução.");
            return;
        }

        setSalvando(true);

        const supabase = createClient();

        let imagem = {
            url: null,
            public_id: null,
        };

        // Envia a capa ao Cloudinary, caso tenha sido selecionada
        if (capa) {
            setEnviandoImagem(true);

            const dadosImagem = new FormData();
            dadosImagem.append("file", capa);

            const resposta = await fetch("/api/upload", {
                method: "POST",
                body: dadosImagem,
            });

            const resultadoImagem = await resposta.json();

            setEnviandoImagem(false);

            if (!resposta.ok) {
                setErro(resultadoImagem.error || "Erro ao enviar a imagem.");
                setSalvando(false);
                return;
            }

            imagem = {
                url: resultadoImagem.url,
                public_id: resultadoImagem.public_id,
            };
        }

        // Salva a obra no Supabase
        const { error } = await supabase.from("obras").insert({
            ...form,
            data_inicio: form.data_inicio || null,
            previsao_conclusao: form.previsao_conclusao || null,
            slug: gerarSlug(form.nome),
            capa_url: imagem.url,
            capa_public_id: imagem.public_id,
        });

        if (error) {
            setErro(
                error.code === "23505"
                    ? "Já existe uma obra com esse nome. Altere o nome para gerar outro endereço."
                    : `Não foi possível salvar a obra: ${error.message}`
            );
            setSalvando(false);
            return;
        }

        setSucesso("Obra cadastrada com sucesso!");
        setSalvando(false);
    }

    const campos = [
        {
            name: "nome",
            label: "Nome da obra",
            required: true,
            placeholder: "Ex.: Fundação Industrial São Paulo",
        },
        {
            name: "cidade",
            label: "Cidade",
            required: true,
            placeholder: "Cidade da obra",
        },
        {
            name: "estado",
            label: "Estado (UF)",
            required: true,
            placeholder: "Ex.: SP",
        },
        {
            name: "responsavel_tecnico",
            label: "Responsável técnico",
            placeholder: "Nome do responsável",
        },
        {
            name: "registro_profissional",
            label: "Registro profissional",
            placeholder: "Ex.: CREA 000000",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/admin/obras"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    ← Voltar ao painel
                </Link>

                <div className="mb-8 mt-6">
                    <h1 className="text-3xl font-bold text-primary">
                        Cadastrar nova obra
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Preencha as informações do novo projeto.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
                >
                    <section>
                        <h2 className="mb-5 text-xl font-bold text-primary">
                            Informações gerais
                        </h2>

                        <section>
                            <h2 className="mb-5 text-xl font-bold text-primary">
                                Imagem de capa
                            </h2>

                            <div className="rounded-xl border border-dashed border-gray-300 p-6">
                                <label className="mb-3 block text-sm font-medium">
                                    Selecione a foto principal da obra
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => setCapa(e.target.files?.[0] || null)}
                                    className="w-full text-sm"
                                />

                                {capa && (
                                    <p className="mt-3 text-sm text-green-700">
                                        Imagem selecionada: {capa.name}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-gray-500">
                                    Formatos JPG, PNG ou WEBP. Tamanho máximo: 10 MB.
                                </p>
                            </div>
                        </section>

                        <div className="grid gap-5 md:grid-cols-2">
                            {campos.slice(0, 3).map((campo) => (
                                <div key={campo.name}>
                                    <label className="mb-2 block text-sm font-medium">
                                        {campo.label}
                                    </label>
                                    <input
                                        name={campo.name}
                                        value={form[campo.name]}
                                        onChange={atualizarCampo}
                                        required={campo.required}
                                        placeholder={campo.placeholder}
                                        maxLength={campo.name === "estado" ? 2 : undefined}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium">
                                Descrição da obra
                            </label>
                            <textarea
                                name="descricao"
                                value={form.descricao}
                                onChange={atualizarCampo}
                                rows={5}
                                placeholder="Descreva o projeto, os serviços realizados e seus diferenciais."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-5 text-xl font-bold text-primary">
                            Dados técnicos
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                            {campos.slice(3).map((campo) => (
                                <div key={campo.name}>
                                    <label className="mb-2 block text-sm font-medium">
                                        {campo.label}
                                    </label>
                                    <input
                                        name={campo.name}
                                        value={form[campo.name]}
                                        onChange={atualizarCampo}
                                        placeholder={campo.placeholder}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-5 text-xl font-bold text-primary">
                            Cronograma e andamento
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Data de início
                                </label>
                                <input
                                    type="date"
                                    name="data_inicio"
                                    value={form.data_inicio}
                                    onChange={atualizarCampo}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Previsão de conclusão
                                </label>
                                <input
                                    type="date"
                                    name="previsao_conclusao"
                                    value={form.previsao_conclusao}
                                    onChange={atualizarCampo}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Percentual de execução
                                </label>
                                <input
                                    type="number"
                                    name="percentual"
                                    min="0"
                                    max="100"
                                    value={form.percentual}
                                    onChange={atualizarCampo}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Status da obra
                                </label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={atualizarCampo}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                >
                                    <option value="planejada">Planejada</option>
                                    <option value="em_andamento">Em andamento</option>
                                    <option value="concluida">Concluída</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 p-5">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="publicada"
                                checked={form.publicada}
                                onChange={atualizarCampo}
                                className="h-5 w-5"
                            />
                            <span className="font-medium text-primary">
                                Publicar esta obra no portal público
                            </span>
                        </label>
                        <p className="mt-2 text-sm text-gray-500">
                            Se deixar desmarcado, a obra será cadastrada como rascunho.
                        </p>
                    </section>

                    {erro && (
                        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                            {erro}
                        </p>
                    )}

                    {sucesso && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                            {sucesso}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4">
                        <button
                            type="submit"
                            disabled={salvando}
                            className="rounded-lg bg-secondary px-7 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {enviandoImagem
                                ? "Enviando imagem..."
                                : salvando
                                    ? "Salvando..."
                                    : "Salvar obra"}
                        </button>

                        {sucesso && (
                            <button
                                type="button"
                                onClick={() => router.push("/admin/obras")}
                                className="rounded-lg border border-gray-300 px-7 py-3 font-semibold text-primary"
                            >
                                Voltar ao painel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
