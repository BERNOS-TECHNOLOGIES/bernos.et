<?php
function generateMetaTags($title, $description, $keywords, $canonical = '') {
    $meta = '';
    
    $meta .= '<meta charset="UTF-8">' . PHP_EOL;
    $meta .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . PHP_EOL;
    $meta .= '<title>' . htmlspecialchars($title) . '</title>' . PHP_EOL;
    $meta .= '<meta name="description" content="' . htmlspecialchars($description) . '">' . PHP_EOL;
    $meta .= '<meta name="keywords" content="' . htmlspecialchars($keywords) . '">' . PHP_EOL;
    
    $meta .= '<meta property="og:title" content="' . htmlspecialchars($title) . '">' . PHP_EOL;
    $meta .= '<meta property="og:description" content="' . htmlspecialchars($description) . '">' . PHP_EOL;
    $meta .= '<meta property="og:type" content="website">' . PHP_EOL;
    $meta .= '<meta property="og:url" content="https://bernos.et' . ($_SERVER['REQUEST_URI'] ?? '/') . '">' . PHP_EOL;
    $meta .= '<meta property="og:site_name" content="Bernos Technologies">' . PHP_EOL;
    
    $meta .= '<meta name="twitter:card" content="summary_large_image">' . PHP_EOL;
    $meta .= '<meta name="twitter:title" content="' . htmlspecialchars($title) . '">' . PHP_EOL;
    $meta .= '<meta name="twitter:description" content="' . htmlspecialchars($description) . '">' . PHP_EOL;
    
    if (!empty($canonical)) {
        $meta .= '<link rel="canonical" href="' . htmlspecialchars($canonical) . '">' . PHP_EOL;
    } else {
        $meta .= '<link rel="canonical" href="https://bernos.et' . ($_SERVER['REQUEST_URI'] ?? '/') . '">' . PHP_EOL;
    }
    
    return $meta;
}

function generateStructuredData($type, $data) {
    $jsonLD = array(
        '@context' => 'https://schema.org',
        '@type' => $type
    );
    
    foreach ($data as $key => $value) {
        $jsonLD[$key] = $value;
    }
    
    return '<script type="application/ld+json">' . json_encode($jsonLD, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
}
?> 