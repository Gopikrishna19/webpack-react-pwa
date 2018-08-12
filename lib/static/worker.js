const MY_NEXT_TASK_CACHE = '{{name}}.{{version}}';
const files = [
  './',
  'images/icon-72x72.png',
  'images/icon-96x96.png',
  'images/icon-128x128.png',
  'images/icon-144x144.png',
  'images/icon-152x152.png',
  'images/icon-192x192.png',
  'images/icon-384x384.png',
  'images/icon-512x512.png',
  'favicon.ico',
  'index.css',
  'index.html'
];

const getCache = () => MY_NEXT_TASK_CACHE;

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(MY_NEXT_TASK_CACHE)
      .then(cache => cache.addAll(files))
      .catch(() => null)
  );
});

self.addEventListener('activate', event => {
  self.clients.claim();

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .map(key => key !== MY_NEXT_TASK_CACHE ? caches.delete(key) : null)
          .filter(promise => promise)
      ))
  );
});

const fetchAndCache = request => fetch(request)
  .then(response => {
    caches.open(getCache(request)).then(cache => {
      cache.put(request, response).catch(() => {});
    });

    return response.clone();
  });

const cacheFirst = request => caches.match(request)
  .then(response => response || fetchAndCache(request));

const networkFirst = request => fetchAndCache(request)
  .catch(() => caches.match(request));

self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  const path = url.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1);

  if (/\/api\//.test(path) || file === 'worker.js') {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
