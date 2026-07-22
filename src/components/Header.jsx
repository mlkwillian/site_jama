"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";



export default function Header() {
  const { locale, toggleLanguage } = useLanguage();

  const t = messages[locale].header;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
      {
      name: t.menu.diff,
      href: "#diferenciais",
    },
    {
      name: t.menu.services,
      href: "#servicos",
    },
    {
      name: t.menu.cases,
      href: "#cases",
    },
    {
      name: t.menu.mission,
      href: "#missao",
    },
  ];

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        transition-all
        duration-300
        ${scrolled
          ? "bg-primary/95 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
        }
      `}
    >

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl
            font-bold
            tracking-tight
            text-white
          "
        >
          JAMA{" "}
          <span className="text-secondary">
            Fundações
          </span>
        </Link>



        {/* Desktop */}
        <nav className="hidden items-center gap-10 lg:flex">

          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                transition
                hover:text-secondary-light
                ${scrolled
                  ? "text-white/80"
                  : "text-white"
                }
              `}
            >
              {item.name}
            </a>
          ))}

        </nav>




        {/* Ações */}
        <div className="hidden items-center gap-4 lg:flex">

          <button
            className={`
                        flex
                        items-center
                        gap-2
                        transition
                        hover:text-secondary-light
                        ${scrolled ? "text-white/80" : "text-white"}
                      `}
            onClick={toggleLanguage}
          >
            <Globe size={18} />
            {t.language}
          </button>



          <a
            href="#contato"
            className="
              rounded-full
              bg-secondary
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-secondary-hover
            "
          >
            {t.requestQuote}
          </a>

        </div>




        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="
            text-white
            lg:hidden
          "
        >
          {open ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>




      {/* Menu Mobile */}
      {open && (
        <div
          className="
            border-t
            border-white/10
            bg-primary
            lg:hidden
          "
        >

          <nav className="flex flex-col px-6 py-6">


            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  border-b
                  border-white/10
                  py-4
                  text-white/80
                  transition
                  hover:text-secondary-light
                "
              >
                {item.name}
              </a>
            ))}



            <button
              onClick={toggleLanguage}
              className="
                mt-6
                flex
                items-center
                gap-2
                text-white/80
              "
            >
              <Globe size={18} />
              {t.language}
            </button>



            <a
              href="#contato"
              className="
                mt-6
                rounded-full
                bg-secondary
                py-3
                text-center
                font-medium
                text-white
                transition
                hover:bg-secondary-hover
              "
            >
              {t.requestQuote}
            </a>


          </nav>

        </div>
      )}

    </header>
  );
}