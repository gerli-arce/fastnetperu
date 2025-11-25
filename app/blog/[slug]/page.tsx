import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { notFound } from "next/navigation"
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
  date: string
  formattedDate: string
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
  const dateValue = post.date_post || ""

  return {
    id: post.id,
    title: post.title || "Sin título",
    slug: post.slug || `${post.id}`,
    excerpt: post.excerpt || "",
    content: post.content || "",
    featured_image: post.featured_image || "",
    date: dateValue,
    formattedDate: formatDate(dateValue),
  }
}

const mapApiPosts = (items: ApiPost[]): BlogPost[] =>
  items
    .map((post) => mapApiPost(post))
    .filter((post): post is BlogPost => post !== null)

async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(POSTS_ENDPOINT, { next: { revalidate: 120 } })
  if (!res.ok) throw new Error("No se pudieron obtener los posts")
  const json = await res.json()
  const data: ApiPost[] = Array.isArray(json?.data) ? json.data : []
  return mapApiPosts(data)
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null
  const res = await fetch(`${POSTS_ENDPOINT}/slug?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 120 },
  })
  if (!res.ok) return null
  const json = await res.json()
  const data: ApiPost | undefined = json?.data
  if (!data) return null
  return mapApiPost(data)
}

const sortByDateDesc = (posts: BlogPost[]) =>
  [...posts].sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    if (Number.isNaN(da) || Number.isNaN(db)) return 0
    return db - da
  })

const buildSlugCandidates = (...values: (string | number | undefined)[]) =>
  Array.from(
    new Set(
      values
        .filter((item) => item !== undefined && item !== null)
        .map((item) => decodeURIComponent(String(item)))
        .flatMap((item) => [item, toPathSlug(item)])
        .map((item) => item || "")
        .filter(Boolean),
    ),
  )

const findPostBySlug = (posts: BlogPost[], slug: string) => {
  const target = toPathSlug(slug)
  return posts.find((post) => {
    const candidates = [post.slug, toPathSlug(post.slug), toPathSlug(post.title), `${post.id}`, toPathSlug(post.id)]
    return candidates.map(toPathSlug).includes(target)
  })
}

const resolveSlugParam = async (params: { slug: string } | Promise<{ slug: string }>) => {
  const resolved = typeof (params as any)?.then === "function" ? await (params as Promise<{ slug: string }>) : params
  return resolved?.slug || ""
}

export default async function BlogDetailPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const slugParamRaw = await resolveSlugParam(params)
  const slugDecoded = decodeURIComponent(slugParamRaw || "")
  const slugNormalized = toPathSlug(slugDecoded || slugParamRaw)

  const candidates = buildSlugCandidates(slugParamRaw, slugDecoded, slugNormalized)

  let posts: BlogPost[] = []
  try {
    posts = await fetchPosts()
  } catch {
    posts = []
  }

  let current: BlogPost | null = findPostBySlug(posts, slugNormalized) || null

  if (!current) {
    for (const candidate of candidates) {
      current = await fetchPostBySlug(candidate)
      if (current) break
    }
  }

  if (current && posts.length && !posts.some((post) => post.id === current!.id)) {
    posts = [current, ...posts]
  }

  if (!current) {
    notFound()
  }

  const relatedSource = posts.length ? posts : [current]
  const related = sortByDateDesc(relatedSource).filter((post) => post.id !== current.id).slice(0, 3)

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-blue-50/30 to-white min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.08)_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none" />

      <HeaderTopBar />
      <Navbar />

      <main className="relative mx-auto max-w-6xl px-4 py-12 space-y-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="relative">
            Volver al blog
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        <article className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-neutral-950 text-white shadow-2xl shadow-blue-900/10 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-900/20">
          <div className="absolute inset-0">
            <Image
              src={current.featured_image || "/images/blog-placeholder.jpg"}
              alt={current.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />

          <div className="relative p-8 md:p-16 lg:p-24 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.32em]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold backdrop-blur-xl border border-white/20 shadow-lg text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Blog
              </span>
              <span className="h-[1px] w-12 bg-gradient-to-r from-white/50 to-transparent" />
              <span className="text-blue-100/90 font-semibold">{current.formattedDate}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-white drop-shadow-2xl [text-shadow:_0_2px_20px_rgb(59_130_246_/_0.5)]">
              {current.title}
            </h1>

            <p className="text-lg md:text-xl text-blue-50/95 max-w-3xl leading-relaxed text-pretty font-light">
              {current.excerpt}
            </p>
          </div>
        </article>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="group rounded-3xl bg-white border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10 space-y-8 hover:border-blue-200/60">
              <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-slate-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 text-[11px] font-bold text-white shadow-md shadow-blue-500/30 uppercase tracking-wider">
                  Publicado
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-sm font-semibold text-slate-600">{current.formattedDate}</span>
              </div>

              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-pretty
                  prose-li:text-slate-700 prose-li:leading-relaxed
                  prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-slate-700
                  prose-img:rounded-2xl prose-img:shadow-lg
                  whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: current.content }}
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-6 rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-white border border-slate-200/60 shadow-xl p-6 space-y-6 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">Ficha del post</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300">
                  <span className="text-sm font-medium text-slate-500">Fecha</span>
                  <span className="font-bold text-slate-900">{current.formattedDate}</span>
                </div>
              </div>

              <Link
                href="/blog"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Ver todos los posts</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="relative rounded-3xl border border-slate-200/60 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 shadow-xl p-8 md:p-10 space-y-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />

          <div className="relative flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500 font-bold">Sigue leyendo</p>
              <h2 className="text-3xl font-bold text-slate-900 text-balance">Posts relacionados</h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-all duration-300"
            >
              <span className="relative">
                Ver todos
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3">
            {related.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300/60 transition-all duration-500"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.featured_image || "/images/blog-placeholder.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6 flex-1 flex flex-col gap-3">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-500 font-bold">
                    {post.formattedDate}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                  <Link
                    href={`/blog/${encodeURIComponent(toPathSlug(post.slug || post.id))}`}
                    className="group/link mt-auto inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-all duration-300"
                  >
                    <span className="relative">
                      Leer más
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slugRaw = await resolveSlugParam(params)
  const slugDecoded = decodeURIComponent(slugRaw || "")
  const slugNormalized = toPathSlug(slugDecoded || slugRaw)
  const candidates = buildSlugCandidates(slugRaw, slugDecoded, slugNormalized)

  const posts = await fetchPosts().catch(() => [])
  let current = findPostBySlug(posts, slugNormalized) || null

  if (!current) {
    for (const candidate of candidates) {
      current = await fetchPostBySlug(candidate)
      if (current) break
    }
  }

  if (current) {
    const title = current.title || "Blog | FASTNETPERU"
    const description = current.excerpt || "Historias y consejos sobre conectividad."
    const image = current.featured_image || "/images/blog-placeholder.jpg"
    const url = `https://fastnetperu.com.pe/blog/${encodeURIComponent(toPathSlug(current.slug || current.id))}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        type: "article",
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    }
  }

  return {
    title: "Blog | FASTNETPERU",
    description: "Historias y consejos sobre conectividad.",
  }
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts()
    return posts.map((post) => ({ slug: toPathSlug(post.slug || post.id) }))
  } catch {
    return []
  }
}
