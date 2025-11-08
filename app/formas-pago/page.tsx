"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Copy } from "lucide-react"
import { useState } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function FormasPagoPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const bancos = [
    {
      nombre: "BCP",
      titular: "FASTNETPERU E.I.R.L.",
      cuenta: "4012566628038",
      cci: "002-401-002566628038-80",
      color: "bg-blue-50 border-blue-300",
    },
    {
      nombre: "Caja Huancayo",
      titular: "FASTNETPERU EIRL",
      cuenta: "107014211003056064",
      cci: "808-014-211003056064-58",
      color: "bg-green-50 border-green-300",
    },
  ]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h1 className="font-bold text-4xl md:text-5xl mb-4 text-balance">Formas de Pago</h1>
            <p className="text-xl text-blue-100 max-w-2xl">Múltiples opciones de pago para tu comodidad</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Transferencias Bancarias</h2>
              <p className="text-xl text-neutral-600">Realiza tu pago directamente a nuestras cuentas</p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {bancos.map((banco, idx) => (
              <ScrollAnimation key={idx} direction={idx === 0 ? "left" : "right"} delay={idx * 100}>
                <Card className={`border-2 ${banco.color} card-shadow-hover rounded-lg overflow-hidden`}>
                  <CardContent className="p-8">
                    <h3 className="font-bold text-2xl mb-6 text-neutral-900">{banco.nombre}</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Titular</p>
                        <div className="flex items-center justify-between bg-white border border-gray-300 rounded p-3 shadow-sm">
                          <p className="font-bold text-neutral-900">{banco.titular}</p>
                          <button
                            onClick={() => handleCopy(banco.titular, idx)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Número de Cuenta</p>
                        <div className="flex items-center justify-between bg-white border border-gray-300 rounded p-3 shadow-sm">
                          <p className="font-bold text-neutral-900 font-mono text-sm">{banco.cuenta}</p>
                          <button
                            onClick={() => handleCopy(banco.cuenta, idx + 10)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-600 mb-1">CCI</p>
                        <div className="flex items-center justify-between bg-white border border-gray-300 rounded p-3 shadow-sm">
                          <p className="font-bold text-neutral-900 font-mono text-sm">{banco.cci}</p>
                          <button
                            onClick={() => handleCopy(banco.cci, idx + 20)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          {/* Yape Section */}
          <ScrollAnimation direction="up">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-yellow-300 bg-yellow-50 card-shadow-hover rounded-lg overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-6 text-neutral-900">Yape (S/)</h3>

                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Número Yape</p>
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded p-3 shadow-sm">
                      <p className="font-bold text-neutral-900 font-mono text-lg">933 659 828</p>
                      <button
                        onClick={() => handleCopy("933659828", 30)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-neutral-600 mt-2">Titular: FASTNETPERU EIRL</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Other Payment Methods */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Otras Formas de Pago</h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ScrollAnimation direction="left" delay={0}>
              <Card className="border border-gray-200 card-shadow-hover rounded-lg overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M7 15h8m4 0h.01M7 19h10a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Tarjeta de Crédito</h3>
                  <p className="text-neutral-600 text-sm">Visa, Mastercard, American Express</p>
                  <p className="text-neutral-600 text-sm mt-2">Consulta disponibilidad</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <Card className="border border-gray-200 card-shadow-hover rounded-lg overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg
                      className="w-8 h-8 text-red-600"
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
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Billetera Digital</h3>
                  <p className="text-neutral-600 text-sm">Plin, Tunki</p>
                  <p className="text-neutral-600 text-sm mt-2">Consulta disponibilidad</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <Card className="border border-gray-200 card-shadow-hover rounded-lg overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg
                      className="w-8 h-8 text-green-600"
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
                  <h3 className="font-bold text-lg mb-2 text-neutral-900">Efectivo</h3>
                  <p className="text-neutral-600 text-sm">Pago en nuestras oficinas</p>
                  <p className="text-neutral-600 text-sm mt-2">Jr. 1° de Mayo N°1085</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-20 bg-blue-50 border-t-4 border-blue-600">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-bold text-2xl mb-6 text-neutral-900">Información Importante</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>Después de realizar tu pago, envía el comprobante a fastnetperu.eirl@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>Incluye tu nombre y número de teléfono en el comprobante</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>Procesamos pagos de lunes a viernes de 9:00 AM a 6:00 PM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>Descuento del 10% en pagos anuales adelantados</span>
                </li>
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
