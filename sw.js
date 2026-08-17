const CACHE_NAME = 'jidelnicek-v12'; // Vždy zvyšte verzi při změně
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ikona-app.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Okamžitá aktivace
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim(); // Převzetí kontroly nad všemi okny
});

// NEJDŮLEŽITĚJŠÍ ČÁST: Bezpečná obsluha požadavků
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Pokud máme v cache, vrátíme
      }
      // Pokud nemáme v cache, zkusíme síť, a pokud selže síť (jsme offline),
      // vrátíme hlavní index.html, aby nebyla bílá obrazovka
      return fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});