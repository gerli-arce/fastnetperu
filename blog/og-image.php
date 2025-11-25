<?php
// Optimized OG image bridge
// Usage: /blog/og-image.php?slug=<slug>

$apiBase = 'https://almacenback.fastnetperu.com.pe/api/posts';

$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';

// Simple helper for JSON fetch
function og_fetch_json($url)
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT => 'fastnetperu-og-image-bridge',
    ]);
    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($status !== 200 || $body === false) {
        return null;
    }
    $json = json_decode($body, true);
    return is_array($json) ? $json : null;
}

// Get post by slug from backend
function og_fetch_post_by_slug($apiBase, $slug)
{
    if ($slug === '') {
        return null;
    }
    $json = og_fetch_json($apiBase . '/slug?slug=' . urlencode($slug));
    if (!$json || empty($json['data'])) {
        return null;
    }
    $post = $json['data'];
    if (empty($post['visible']) || empty($post['status'])) {
        return null;
    }
    return $post;
}

// Fallback placeholder if anything fails
function og_send_placeholder()
{
    $path = __DIR__ . '/../public/images/blog-placeholder.jpg';
    if (is_file($path)) {
        header('Content-Type: image/jpeg');
        header('Cache-Control: public, max-age=2592000');
        readfile($path);
    } else {
        http_response_code(404);
    }
    exit;
}

if ($slug === '') {
    og_send_placeholder();
}

$post = og_fetch_post_by_slug($apiBase, $slug);
if (!$post || empty($post['featured_image'])) {
    og_send_placeholder();
}

$src = $post['featured_image'];

// Fetch original image
$ch = curl_init($src);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'fastnetperu-og-image-fetch',
]);
$data = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

if ($status !== 200 || $data === false) {
    og_send_placeholder();
}

// If GD is not available, just proxy the original image
if (!function_exists('imagecreatefromstring')) {
    header('Content-Type: image/jpeg');
    header('Cache-Control: public, max-age=2592000');
    echo $data;
    exit;
}

$image = @imagecreatefromstring($data);
if (!$image) {
    og_send_placeholder();
}

$width = imagesx($image);
$height = imagesy($image);

$maxWidth = 1200;

// Resize if wider than maxWidth
if ($width > $maxWidth) {
    $targetWidth = $maxWidth;
    $targetHeight = (int) round($height * $targetWidth / $width);
    $resized = imagecreatetruecolor($targetWidth, $targetHeight);
    imagecopyresampled($resized, $image, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
    imagedestroy($image);
    $image = $resized;
}

ob_start();
// Encode as JPEG with quality 82 to reduce size
imagejpeg($image, null, 82);
imagedestroy($image);
$optimized = ob_get_clean();

if ($optimized === false) {
    og_send_placeholder();
}

header('Content-Type: image/jpeg');
header('Cache-Control: public, max-age=2592000');
header('Content-Length: ' . strlen($optimized));
echo $optimized;
exit;

