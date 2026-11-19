
const BASE_URL = "https://www.fundaçõesjama.com.br";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/portal/"],
      disallow: ["/admin"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
