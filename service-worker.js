const CACHE = 'futsallab-v3';
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
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/futsallab/app.html')))
  );
});
