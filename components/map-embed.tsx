"use client"

import { ScrollAnimation } from "./scroll-animation"

export function MapEmbed() {
  return (
    <ScrollAnimation direction="up">
      <div className="w-full">
        <h2 className="font-bold text-2xl mb-6 text-neutral-900 text-center">Ubicación de Nuestra Oficina</h2>
        <div className="w-full rounded-lg overflow-hidden card-shadow-hover border-2 border-neutral-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5404889721997!2d-74.87416342346818!3d-10.92754168737423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sJr.%201%C2%B0%20de%20Mayo%20N%C2%B01085%2C%20Pichanaqui%2C%20Jun%C3%ADn!2s-10.927543%2C%20-74.874166!5e0!3m2!1ses!2spe!4v1733026800000"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
        <p className="text-center text-neutral-600 mt-6 text-sm">Jr. 1° de Mayo N°1085 - Pichanaqui - Junín, Perú</p>
      </div>
    </ScrollAnimation>
  )
}
