"use client";
import Link from "next/link";
import Image from "next/image";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Footer() {
  const { locale } = useLanguage();

  const t = messages[locale].footer;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <footer className="bg-primary text-white">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-">

        <div className="grid gap-14 lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr]">


          {/* Empresa */}
          <div>

            <Link
              href="/"
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              JAMA{" "}
              <span className="text-secondary">
                Fundações
              </span>
            </Link>


            <p
              className="
                mt-6
                max-w-sm
                leading-7
                text-white/60
              "
            >
              {t.company.description}
            </p>



            {/* Redes */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/fundacoesjama/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-xl
                  bg-white/10
                  p-3
                  transition
                  hover:bg-secondary
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/jomacel-santos-056b468b/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-xl
                  bg-white/10
                  p-3
                  transition
                  hover:bg-secondary
                "
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>




          {/* Institucional */}
          <div>

            <h3 className="text-lg font-semibold">
              {t.institutional.title}
            </h3>


            <ul className="mt-6 space-y-4 text-white/60">

              <li>
                CNPJ: 17.137.648/0001-07
              </li>

              <li>
                {t.institutional.privacyPolicy}
              </li>

              <li>
                {t.institutional.clientPortal}
              </li>

              <li>
                {t.institutional.careers}
              </li>

            </ul>

          </div>





          {/* Contato */}
          <div>

            <h3 className="text-lg font-semibold">
              {t.contact.title}
            </h3>


            <div className="mt-6 space-y-6">


              <div className="flex gap-3">

                <Phone
                  className="mt-1 text-secondary-light"
                  size={18}
                />

                <span className="text-white/60">
                  (11) 94143-6113
                </span>

              </div>



              <div className="flex gap-3">

                <Mail
                  className="mt-1 text-secondary-light"
                  size={18}
                />

                <span className="text-white/60">
                  jomacelpereiradossantos@gmail.com
                </span>

              </div>




              <div className="flex gap-3">

                <MapPin
                  className="mt-1 text-secondary-light"
                  size={18}
                />

                <span className="text-white/60">
                  Rua souza coutinho, 384, Sacomã
                  <br />
                  São Paulo - SP
                </span>

              </div>

            </div>

          </div>


        <Image
          src={`${basePath}/images/footer-image.png`}
          alt="JAMA Fundações"
          width={250}
          height={80}
          className="w-40 md:w-52 h-auto opacity-90 rounded-[32px] hover:opacity-100 transition"
        />

        </div>





        {/* Rodapé inferior */}
        <div
          className="
            mt-16
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-white/40
            lg:flex-row
          "
        >

          <p>
            © {new Date().getFullYear()} {t.copyright}
          </p>





        </div>




      </div>

    </footer>
  );
}