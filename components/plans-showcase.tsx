"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Clock, Wifi, Radio, Tv, Smartphone, TrendingUp } from "lucide-react"

interface Plan {
  name: string
  speed: string
  speedValue: number
  price: string
  duration: string
  benefit?: string
  highlight?: boolean
  icon?: React.ReactNode
}

interface PlanCategory {
  id: string
  label: string
  description?: string
  plans: Plan[]
}

const plansData: PlanCategory[] = [
  {
    id: "fiber",
    label: "Internet por Fibra Óptica",
    description: "Conexión ultrarrápida de última generación",
    plans: [
      {
        name: "Plan 50",
        speed: "200 Mbps",
        speedValue: 200,
        price: "S/ 50",
        duration: "",
        icon: <Wifi className="w-5 h-5" />,
      },
      {
        name: "Plan 75",
        speed: "300 Mbps",
        speedValue: 300,
        price: "S/ 75",
        duration: "",
        highlight: true,
        icon: <Zap className="w-5 h-5" />,
      },
      {
        name: "Plan 100",
        speed: "400 Mbps",
        speedValue: 400,
        price: "S/ 100",
        duration: "",
        icon: <TrendingUp className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "antenna",
    label: "Internet por Antena",
    description: "Cobertura amplia en zonas sin fibra",
    plans: [
      {
        name: "Plan 50",
        speed: "10 Mbps",
        speedValue: 10,
        price: "S/ 50",
        duration: "",
        icon: <Radio className="w-5 h-5" />,
      },
      {
        name: "Plan 75",
        speed: "15 Mbps",
        speedValue: 15,
        price: "S/ 75",
        duration: "",
        highlight: true,
        icon: <Radio className="w-5 h-5" />,
      },
      {
        name: "Plan 100",
        speed: "20 Mbps",
        speedValue: 20,
        price: "S/ 100",
        duration: "",
        icon: <Radio className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "duo",
    label: "Planes Dúo (Internet + TV Cable)",
    description: "Internet rápido + entretenimiento sin límite",
    plans: [
      {
        name: "Plan 80",
        speed: "200 Mbps",
        speedValue: 200,
        price: "S/ 80",
        duration: "",
        icon: <Wifi className="w-5 h-5" />,
      },
      {
        name: "Plan 105",
        speed: "300 Mbps",
        speedValue: 300,
        price: "S/ 105",
        duration: "",
        highlight: true,
        icon: <Zap className="w-5 h-5" />,
      },
      {
        name: "Plan 130",
        speed: "400 Mbps",
        speedValue: 400,
        price: "S/ 130",
        duration: "",
        icon: <TrendingUp className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "tv",
    label: "TV Cable Solo",
    description: "Entretenimiento con más de 100 canales HD",
    plans: [
      {
        name: "Plan TV",
        speed: "100+ Canales",
        speedValue: 100,
        price: "S/ 20",
        duration: "primeros 2 meses",
        benefit: "Luego S/ 30",
        icon: <Tv className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "iptv",
    label: "IPTV",
    description: "Televisión por internet con calidad 4K",
    plans: [
      {
        name: "Plan IPTV Básico",
        speed: "HD Quality",
        speedValue: 70,
        price: "S/ 10",
        duration: "",
        benefit: "2 días de prueba gratis",
        icon: <Smartphone className="w-5 h-5" />,
      },
      {
        name: "Plan IPTV Premium",
        speed: "Calidad 4K",
        speedValue: 100,
        price: "S/ 15",
        duration: "",
        highlight: true,
        benefit: "2 días de prueba gratis",
        icon: <Smartphone className="w-5 h-5" />,
      },
    ],
  },
]

export function PlansShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("fiber")
  const currentCategory = plansData.find((cat) => cat.id === selectedCategory)
  const isScrollable = currentCategory?.plans.length ?? 0 > 3

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-bold text-4xl md:text-5xl mb-4 text-neutral-900 text-balance">Nuestros Planes</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto text-pretty">
            Elige el plan perfecto para tus necesidades de conectividad
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-2">
          {plansData.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 md:px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                  : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
              style={{
                animation: `fadeInUp 0.5s ease-out forwards`,
                animationDelay: `${idx * 50}ms`,
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {currentCategory && (
          <div className={`flex justify-center mb-12 ${isScrollable ? "overflow-x-auto pb-4" : ""}`}>
            <div
              className={`grid gap-6 mt-8 ${
                currentCategory.plans.length === 1
                  ? "grid-cols-1 max-w-md"
                  : currentCategory.plans.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {currentCategory.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className="relative animate-scale-in"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
                      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg border border-blue-400 animate-bounce-slow">
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Más Popular</span>
                      </div>
                    </div>
                  )}

                  <Card
                    className={`border-2 transition-all duration-500 overflow-visible h-full backdrop-blur-sm ${
                      plan.highlight
                        ? "border-blue-400 bg-gradient-to-br from-blue-50/80 via-white to-white shadow-2xl md:scale-105 pt-6 hover:shadow-2xl hover:-translate-y-2"
                        : "border-neutral-200 bg-white/80 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 pt-6"
                    }`}
                  >
                    <CardContent className="p-8 pt-2">
                      <div className="mb-8 flex justify-center">
                        {plan.icon && (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                            <div className="flex items-center justify-center w-full h-full">{plan.icon}</div>
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-2xl text-neutral-900 mb-2">{plan.name}</h3>
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                        {plan.speed}
                      </div>
                      <p className="text-neutral-500 text-sm font-medium">
                        {plan.speed.includes("Mbps")
                          ? "Velocidad simétrica"
                          : plan.speed.includes("Canales")
                            ? "Entretenimiento"
                            : "Acceso inmediato"}
                      </p>

                      <div className="bg-neutral-100 h-3 rounded-full mb-6 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min((plan.speedValue / 400) * 100, 100)}%`,
                            animation: `slideInLeft 0.8s ease-out forwards`,
                            animationDelay: `${idx * 100 + 300}ms`,
                          }}
                        ></div>
                      </div>

                      <div
                        className={`rounded-lg p-5 mb-6 border-2 ${
                          plan.highlight
                            ? "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300"
                            : "bg-neutral-50 border-neutral-200"
                        }`}
                      >
                        <div className="text-4xl font-bold text-neutral-900 mb-2">{plan.price}</div>
                        <div className="text-neutral-600 text-sm font-medium">{plan.duration}</div>
                        {plan.benefit && (
                          <div className="text-blue-600 text-sm mt-3 font-bold border-t border-blue-200 pt-2">
                            ✓ {plan.benefit}
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3 h-3 text-blue-600" />
                          </div>
                          Sin límite de datos
                        </li>
                        <li className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-3 h-3 text-blue-600" />
                          </div>
                          Instalación en 24 horas
                        </li>
                        <li className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Wifi className="w-3 h-3 text-blue-600" />
                          </div>
                          Soporte técnico 24/7
                        </li>
                      </ul>

                      <div className="flex justify-center">
                        <a
                          href={`https://wa.me/942059874?text=Hola%20vengo%20de%20la%20web%20quiero%20contratar%20${plan.name}%20de%20${plan.speed}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform">
                            Contratar Ahora
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 md:p-12 text-center shadow-lg animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <Clock className="w-7 h-7" />
            </div>
          </div>
          <h3 className="font-bold text-2xl md:text-3xl text-neutral-900 mb-3">Información de Instalación</h3>
          <p className="text-neutral-700 text-lg max-w-2xl mx-auto font-medium">
            La instalación incluye router, materiales y hasta 200m de cableado. Contrato mínimo de 6 meses. Exceso de
            cableado: S/ 0.45 por metro.
          </p>
        </div>
      </div>
    </section>
  )
}
