"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("pt");

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "pt" ? "en" : "pt"));
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