"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Footer() {
  const { locale } = useLanguage();

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);

  const t = messages[locale].footer;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";


  const handleWhatsApp = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = new FormData(form);

    const text = `
      *Trabalhe Conosco*

      Nome: ${data.get("name")}
      E-mail: ${data.get("email")}
      Telefone: ${data.get("phone")}
      Cargo: ${data.get("position")}

      Mensagem:
      ${data.get("message")}

      Segue meu currículo em anexo.
      `;

    const url = `https://wa.me/5511941436113?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

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
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-white/60 hover:text-secondary transition"
                >
                  {t.institutional.privacyPolicy}
                </button>
              </li>


              <li>
                {t.institutional.clientPortal}
              </li>

              <li>
                <button
                  onClick={() => setCareersOpen(true)}
                  className="text-white/60 hover:text-secondary transition"
                >
                  {t.institutional.careers}
                </button>
              </li>

            </ul>

          </div>

          <Dialog open={careersOpen} onOpenChange={setCareersOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.careers.title}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-black/60">
                {t.careers.description}
              </p>

              <form onSubmit={handleWhatsApp} className="space-y-4">
                <input
                  name="name"
                  placeholder={t.careers.placeholder.name}
                  required
                  className="w-full rounded-lg border p-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t.careers.placeholder.email}
                  required
                  className="w-full rounded-lg border p-3"
                />

                <input
                  name="phone"
                  placeholder={t.careers.placeholder.phone}
                  className="w-full rounded-lg border p-3"
                />

                <textarea
                  name="message"
                  placeholder={t.careers.placeholder.message}
                  className="w-full rounded-lg border p-3"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-secondary py-3 text-white font-semibold hover:bg-secondary-hover"
                >
                  {t.careers.button}
                </button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {t.privacy.title}
                </DialogTitle>
              </DialogHeader>

              <p className="text-sm text-muted-foreground">
                {t.privacy.intro}
              </p>

              <div className="space-y-6 mt-6">
                {t.privacy.sections.map((section) => (
                  <section key={section.title}>
                    <h3 className="font-semibold text-primary">
                      {section.title}
                    </h3>

                    <p className="mt-2 text-sm text-black/70 leading-7">
                      {section.text}
                    </p>
                  </section>
                ))}
              </div>
            </DialogContent>
          </Dialog>



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