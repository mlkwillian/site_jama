"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = "5511941436113";
  const message = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-2xl
      "
    >
      <FaWhatsapp size={34} />
    </a>
  );
}