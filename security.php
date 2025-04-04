<?php
function blockCurlRequests() {
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $blockedAgents = array('curl', 'wget', 'libwww-perl', 'python-requests', 'python-urllib', 'go-http-client');
    
    foreach ($blockedAgents as $agent) {
        if (stripos($userAgent, $agent) !== false) {
            header('HTTP/1.0 403 Forbidden');
            exit('Access Denied');
        }
    }
    
    if (empty($userAgent)) {
        header('HTTP/1.0 403 Forbidden');
        exit('Access Denied');
    }
}

function addSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
}

function rateLimiter() {
    session_start();
    $timeFrame = 60;
    $requestLimit = 60;
    
    $currentTime = time();
    if (!isset($_SESSION['requests'])) {
        $_SESSION['requests'] = array();
    }
    
    $_SESSION['requests'][] = $currentTime;
    
    $_SESSION['requests'] = array_filter($_SESSION['requests'], function($time) use ($currentTime, $timeFrame) {
        return ($currentTime - $time) < $timeFrame;
    });
    
    if (count($_SESSION['requests']) > $requestLimit) {
        header('HTTP/1.0 429 Too Many Requests');
        exit('Rate limit exceeded. Please try again later.');
    }
}

blockCurlRequests();
addSecurityHeaders();
rateLimiter();
?> 