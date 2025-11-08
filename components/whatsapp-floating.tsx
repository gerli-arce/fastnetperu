"use client"

import { useState } from "react"
import { X, ShoppingCart, Headphones, Flag } from "lucide-react"
import Image from "next/image"

export function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappOptions = [
    {
      id: "ventas",
      name: "Ventas",
      description: "Ventas",
      phone: "51942059874",
      message: "Hola, vengo de la web y estoy interesado en contratar servicios de FASTNETPERU",
      icon: ShoppingCart,
      bgColor: "from-blue-400 to-blue-600",
    },
    {
      id: "soporte",
      name: "Soporte Técnico",
      description: "Soporte Técnico",
      phone: "51978451680",
      message: "Hola, necesito asistencia técnica con mi servicio de FASTNETPERU",
      icon: Headphones,
      bgColor: "from-green-400 to-green-600",
    },
    {
      id: "reclamos",
      name: "Reclamos",
      description: "Reclamos",
      phone: "51986470369",
      message: "Hola, deseo realizar un reclamo sobre mi servicio de FASTNETPERU",
      icon: Flag,
      bgColor: "from-red-400 to-red-600",
    },
  ]

  const handleWhatsappClick = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank")
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col-reverse gap-3 items-end">
        {/* Menú desplegable mejorado */}
        {isOpen && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-in-up w-72 md:w-80">
            {/* Header verde */}
            <div className="bg-green-500 px-4 md:px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-RVFAfwMtMRBVf4eOgcOOvEjwUxv8LC.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-7 md:h-7"
                />
                <div>
                  <h3 className="font-bold text-sm md:text-base">Empezar una Conversación</h3>
                  <p className="text-xs text-green-100">
                    ¡Hola! Haga clic en uno de nuestros miembros a continuación para chatear en WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción del equipo */}
            <div className="px-4 md:px-5 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-xs text-gray-600">Nuestro equipo técnico suele responder en seguida</p>
            </div>

            {/* Opciones de contacto */}
            <div className="divide-y divide-gray-100">
              {whatsappOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => handleWhatsappClick(option.phone, option.message)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 hover:bg-green-50 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${option.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    {/* Info de contacto */}
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{option.name}</p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>

                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-RVFAfwMtMRBVf4eOgcOOvEjwUxv8LC.png"
                      alt="WhatsApp"
                      width={28}
                      height={28}
                      className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 group-hover:scale-110 transition-transform"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-bounce-slow flex items-center justify-center"
          title={isOpen ? "Cerrar WhatsApp" : "Abrir WhatsApp"}
        >
          {isOpen ? (
            <X className="w-6 h-6 md:w-7 md:h-7" />
          ) : (
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-RVFAfwMtMRBVf4eOgcOOvEjwUxv8LC.png"
              alt="WhatsApp"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-125 transition-transform"
            />
          )}
        </button>
      </div>
    </>
  )
}
