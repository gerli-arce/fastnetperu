"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h1 className="font-bold text-4xl md:text-5xl mb-4 text-balance">Sobre FASTNETPERU</h1>
            <p className="text-xl text-blue-100 max-w-2xl">Conoce más sobre nuestra empresa y nuestra misión</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div>
                <h2 className="font-bold text-3xl md:text-4xl mb-6 text-neutral-900 text-balance">
                  Conectando Perú desde 2014
                </h2>
                <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                  FASTNETPERU E.I.R.L. es una empresa líder en telecomunicaciones con más de 10 años de experiencia
                  brindando soluciones de conectividad de calidad en Perú.
                </p>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Nos especializamos en proporcionar internet de alta velocidad por fibra óptica y antena, además de
                  servicios de TV cable e IPTV para hogares y empresas en la región de Junín.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-neutral-900">Tecnología de Punta</h4>
                      <p className="text-neutral-600 text-sm">Infraestructura moderna y equipos de última generación</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-neutral-900">Servicio Profesional</h4>
                      <p className="text-neutral-600 text-sm">Equipo técnico capacitado y atención al cliente 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-neutral-900">Precios Competitivos</h4>
                      <p className="text-neutral-600 text-sm">Planes accesibles sin comprometer la calidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 text-white">
                <h3 className="font-bold text-2xl mb-6">¿Por qué elegir FASTNETPERU?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <span>Cobertura en toda la región de Junín</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <span>Instalación gratuita y rápida</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <span>Soporte técnico disponible 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <span>Planes sin contrato a largo plazo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <span>Garantía de satisfacción del cliente</span>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Nuestros Valores</h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation direction="left" delay={0}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26H22L17.64 12.33L19.16 18.63L12 14.46L4.84 18.63L6.36 12.33L2 8.26H8.91L12 2Z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">Excelencia</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Nos comprometemos a ofrecer los mejores servicios de telecomunicaciones con calidad garantizada
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <svg
                      className="w-10 h-10 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">Confianza</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Construimos relaciones duraderas basadas en la transparencia y el compromiso con nuestros clientes
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.36-5.36l.707-.707M5.95 5.95l.707.707"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900">Innovación</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Utilizamos tecnología de punta para ofrecer soluciones modernas y eficientes
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
