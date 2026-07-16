"use client";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { messages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { locale } = useLanguage();

  const t = messages[locale].contact;

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "5511992182061";

    const text = `*Novo contato pelo site*

👤 Nome: ${form.name}
🏢 Empresa: ${form.company}
📧 E-mail: ${form.email}
📱 Telefone: ${form.phone}
🛠️ Serviço: ${form.service}

💬 Mensagem:
${form.message}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="contato" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-16 text-center">

          <span
            className="
              font-semibold
              uppercase
              tracking-[0.3em]
              text-secondary
            "
          >
            {t.badge}
          </span>


          <h2
            className="
              mt-4
              text-4xl
              font-bold
              text-primary
              lg:text-5xl
            "
          >
            {t.title}
          </h2>


          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-text
            "
          >
            {t.description}
          </p>

        </div>


        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">


          {/* Formulário */}
          <div
            className="
              rounded-[32px]
              bg-white
              p-6
              shadow-xl
              sm:p-8
              lg:p-10
            "
          >

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-6 md:grid-cols-2">

                <input
                  type="text"
                  placeholder={t.form.name}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="
                    rounded-xl
                    border
                    border-border
                    px-5
                    py-4
                    text-primary
                    outline-none
                    transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                />


                <input
                  type="text"
                  placeholder={t.form.company}
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="
                    rounded-xl
                    border
                    border-border
                    px-5
                    py-4
                    text-primary
                    outline-none
                    transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                />

              </div>


              <div className="grid gap-6 md:grid-cols-2">

                <input
                  type="email"
                  placeholder={t.form.email}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="
                    rounded-xl
                    border
                    border-border
                    px-5
                    py-4
                    text-primary
                    outline-none
                    transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                />


                <input
                  type="tel"
                  placeholder={t.form.phone}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="
                    rounded-xl
                    border
                    border-border
                    px-5
                    py-4
                    text-primary
                    outline-none
                    transition
                    focus:border-secondary
                    focus:ring-2
                    focus:ring-secondary/20
                  "
                />

              </div>


              <select
                value={form.service}
                onChange={(e) =>
                  setForm({ ...form, service: e.target.value })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  px-5
                  py-4
                  text-primary
                  outline-none
                  focus:border-secondary
                  focus:ring-2
                  focus:ring-secondary/20
                "
              >
                <option value="">{t.form.servicePlaceholder}</option>
                <option value={t.form.service1}>{t.form.service1}</option>
                <option value={t.form.service2}>{t.form.service2}</option>
                <option value={t.form.service3}>{t.form.service3}</option>
                <option value={t.form.service4}>{t.form.service4}</option>
                <option value={t.form.service5}>{t.form.service5}</option>
                <option value={t.form.service6}>{t.form.service6}</option>
                <option value={t.form.service7}>{t.form.service7}</option>
              </select>


              <textarea
                rows={6}
                placeholder={t.form.message}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  px-5
                  py-4
                  text-primary
                  outline-none
                  transition
                  focus:border-secondary
                  focus:ring-2
                  focus:ring-secondary/20
                "
              />


              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-secondary
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition
                  hover:bg-secondary-hover
                "
              >
                {t.form.button}
                <ArrowRight size={18} />
              </button>

            </form>

          </div>



          {/* Informações */}
          <div
            className="
              rounded-[32px]
              bg-primary
              p-6
              text-white
              sm:p-8
              lg:p-10
            "
          >

            <h3 className="text-3xl font-bold">
              {t.info.title}
            </h3>


            <p
              className="
                mt-4
                leading-7
                text-white/70
              "
            >
              {t.info.description}
            </p>



            <div className="mt-10 space-y-8">



              <div className="flex gap-4">
                <MessageCircle className="mt-1 text-secondary-light" />

                <div>
                  <p className="text-sm text-white/50">
                    {t.info.whatsapp}
                  </p>

                  <p className="font-medium">
                    (11) 94143-6113
                  </p>
                </div>
              </div>



              <div className="flex gap-4">
                <Mail className="mt-1 text-secondary-light" />

                <div>
                  <p className="text-sm text-white/50">
                    {t.info.email}
                  </p>

                  <p className="font-medium">
                    jomacelpereiradossantos@gmail.com
                  </p>
                </div>
              </div>



              <div className="flex gap-4">
                <MapPin className="mt-1 text-secondary-light" />

                <div>
                  <p className="text-sm text-white/50">
                    {t.info.address}
                  </p>

                  <p className="font-medium">
                    Rua souza coutinho, 384, Sacomã
                    <br />
                    São Paulo - SP
                  </p>
                </div>
              </div>


            </div>



            <div
              className="
                mt-12
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >

              <h4 className="font-semibold">
                {t.info.businessHours}
              </h4>


              <p className="mt-2 text-white/70">
                {t.info.weekdays}
                <br />
                {t.info.hours}
              </p>

            </div>


          </div>


        </div>

      </div>
    </section>
  );
}