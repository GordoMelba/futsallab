const CACHE = 'futsallab-v4';
const ASSETS = [
  '/futsallab/',
  '/futsallab/index.html',
  '/futsallab/app.html',
  '/futsallab/manifest.json',
  '/futsallab/icon.png',
  '/futsallab/logoletras.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first: intenta la red, si falla usa caché (para modo offline)
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Guardar copia fresca en caché
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('/futsallab/app.html')))
  );
});
