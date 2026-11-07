
import "server-only";

import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { createClient } from "@/lib/supabase/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    // 1. Verifica autenticação
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

    // 2. Verifica administrador
    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 403 }
      );
    }

    // 3. Recebe arquivo e tipo
    const formData = await request.formData();
    const file = formData.get("file");
    const tipo = formData.get("tipo") || "imagem";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado." },
        { status: 400 }
      );
    }

    const limiteImagem = 10 * 1024 * 1024;
    const limiteModelo = 50 * 1024 * 1024;

    let opcoesUpload;

    // 4. Configuração para imagens
    if (tipo === "imagem") {
      const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!tiposPermitidos.includes(file.type)) {
        return NextResponse.json(
          { error: "Envie uma imagem JPG, PNG ou WEBP." },
          { status: 400 }
        );
      }

      if (file.size > limiteImagem) {
        return NextResponse.json(
          { error: "A imagem deve ter no máximo 10 MB." },
          { status: 400 }
        );
      }

      opcoesUpload = {
        folder: "obras",
        resource_type: "image",
      };

    // 5. Configuração para modelos 3D
    } else if (tipo === "modelo3d") {
      const nomeArquivo = file.name || "";

      if (!nomeArquivo.toLowerCase().endsWith(".glb")) {
        return NextResponse.json(
          { error: "Envie um modelo 3D no formato GLB." },
          { status: 400 }
        );
      }

      if (file.size > limiteModelo) {
        return NextResponse.json(
          { error: "O modelo 3D deve ter no máximo 50 MB." },
          { status: 400 }
        );
      }

      const nomeSeguro = nomeArquivo
        .replace(/\.glb$/i, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .slice(0, 80);

      opcoesUpload = {
        folder: "modelos-3d",
        public_id: `${Date.now()}-${nomeSeguro || "modelo"}.glb`,
        resource_type: "raw",
      };

    } else {
      return NextResponse.json(
        { error: "Tipo de arquivo inválido." },
        { status: 400 }
      );
    }

    // 6. Converte arquivo
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Envia ao Cloudinary
    const resultado = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        opcoesUpload,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      upload.end(buffer);
    });

    // 8. Retorna informações
    return NextResponse.json({
      url: resultado.secure_url,
      public_id: resultado.public_id,
      resource_type: resultado.resource_type,
    });

  } catch (error) {
    console.error("Erro no upload:", error);

    return NextResponse.json(
      { error: "Não foi possível enviar o arquivo." },
      { status: 500 }
    );
  }
}
