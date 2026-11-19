
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://www.fundaçõesjama.com.br";

// Atualiza o Sitemap a cada hora
export const revalidate = 3600;

export default async function sitemap() {
  const supabase = await createClient();

  // Busca somente obras publicadas
  const { data: obras, error } = await supabase
    .from("obras")
    .select("slug")
    .eq("publicada", true)
    .not("slug", "is", null);

  if (error) {
    throw new Error(
      `Erro ao buscar obras para o Sitemap: ${error.message}`
    );
  }

  // Páginas fixas do site
  const paginasFixas = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portal`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Páginas individuais de cada obra publicada
  const paginasObras = (obras || []).map((obra) => ({
    url: `${BASE_URL}/portal/${encodeURIComponent(obra.slug)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...paginasFixas, ...paginasObras];
}
