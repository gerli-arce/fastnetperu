<?php
// Blog dynamic SEO bridge for static export
// Maneja /blog (listado) y /blog/slug (detalle) usando el backend PHP.

$apiBase = 'https://almacenback.fastnetperu.com.pe/api/posts';

header('Content-Type: text/html; charset=UTF-8');

// Resolve slug from query (?slug=) or path /blog/slug
$slug = '';
if (!empty($_GET['slug'])) {
    $slug = trim($_GET['slug']);
} else {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (preg_match('~^/blog/([^/]+)~', $uri, $m)) {
        $slug = urldecode($m[1]);
    }
}

function fetchJson($url)
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT => 'fastnetperu-blog-bridge',
    ]);
    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    return [$status, $body];
}

function fetchPosts($apiBase)
{
    [$status, $body] = fetchJson($apiBase);
    if ($status !== 200) {
        return [];
    }
    $json = json_decode($body, true);
    $items = isset($json['data']) && is_array($json['data']) ? $json['data'] : [];
    $result = [];
    foreach ($items as $post) {
        if (empty($post['visible']) || empty($post['status'])) {
            continue;
        }
        $result[] = $post;
    }
    return $result;
}

function fetchPostBySlug($apiBase, $slug)
{
    [$status, $body] = fetchJson($apiBase . '/slug?slug=' . urlencode($slug));
    if ($status !== 200) {
        return null;
    }
    $json = json_decode($body, true);
    if (empty($json['data']) || empty($json['data']['visible']) || empty($json['data']['status'])) {
        return null;
    }
    return $json['data'];
}

$post = null;
$posts = [];

if ($slug === '') {
    $posts = fetchPosts($apiBase);
} else {
    $post = fetchPostBySlug($apiBase, $slug);
}

// Default metadata
$title = 'Blog | FASTNETPERU';
$description = 'Historias y consejos sobre conectividad.';
$image = '/images/blog-placeholder.jpg';
$canonical = 'https://fastnetperu.com.pe/blog';
$isPost = false;

if ($post) {
    $isPost = true;
    $seoTitle = $post['seo_title'] ?? '';
    $seoDescription = $post['seo_description'] ?? '';
    $title = $seoTitle !== '' ? $seoTitle : ($post['title'] ?: $title);
    $description = $seoDescription !== '' ? $seoDescription : ($post['excerpt'] ?: $description);
    $image = $post['featured_image'] ?: $image;
    $canonical = 'https://fastnetperu.com.pe/blog/' . urlencode($post['slug'] ?: $post['id']);
}

// Simple bot detection to avoid redirecting crawlers/social previews
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$isBot = (bool) preg_match('/bot|crawl|spider|facebookexternalhit|Twitterbot|slackbot|WhatsApp|telegram/i', $ua);
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <meta name="description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>" />
  <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') ?>" />
  <meta property="og:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" />
  <meta property="og:description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>" />
  <meta property="og:type" content="<?= $isPost ? 'article' : 'website' ?>" />
  <meta property="og:url" content="<?= htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') ?>" />
  <meta property="og:image" content="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" />
  <meta name="twitter:description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>" />
  <meta name="twitter:image" content="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>" />
  <!-- Ajusta esta ruta al CSS de tu build exportado (ej: /_next/static/css/xxxxx.css) -->
  <link rel="stylesheet" href="/_next/static/chunks/c4aef34bd12e65a4.css" />
</head>
<body>
<?php if ($post && !$isBot): ?>
  <script>
    (function () {
      // Tras cargar metas del post, mandar a la página React con ?slug=
      try {
        var slug = <?= json_encode((string) ($post['slug'] ?: $post['id'])) ?>;
        if (typeof window !== 'undefined') {
          var params = new URLSearchParams(window.location.search || '');
          if (!params.has('slug')) {
            params.set('slug', slug);
            var target = '/blog/?' + params.toString();
            window.location.replace(target);
          }
        }
      } catch (e) {
        // ignore
      }
    })();
  </script>
<?php endif; ?>
<main style="max-width: 960px; margin: 2rem auto; padding: 1rem; font-family: system-ui, sans-serif; line-height: 1.6;">
  <?php if ($post): ?>
    <article>
      <p style="color: #475569; font-size: 0.9rem;"><?= htmlspecialchars($post['date_post'] ?? '', ENT_QUOTES, 'UTF-8') ?></p>
      <h1 style="font-size: 2rem; margin: 0.2rem 0 1rem;"><?= htmlspecialchars($post['title'] ?? '', ENT_QUOTES, 'UTF-8') ?></h1>
      <p style="color: #334155;"><?= htmlspecialchars($post['excerpt'] ?? '', ENT_QUOTES, 'UTF-8') ?></p>
      <div style="margin-top: 1.5rem; color: #1f2937;"><?= $post['content'] ?? '' ?></div>
    </article>
  <?php else: ?>
    <article>
      <h1 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Blog</h1>
      <?php if (!empty($posts)): ?>
        <?php foreach ($posts as $item): ?>
          <section style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 0.25rem;">
              <?= htmlspecialchars($item['date_post'] ?? '', ENT_QUOTES, 'UTF-8') ?>
            </p>
            <h2 style="font-size: 1.25rem; margin: 0.25rem 0;">
              <a href="/blog/<?= urlencode($item['slug'] ?: $item['id']) ?>" style="color: #0f172a; text-decoration: none;">
                <?= htmlspecialchars($item['title'] ?? '', ENT_QUOTES, 'UTF-8') ?>
              </a>
            </h2>
            <p style="color: #475569; margin: 0.25rem 0 0.5rem;">
              <?= htmlspecialchars($item['excerpt'] ?? '', ENT_QUOTES, 'UTF-8') ?>
            </p>
            <a href="/blog/<?= urlencode($item['slug'] ?: $item['id']) ?>" style="color: #2563eb; font-weight: 600;">
              Leer más
            </a>
          </section>
        <?php endforeach; ?>
      <?php else: ?>
        <p style="color: #475569;">No se encontró el post solicitado.</p>
      <?php endif; ?>
    </article>
  <?php endif; ?>
</main>
</body>
</html>
