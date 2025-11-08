"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function CoberturaPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h1 className="font-bold text-4xl md:text-5xl mb-4 text-balance">Nuestra Cobertura</h1>
            <p className="text-xl text-blue-100 max-w-2xl">Estamos presentes en las principales zonas de Junín</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation direction="left">
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-neutral-900 flex items-center gap-2">
                    <span className="text-blue-600">📡</span>
                    Zonas de Cobertura Fibra Óptica
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Pichanaqui Centro</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Zona Comercial</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Residencial Norte</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Residencial Sur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Zona Industrial</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Expandiendo cobertura</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <Card className="border-2 border-neutral-200 card-shadow-hover">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-neutral-900 flex items-center gap-2">
                    <span className="text-red-600">📶</span>
                    Zonas de Cobertura Antena
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Zonas Rurales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Comunidades Alejadas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Caseríos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Zonas de Difícil Acceso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Expandiendo cobertura</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Consulta tu zona</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          <ScrollAnimation direction="up" delay={200}>
            <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center max-w-4xl mx-auto card-shadow-hover">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-lg text-neutral-700 mb-4">
                ¿No ves tu zona en la lista? Consulta con nuestro equipo de ventas
              </p>
              <a
                href={`https://wa.me/51942059874?text=Hola%20FASTNETPERU%2C%20quiero%20consultar%20sobre%20la%20cobertura%20en%20mi%20zona`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">Verificar Disponibilidad</Button>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
