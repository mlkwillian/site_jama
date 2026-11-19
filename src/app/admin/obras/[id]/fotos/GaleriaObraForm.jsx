
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GaleriaObraForm({ obraId, imagensIniciais }) {
  const router = useRouter();

  const [arquivos, setArquivos] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function selecionarArquivos(e) {
    const selecionados = Array.from(e.target.files || []);

    const validos = selecionados.filter((arquivo) =>
      ["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)
    );

    if (validos.length !== selecionados.length) {
      setErro("Utilize apenas imagens JPG, PNG ou WEBP.");
    } else {
      setErro("");
    }

    const acimaDoLimite = validos.some(
      (arquivo) => arquivo.size > 10 * 1024 * 1024
    );

    if (acimaDoLimite) {
      setErro("Cada imagem deve ter no máximo 10 MB.");
      return;
    }

    setArquivos(validos);
  }

  async function enviarImagens(e) {
    e.preventDefault();

    if (arquivos.length === 0) {
      setErro("Selecione pelo menos uma imagem.");
      return;
    }

    setEnviando(true);
    setErro("");
    setSucesso("");

    try {
      const supabaseModule = await import("@/lib/supabase");
      const supabase = supabaseModule.createClient();

      for (const arquivo of arquivos) {
        const dados = new FormData();
        dados.append("file", arquivo);

        const resposta = await fetch("/api/upload", {
          method: "POST",
          body: dados,
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
          throw new Error(resultado.error || "Erro no upload.");
        }

        const { error } = await supabase
          .from("obra_imagens")
          .insert({
            obra_id: obraId,
            url: resultado.url,
            public_id: resultado.public_id,
            descricao: arquivo.name,
          });

        if (error) {
          throw error;
        }
      }

      setArquivos([]);
      setSucesso("Imagens adicionadas com sucesso!");
      router.refresh();
    } catch (error) {
      setErro(error.message || "Não foi possível enviar as imagens.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviarImagens} className="space-y-5">
      <div>
        <label className="mb-2 block font-semibold text-primary">
          Selecionar fotografias
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={selecionarArquivos}
          className="w-full rounded-lg border border-gray-300 p-3"
        />

        <p className="mt-2 text-sm text-gray-500">
          Você pode selecionar várias imagens. Limite de 10 MB por imagem.
        </p>
      </div>

      {arquivos.length > 0 && (
        <p className="text-sm font-medium text-gray-600">
          {arquivos.length} imagem(ns) selecionada(s).
        </p>
      )}

      {erro && (
        <p className="rounded-lg bg-red-50 p-3 text-red-700">
          {erro}
        </p>
      )}

      {sucesso && (
        <p className="rounded-lg bg-green-50 p-3 text-green-700">
          {sucesso}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || arquivos.length === 0}
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {enviando ? "Enviando imagens..." : "Adicionar à galeria"}
      </button>
    </form>
  );
}
