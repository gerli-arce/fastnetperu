"use client"

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { ArrowUpRight, Calendar, Share2, User } from "lucide-react"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
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
  dateRaw: string
  author: string
}

const POSTS_ENDPOINT = "https://almacenback.fastnetperu.com.pe/api/posts"

const toPathSlug = (value: string | number) =>
  `${value ?? ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const formatDate = (dateValue: string) => {
  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) return dateValue || ""
  return parsed.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
}

const mapApiPost = (post: ApiPost): BlogPost | null => {
  if (!post.visible || !post.status) return null
  const dateRaw = post.date_post || ""
  return {
    id: post.id,
    title: post.title || "Sin título",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    featured_image: post.featured_image || "",
    tag: "Blog",
    date: formatDate(dateRaw),
    dateRaw,
    author: "FASTNETPERU",
  }
}

const mapApiPosts = (items: ApiPost[]): BlogPost[] =>
  items
    .map((post) => mapApiPost(post))
    .filter((post): post is BlogPost => post !== null)

const findPostBySlug = (posts: BlogPost[], slug: string) => {
  const target = toPathSlug(slug)
  return posts.find((post) => {
    const candidates = [post.slug, toPathSlug(post.slug), toPathSlug(post.title), `${post.id}`]
    return candidates.map(toPathSlug).includes(target)
  })
}

const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null
  const res = await fetch(`${POSTS_ENDPOINT}/slug?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
  if (!res.ok) return null
  const json = await res.json()
  const data: ApiPost | undefined = json?.data
  if (!data) return null
  return mapApiPost(data)
}

function BlogPageContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [selectedLoading, setSelectedLoading] = useState(false)
  const [selectedError, setSelectedError] = useState<string | null>(null)
  const [copiedSeoLink, setCopiedSeoLink] = useState(false)

  const searchParams = useSearchParams()
  const slugParamRaw = searchParams?.get("slug") || ""
  const slugNormalized = useMemo(() => toPathSlug(slugParamRaw), [slugParamRaw])
  const baseUrl = "https://fastnetperu.com.pe"

  const selectedSeoUrl = useMemo(() => {
    if (!selectedPost) return `${baseUrl}/blog`
    const canonicalSlug = toPathSlug(selectedPost.slug || selectedPost.id)
    return `${baseUrl}/blog/${encodeURIComponent(canonicalSlug)}`
  }, [baseUrl, selectedPost])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(POSTS_ENDPOINT, { cache: "no-store" })
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

  useEffect(() => {
    if (!slugParamRaw) {
      setSelectedPost(null)
      setSelectedError(null)
      setSelectedLoading(false)
      return
    }

    const fromList = findPostBySlug(posts, slugNormalized)
    if (fromList) {
      setSelectedPost(fromList)
      setSelectedError(null)
      setSelectedLoading(false)
      return
    }

    let cancelled = false
    const load = async () => {
      setSelectedLoading(true)
      setSelectedError(null)
      try {
        const fetched = await fetchPostBySlug(slugNormalized)
        if (cancelled) return
        if (fetched) {
          setSelectedPost(fetched)
          setSelectedError(null)
        } else {
          setSelectedPost(null)
          setSelectedError("No se encontró el post solicitado, mostrando el listado.")
        }
      } catch {
        if (!cancelled) {
          setSelectedPost(null)
          setSelectedError("No se pudo cargar el post solicitado, mostrando el listado.")
        }
      } finally {
        if (!cancelled) setSelectedLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [posts, slugNormalized, slugParamRaw])

  const handleCopySeoUrl = async () => {
    if (!selectedPost) return
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(selectedSeoUrl)
      } else {
        const dummy = document.createElement("textarea")
        dummy.value = selectedSeoUrl
        document.body.appendChild(dummy)
        dummy.select()
        document.execCommand("copy")
        document.body.removeChild(dummy)
      }
      setCopiedSeoLink(true)
      setTimeout(() => setCopiedSeoLink(false), 2000)
    } catch {
      // ignore copy errors
    }
  }

  const metaTitle = selectedPost ? selectedPost.title : "Blog | FASTNETPERU"
  const metaDescription =
    selectedPost?.excerpt ||
    "Historias y consejos sobre conectividad para fibra, antenas y zonas rurales/urbanas de FASTNETPERU."
  const metaImage = selectedPost?.featured_image || "/images/blog-placeholder.jpg"
  const canonical = selectedPost
    ? `${baseUrl}/blog/${encodeURIComponent(toPathSlug(selectedPost.slug || selectedPost.id))}`
    : `${baseUrl}/blog`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content={selectedPost ? "article" : "website"} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>

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

      <main className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
        {slugParamRaw && (
          <section className="rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Detalle solicitado</p>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  {slugParamRaw} {!selectedLoading && selectedPost ? "" : "(buscando...)"}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {selectedPost && (
                  <button
                    type="button"
                    onClick={handleCopySeoUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedSeoLink ? "Link SEO copiado" : "Copiar link SEO"}</span>
                  </button>
                )}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Limpiar filtro
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {selectedLoading && (
              <div className="flex items-center gap-3 text-slate-600">
                <div className="inline-block w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Cargando post...</span>
              </div>
            )}

            {selectedError && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-sm font-medium">
                {selectedError}
              </div>
            )}

            {selectedPost && (
              <div className="mt-6 grid md:grid-cols-5 gap-6">
                <div className="relative md:col-span-2 h-56 md:h-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                  <Image
                    src={selectedPost.featured_image || "/images/blog-placeholder.jpg"}
                    alt={selectedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-semibold text-blue-700">
                      <Calendar className="w-4 h-4" />
                      {selectedPost.date}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 font-semibold text-indigo-700">
                      <User className="w-4 h-4" />
                      {selectedPost.author}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">{selectedPost.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-pretty">{selectedPost.excerpt}</p>
                  <div
                    className="prose prose-sm md:prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </div>
            )}
          </section>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    href={`/blog/?slug=${encodeURIComponent(toPathSlug(post.slug || post.id))}`}
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

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  )
}
