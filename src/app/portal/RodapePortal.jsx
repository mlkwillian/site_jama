
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function RodapePortal() {
    const { locale } = useLanguage();

    return (
        <footer className="border-t border-[#292929] py-5 text-center">
            <p className="text-[11px] text-gray-500">
                Powered by Jama Fundações Technology {new Date().getFullYear()}.
                {" "}
                {locale === "en"
                    ? "All rights reserved."
                    : locale === "es"
                        ? "Todos los derechos reservados."
                        : "Todos os direitos reservados."}
            </p>
        </footer>
    );
}
