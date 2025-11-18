"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Clock, Phone, Mail, CheckCircle2, Wifi, Radio, Tv, Smartphone } from "lucide-react"
import Link from "next/link"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImageSlider } from "@/components/image-slider"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useEffect, useState } from "react"
import { PlansShowcase } from "@/components/plans-showcase"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      <ImageSlider />

      <PlansShowcase />

      {/* Hero Section with Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimation direction="left" delay={0}>
              <div className="flex flex-col items-center text-center p-8 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group border border-gray-200 card-shadow-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 shadow-md">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-neutral-900">Velocidad Garantizada</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Hasta 400 Mbps de velocidad con tecnología de fibra óptica de última generación
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <div className="flex flex-col items-center text-center p-8 rounded-lg hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 transition-all duration-300 group border border-gray-200 card-shadow-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 shadow-md">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-neutral-900">Conexión Estable</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Red confiable con 99.9% de uptime y soporte técnico 24/7 disponible
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <div className="flex flex-col items-center text-center p-8 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group border border-gray-200 card-shadow-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 shadow-md">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-neutral-900">Instalación Rápida</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Instalación profesional en 24-48 horas sin costos adicionales
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl mb-4 text-neutral-900 text-balance">Nuestros Servicios</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto text-pretty">
                Soluciones completas de telecomunicaciones para hogares y empresas
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollAnimation direction="left" delay={0}>
              <Card className="border border-gray-200 hover:border-blue-400 transition-all duration-300 card-shadow-hover group bg-white rounded-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Wifi className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">Internet Fibra Óptica</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
                    Conexión de alta velocidad con tecnología FTTH para máximo rendimiento
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Hasta 400 Mbps</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Velocidad simétrica</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Sin límite de datos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <Card className="border border-gray-200 hover:border-red-400 transition-all duration-300 card-shadow-hover group bg-white rounded-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Radio className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">Internet Antena</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
                    Conexión inalámbrica para zonas sin cobertura de fibra óptica
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Hasta 20 Mbps</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Cobertura amplia</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Instalación rápida</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <Card className="border border-gray-200 hover:border-blue-400 transition-all duration-300 card-shadow-hover group bg-white rounded-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Tv className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">TV Cable</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
                    Entretenimiento digital con canales HD y contenido premium
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>+100 canales HD</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Canales deportivos</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Contenido infantil</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* <ScrollAnimation direction="right" delay={300}>
              <Card className="border border-gray-200 hover:border-red-400 transition-all duration-300 card-shadow-hover group bg-white rounded-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">IPTV</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
                    Televisión por internet con calidad 4K y contenido on-demand
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Calidad 4K</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Contenido on-demand</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Multi-dispositivo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation direction="up">
            <h2 className="font-bold text-4xl md:text-5xl mb-6 text-balance">¿Listo para la Mejor Conexión?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100 text-pretty text-lg">
              Contrata ahora y disfruta de internet de alta velocidad con instalación gratis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:942059874">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Llamar Ahora
                </Button>
              </a>
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-neutral-100 text-lg px-8 font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Enviar Consulta
                </Button>
              </Link>
              <a href="https://wa.me/942059874" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Chatear en WhatsApp
                </Button>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
