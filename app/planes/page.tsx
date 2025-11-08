"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import { PlansShowcase } from "@/components/plans-showcase"

const generateWhatsAppMessage = (planNombre: string, precio: number, velocidad: string, tipo: string) => {
  const message = `Vengo de la web y estoy interesado en el servicio de ${tipo.toUpperCase()} - ${planNombre} (${velocidad}) - S/ ${precio}/mes`
  return encodeURIComponent(message)
}

const whatsappNumber = "51942059874"

export default function PlanesPage() {
  const [tipoInternet, setTipoInternet] = useState<"fibra" | "antena">("fibra")

  const planesFibra = [
    { velocidad: "200 Mbps", precio: 50, mbps: "200 Mbps", nombre: "Plan Básico" },
    { velocidad: "300 Mbps", precio: 75, mbps: "300 Mbps", nombre: "Plan Regular" },
    { velocidad: "400 Mbps", precio: 100, mbps: "400 Mbps", nombre: "Plan Premium" },
  ]

  const planesAntena = [
    { velocidad: "10 Mbps", precio: 50, mbps: "10 Mbps", nombre: "Plan Básico" },
    { velocidad: "15 Mbps", precio: 75, mbps: "15 Mbps", nombre: "Plan Regular" },
    { velocidad: "20 Mbps", precio: 100, mbps: "20 Mbps", nombre: "Plan Premium" },
  ]

  const planes = tipoInternet === "fibra" ? planesFibra : planesAntena
  const colorPrimario = tipoInternet === "fibra" ? "blue" : "red"
  const velocidadMax = tipoInternet === "fibra" ? 400 : 20

  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h1 className="font-bold text-4xl md:text-5xl mb-4 text-balance">Nuestros Planes</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Elige el plan perfecto para tus necesidades de conectividad
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="font-bold text-3xl md:text-4xl mb-8 text-neutral-900">Planes Ilimitados de Internet</h2>

              {/* Plans Showcase */}
              <PlansShowcase />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">¿Tienes dudas sobre nuestros planes?</h2>
            <p className="text-xl mb-8 text-blue-100">Contacta con nuestro equipo de ventas</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola%20FASTNETPERU%2C%20tengo%20dudas%20sobre%20los%20planes`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 font-bold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Contactar Ahora
              </Button>
            </a>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
