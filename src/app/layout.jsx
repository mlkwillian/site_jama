
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppConditional from "@/components/WhatsAppConditional";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const BASE_URL = "https://www.xn--fundaesjama-q9a6p.com.br";


export const metadata = {
  metadataBase: new URL("https://www.xn--fundaesjama-q9a6p.com.br"),

  title: {
    default: "JAMA FUNDAÇÕES",
    template: "%s | JAMA FUNDAÇÕES",
  },

  description:
    "JAMA FUNDAÇÕES. Conheça nossos projetos, obras e soluções em engenharia de fundações.",

  icons: {
    icon: "/logo-jama.png",
    shortcut: "/logo-jama.png",
  },

  openGraph: {
    title: "JAMA FUNDAÇÕES",
    description:
      "Conheça a JAMA FUNDAÇÕES, nossos projetos e obras.",
    url: "/",
    siteName: "JAMA FUNDAÇÕES",
    images: ["/logo-jama.png"],
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.xn--fundaesjama-q9a6p.com.br/#organization",
  name: "JAMA Engenharia Industrial",
  alternateName: "JAMA Fundações",
  url: "https://www.xn--fundaesjama-q9a6p.com.br/",
  logo: {
    "@type": "ImageObject",
    url: "https://www.xn--fundaesjama-q9a6p.com.br/logo-jama.png",
  },
  description:
    "JAMA Engenharia Industrial. Conheça nossos projetos, obras e soluções em engenharia de fundações.",
};



export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={cn("font-sans", inter.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          {children}
          <WhatsAppConditional />
        </LanguageProvider>
      </body>
    </html>
  );
}
