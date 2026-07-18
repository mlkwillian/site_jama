import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JAMA Fundações",
  description: "JAMA Fundações Engenharia Industrial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <LanguageProvider>
          {children}
          <WhatsAppButton/>
        </LanguageProvider>
      </body>
    </html>
  );
}
