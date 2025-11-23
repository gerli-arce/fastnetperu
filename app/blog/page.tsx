"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Calendar, User } from "lucide-react"
import { useEffect, useState } from "react"
import { HeaderTopBar } from "@/components/header-top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type ApiPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  date_post: string
  visible: boolean
  status: boolean | null
}

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  tag: string
  date: string
  author: string
}

const toPathSlug = (value: string | number) => `${value}`.trim().toLowerCase().replace(/\s+/g, "-")

const formatDate = (dateValue: string) => {
  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) return dateValue || ""
  return parsed.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
}

const mapApiPosts = (items: ApiPost[]): BlogPost[] =>
  items
    .filter((post) => post.visible && post.status)
    .map((post) => ({
      id: post.id,
      title: post.title || "Sin título",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image: post.featured_image || "",
      tag: "Blog",
      date: formatDate(post.date_post),
      author: "FASTNETPERU",
    }))

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://almacenback.fastnetperu.com.pe/api/posts", {
          cache: "no-store",
        })
        if (!response.ok) throw new Error("Error al obtener posts")
        const json = await response.json()
        const data: ApiPost[] = Array.isArray(json?.data) ? json.data : []
        setPosts(mapApiPosts(data))
      } catch (e) {
        setError("No se pudo cargar los posts. Intenta nuevamente.")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      <HeaderTopBar />
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/30 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-400/30 to-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 pt-8 pb-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] text-balance drop-shadow-sm">
              Historias y consejos sobre{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent blur-lg opacity-50" />
                <span className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  conectividad
                </span>
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Lee artículos hechos por nuestro equipo para ayudarte a tomar decisiones informadas sobre fibra, antenas y
              conectividad en zonas rurales y urbanas.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/contacto"
                className="group relative inline-flex items-center gap-2 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-8 py-4 font-semibold transition-all shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/60 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Contáctanos</span>
                <ArrowUpRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                href="/planes"
                className="group relative inline-flex items-center gap-2 rounded-full overflow-hidden border-2 border-slate-300 bg-white/90 backdrop-blur-md hover:border-blue-500 px-8 py-4 font-semibold text-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative group-hover:text-blue-600 transition-colors">Ver planes</span>
                <ArrowUpRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {loading && (
            <div className="col-span-full text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-slate-600 font-medium">Cargando publicaciones...</p>
            </div>
          )}

          {error && !loading && (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-50 text-red-600 font-medium border border-red-200">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 text-lg">Aún no hay publicaciones disponibles.</p>
            </div>
          )}

          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-600/20 hover:border-blue-400/60"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-indigo-500/20 group-hover:to-purple-500/20 rounded-3xl blur-sm transition-all duration-500 -z-10" />

              <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <Image
                  src={post.featured_image || "/images/blog-placeholder.jpg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-5 left-5">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-blue-600 text-xs font-bold uppercase tracking-wider shadow-xl shadow-blue-500/30 border border-blue-200/50 group-hover:scale-110 transition-transform duration-300">
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="relative p-8 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50/50">
                <div className="flex items-center gap-5 text-xs text-slate-500 mb-5 font-medium">
                  <div className="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100/50">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-50/80 px-3 py-1.5 rounded-full border border-indigo-100/50">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span className="text-indigo-700">{post.author}</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-5 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight text-balance">
                  {post.title}
                </h2>

                <p className="text-slate-600 mb-6 flex-1 line-clamp-3 leading-relaxed text-pretty">{post.excerpt}</p>

                <div className="pt-5 border-t border-slate-200/50">
                  <Link
                    href={`/blog/${encodeURIComponent(toPathSlug(post.slug || post.id))}`}
                    className="group/link relative inline-flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wide transition-all hover:gap-4 hover:text-indigo-600"
                  >
                    <span className="relative">
                      Leer más
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
