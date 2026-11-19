
"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("pt");

  const toggleLanguage = () => {
    setLocale((prev) => {
      if (prev === "pt") return "en";
      if (prev === "en") return "es";
      return "pt";
    });
  };

  return (
    <LanguageContext.Provider
      value={{ locale, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
