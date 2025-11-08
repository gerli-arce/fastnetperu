import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gX0UoQNTTZ2ZynwEtAVfP6OUtjHVJw.png"
                alt="FASTNETPERU Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Conectando Perú con tecnología de punta y servicio profesional desde 2014.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Internet Fibra
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Internet Antena
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  TV Cable
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  IPTV
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/cobertura" className="hover:text-white transition-colors">
                  Cobertura
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-white transition-colors">
                  Planes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Horario de Atención</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Lunes - Viernes</li>
              <li className="text-white font-bold">9:00 AM - 6:00 PM</li>
              <li className="mt-4">Sábados</li>
              <li className="text-white font-bold">9:00 AM - 1:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2025 FASTNETPERU E.I.R.L. Todos los derechos reservados.</p>
          <p className="mt-2">Desarrollado con tecnología moderna para tu mejor experiencia</p>
        </div>
      </div>
    </footer>
  )
}
