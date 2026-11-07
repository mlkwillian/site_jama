
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
    const [modelo3D, setModelo3D] = useState(null);
    const [etapaUpload, setEtapaUpload] = useState("");

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

    function selecionarModelo(e) {
        const arquivo = e.target.files?.[0];

        if (!arquivo) return;

        if (!arquivo.name.toLowerCase().endsWith(".glb")) {
            setErro("Selecione um arquivo no formato GLB.");
            e.target.value = "";
            return;
        }

        if (arquivo.size > 50 * 1024 * 1024) {
            setErro("O modelo 3D deve ter no máximo 50 MB.");
            e.target.value = "";
            return;
        }

        setErro("");
        setModelo3D(arquivo);
    }

    async function enviarArquivo(arquivo, tipo) {
        const dados = new FormData();

        dados.append("file", arquivo);
        dados.append("tipo", tipo);

        const resposta = await fetch("/api/upload", {
            method: "POST",
            body: dados,
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.error || "Erro ao enviar arquivo.");
        }

        return resultado;
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

        try {
            const supabase = createClient();

            let imagem = {
                url: null,
                public_id: null,
            };

            let modeloUrl = null;

            // Envia a capa
            if (capa) {
                setEtapaUpload("Enviando imagem de capa...");

                imagem = await enviarArquivo(capa, "imagem");
            }

            // Envia o modelo 3D
            if (modelo3D) {
                setEtapaUpload("Enviando modelo 3D...");

                const resultadoModelo = await enviarArquivo(
                    modelo3D,
                    "modelo3d"
                );

                modeloUrl = resultadoModelo.url;
            }

            setEtapaUpload("Salvando obra...");

            const { error } = await supabase.from("obras").insert({
                ...form,
                data_inicio: form.data_inicio || null,
                previsao_conclusao: form.previsao_conclusao || null,
                slug: gerarSlug(form.nome),
                capa_url: imagem.url,
                capa_public_id: imagem.public_id,
                modelo_3d_url: modeloUrl,
            });

            if (error) {
                throw new Error(
                    error.code === "23505"
                        ? "Já existe uma obra com esse nome. Altere o nome para gerar outro endereço."
                        : `Não foi possível salvar a obra: ${error.message}`
                );
            }

            setSucesso("Obra cadastrada com sucesso!");
            setEtapaUpload("");
        } catch (error) {
            setErro(error.message || "Ocorreu um erro ao cadastrar a obra.");
            setEtapaUpload("");
        } finally {
            setSalvando(false);
        }
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

                    {/* INFORMAÇÕES GERAIS */}
                    <section>
                        <h2 className="mb-5 text-xl font-bold text-primary">
                            Informações gerais
                        </h2>

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

                    {/* IMAGEM DE CAPA */}
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
                                JPG, PNG ou WEBP. Máximo: 10 MB.
                            </p>
                        </div>
                    </section>

                    {/* MODELO 3D */}
                    <section>
                        <h2 className="mb-2 text-xl font-bold text-primary">
                            Modelo 3D da obra
                        </h2>

                        <p className="mb-5 text-sm text-gray-500">
                            Adicione uma maquete virtual para os visitantes
                            explorarem a construção no portal.
                        </p>

                        <div className="rounded-xl border border-dashed border-gray-300 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                                    <span className="text-2xl">🏗️</span>
                                </div>

                                <div>
                                    <p className="font-semibold text-primary">
                                        Arquivo do modelo 3D
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Formato GLB • Até 50 MB
                                    </p>
                                </div>
                            </div>

                            <input
                                type="file"
                                accept=".glb,model/gltf-binary"
                                onChange={selecionarModelo}
                                className="w-full text-sm"
                            />

                            {modelo3D && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-green-50 p-3">
                                    <div>
                                        <p className="text-sm font-semibold text-green-800">
                                            {modelo3D.name}
                                        </p>

                                        <p className="text-xs text-green-700">
                                            {(modelo3D.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setModelo3D(null)}
                                        className="text-sm font-semibold text-red-600 hover:underline"
                                    >
                                        Remover
                                    </button>
                                </div>
                            )}

                            <p className="mt-3 text-xs text-gray-500">
                                O modelo será enviado automaticamente ao Cloudinary
                                quando você cadastrar a obra. Esse campo é opcional.
                            </p>
                        </div>
                    </section>

                    {/* DADOS TÉCNICOS */}
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

                    {/* CRONOGRAMA */}
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

                    {/* PUBLICAÇÃO */}
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

                    {/* MENSAGENS */}
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

                    {etapaUpload && (
                        <p className="text-sm font-medium text-blue-700">
                            {etapaUpload}
                        </p>
                    )}

                    {/* BOTÕES */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            type="submit"
                            disabled={salvando}
                            className="rounded-lg bg-secondary px-7 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {salvando ? "Aguarde..." : "Salvar obra"}
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
