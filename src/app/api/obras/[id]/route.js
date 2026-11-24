
import "server-only";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Verifica o usuário
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Você precisa estar autenticado." },
        { status: 401 }
      );
    }

    // Verifica se é administrador
    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 403 }
      );
    }

    // Busca a obra e sua imagem
    const { data: obra, error: buscaError } = await supabase
      .from("obras")
      .select("id, capa_public_id")
      .eq("id", id)
      .single();

    if (buscaError || !obra) {
      return NextResponse.json(
        { error: "Obra não encontrada." },
        { status: 404 }
      );
    }

    // Exclui a obra do Supabase
    const { error: exclusaoError } = await supabase
      .from("obras")
      .delete()
      .eq("id", id);

    if (exclusaoError) {
      throw exclusaoError;
    }

    // Tenta excluir a imagem do Cloudinary
    if (obra.capa_public_id) {
      try {
        await cloudinary.uploader.destroy(obra.capa_public_id);
      } catch (imagemError) {
        console.error(
          "Não foi possível excluir a imagem:",
          imagemError.message
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Obra excluída com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir obra:", error);

    return NextResponse.json(
      { error: "Não foi possível excluir a obra." },
      { status: 500 }
    );
  }
}
