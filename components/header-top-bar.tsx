import { Mail, Phone, Clock } from "lucide-react"

export function HeaderTopBar() {
  return (
    <div className="bg-neutral-900 text-white py-3 text-sm border-b border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex items-center gap-2.5 hover:text-red-400 transition-colors duration-300">
              <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
              <a href="mailto:fastnetperu.eirl@gmail.com" className="hover:underline">
                fastnetperu.eirl@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 hover:text-blue-400 transition-colors duration-300">
              <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <a href="tel:942059874" className="hover:underline font-semibold">
                942 059 874
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <span className="text-xs md:text-sm">Lun-Vie: 9:00 AM - 6:00 PM | Sab: 9:00 AM - 1:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
