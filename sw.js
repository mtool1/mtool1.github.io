const CACHE_NAME = 'mega-tools-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/privacy.html',
  '/contact.html',
  '/css/style.css',
  '/js/main.js',
  '/js/i18n.js',
  '/js/site-data.js',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/og-image.png',
  '/sitemap.xml',
  '/robots.txt',
  '/category-text-tools.html',
  '/category-image-tools.html',
  '/category-developer-tools.html',
  '/category-converters.html',
  '/category-generators.html',
  '/category-security-tools.html',
  '/category-utility-tools.html',
  '/tools/word-counter.html',
  '/tools/password-generator.html',
  '/tools/json-formatter.html',
  '/tools/base64-encoder.html',
  '/tools/uuid-generator.html',
  '/tools/image-compressor.html',
  '/tools/image-resizer.html',
  '/tools/age-calculator.html',
  '/tools/unit-converter.html',
  '/tools/lorem-generator.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) return cacheResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!event.request.url.startsWith('http')) return networkResponse;
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
