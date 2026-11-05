
import "server-only";

import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { createClient } from "@/lib/supabase/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    // 1. Verifica a autenticação
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

    // 2. Verifica se o usuário é administrador
    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 403 }
      );
    }

    // 3. Recebe o arquivo
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Nenhuma imagem foi enviada." },
        { status: 400 }
      );
    }

    // 4. Valida o tipo e o tamanho
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato inválido. Envie JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }

    const limite = 10 * 1024 * 1024;

    if (file.size > limite) {
      return NextResponse.json(
        { error: "A imagem deve ter no máximo 10 MB." },
        { status: 400 }
      );
    }

    // 5. Envia a imagem ao Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resultado = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "obras",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      upload.end(buffer);
    });

    // 6. Retorna os dados da imagem
    return NextResponse.json({
      url: resultado.secure_url,
      public_id: resultado.public_id,
    });
  } catch (error) {
    console.error("Erro no upload:", error);

    return NextResponse.json(
      { error: "Não foi possível enviar a imagem." },
      { status: 500 }
    );
  }
}
