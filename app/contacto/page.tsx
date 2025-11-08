"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import { MapEmbed } from "@/components/map-embed"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h1 className="font-bold text-4xl md:text-5xl mb-4 text-balance">Contáctanos</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Estamos aquí para ayudarte con todas tus necesidades de conectividad
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <ScrollAnimation direction="left" delay={0}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Teléfono</h3>
                  <a href="tel:942059874" className="text-neutral-600 font-bold hover:text-blue-600">
                    942 059 874
                  </a>
                  <p className="text-neutral-600 text-sm mt-2">Disponible de Lunes a Sábado</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Email</h3>
                  <a
                    href="mailto:fastnetperu.eirl@gmail.com"
                    className="text-neutral-600 font-bold text-sm break-all hover:text-blue-600"
                  >
                    fastnetperu.eirl@gmail.com
                  </a>
                  <p className="text-neutral-600 text-sm mt-2">Respuesta en 24 horas</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Oficina</h3>
                  <p className="text-neutral-600 font-bold text-sm">Jr. 1° de Mayo N°1085</p>
                  <p className="text-neutral-600 text-sm">Pichanaqui - Junín</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Contact Form */}
          <ScrollAnimation direction="up">
            <div className="max-w-2xl mx-auto bg-white border-2 border-neutral-200 rounded-lg p-8 card-shadow-hover mb-12">
              <h2 className="font-bold text-2xl mb-6 text-neutral-900">Envíanos un Mensaje</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="border-2 border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="border-2 border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
                />
                <textarea
                  placeholder="Tu mensaje"
                  rows={5}
                  className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors"
                ></textarea>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 transition-all duration-300 hover:shadow-lg">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          <div className="max-w-2xl mx-auto">
            <MapEmbed />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
