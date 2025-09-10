const CACHE_NAME = 'semensol-agro-v1';
const urlsToCache = [
  '/',             // homepage
  '/weighing',
  '/history',
  '/drivers',
  '/fleet',
  '/images/logo.png',
  '/images/favicon.ico',
  '/manifest.json'
];

// Install event - pré-cache das rotas/imagens definidas
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // novo SW assume imediatamente
});

// Fetch event - Stale-While-Revalidate, ignorando bundles do Next
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // não intercepta requests do Next.js (_next/*)
  if (url.pathname.startsWith('/_next/')) {
    return; // deixa o navegador buscar da rede/CDN
  }

  // intercepta apenas imagens, ícones, manifest e páginas básicas
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname === '/manifest.json' ||
    urlsToCache.includes(url.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse); // fallback offline

          return cachedResponse || fetchPromise;
        })
      )
    );
  }
});

// Activate event - limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});
