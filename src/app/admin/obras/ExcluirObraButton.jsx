
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExcluirObraButton({ obraId, nomeObra }) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  async function excluirObra() {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir a obra "${nomeObra}"? Essa ação não poderá ser desfeita.`
    );

    if (!confirmou) return;

    setExcluindo(true);
    setErro("");

    try {
      const resposta = await fetch(`/api/obras/${obraId}`, {
        method: "DELETE",
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.error || "Erro ao excluir a obra.");
      }

      router.refresh();
    } catch (error) {
      setErro(error.message);
      setExcluindo(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={excluirObra}
        disabled={excluindo}
        className="font-semibold text-red-600 hover:underline disabled:opacity-50"
      >
        {excluindo ? "Excluindo..." : "Excluir"}
      </button>

      {erro && (
        <p className="mt-2 text-xs text-red-600">{erro}</p>
      )}
    </div>
  );
}
