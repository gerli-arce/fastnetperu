import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-14">
      <div className="container mx-auto px-6">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-10 mb-10">
          
          {/* LOGO + DESCRIPCIÓN */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gX0UoQNTTZ2ZynwEtAVfP6OUtjHVJw.png"
                alt="FASTNETPERU Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Conectando Perú con <span className="text-white">tecnología de punta </span> 
              y servicio profesional desde 2014.
            </p>
          </div>

          {/* SERVICIOS */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/" className="hover:text-white">Internet Fibra</Link></li>
              <li><Link href="/" className="hover:text-white">Internet Antena</Link></li>
              <li><Link href="/" className="hover:text-white">TV Cable</Link></li>
              <li><Link href="/" className="hover:text-white">IPTV</Link></li>
            </ul>
          </div>

          {/* EMPRESA */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
              <li><Link href="/cobertura" className="hover:text-white">Cobertura</Link></li>
              <li><Link href="/planes" className="hover:text-white">Planes</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>

          {/* INFORMACIÓN LEGAL */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Información Legal</h4>

            <div className="space-y-4 text-sm text-neutral-400">

              <div>
                <p className="uppercase text-xs text-neutral-500">Razón Social</p>
                <p className="text-white font-semibold">FASTNETPERU E.I.R.L</p>
              </div>

              <div>
                <p className="uppercase text-xs text-neutral-500">RUC</p>
                <p className="text-white font-semibold">20602791816</p>
              </div>

              <div>
                <p className="uppercase text-xs text-neutral-500">Dirección</p>
                <p className="text-white font-semibold leading-relaxed">
                  Jr. Andrés Avelino Cáceres 185<br />
                  Chanchamayo – Chanchamayo – Junín
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
          <p>&copy; 2025 FASTNETPERU E.I.R.L. Todos los derechos reservados.</p>
          <p className="mt-1">Desarrollado con tecnología moderna para tu mejor experiencia</p>
        </div>

      </div>
    </footer>
  );
}
