"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const getSlugFromPath = (pathname: string) => {
  const match = pathname.match(/^\/blog\/([^/?#]+)/i)
  return match ? match[1] : null
}

export default function NotFound() {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const currentSlug = getSlugFromPath(window.location.pathname)
    if (currentSlug) {
      setSlug(currentSlug)
      const target = `/blog/?slug=${encodeURIComponent(currentSlug)}`
      window.location.replace(target)
    }
  }, [])

  if (slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
        <div className="text-center space-y-4">
          <div className="text-sm font-semibold text-blue-600 uppercase tracking-[0.28em]">Redireccionando</div>
          <h1 className="text-3xl font-bold text-slate-900">Cargando blog solicitado…</h1>
          <p className="text-slate-600">
            Te llevamos al blog con slug <span className="font-semibold text-slate-900">{slug}</span>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <div className="text-center space-y-4">
        <div className="text-sm font-semibold text-blue-600 uppercase tracking-[0.28em]">404</div>
        <h1 className="text-3xl font-bold text-slate-900">Página no encontrada</h1>
        <p className="text-slate-600">No pudimos encontrar la página solicitada.</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold hover:border-blue-400 hover:text-blue-700 transition-colors"
          >
            Ver blog
          </Link>
        </div>
      </div>
    </div>
  )
}
