"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleContratar = () => {
    const phoneNumber = "51942059874"
    const message = "Hola vengo de la web quiero contratar un plan de..."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gX0UoQNTTZ2ZynwEtAVfP6OUtjHVJw.png"
              alt="FASTNETPERU Logo"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/nosotros"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/planes"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Planes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/cobertura"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Cobertura
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/formas-pago"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Formas de Pago
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contacto"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <button
            onClick={handleContratar}
            className="hidden md:flex bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 px-6 py-2 rounded-lg items-center justify-center"
          >
            Contratar Ahora
          </button>

          <button
            className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-neutral-200 pt-4 animate-fade-in-up">
            <Link
              href="/"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Nosotros
            </Link>
            <Link
              href="/planes"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Planes
            </Link>
            <Link
              href="/cobertura"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Cobertura
            </Link>
            <Link
              href="/formas-pago"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Formas de Pago
            </Link>
            <Link
              href="/contacto"
              className="block text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 py-2 px-3 rounded-lg font-medium transition-all duration-300"
            >
              Contacto
            </Link>
            <button
              onClick={handleContratar}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold mt-4 transition-all duration-300 py-2 px-4 rounded-lg"
            >
              Contratar Ahora
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
