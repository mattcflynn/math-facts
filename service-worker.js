const CACHE_NAME = 'multiplication-practice-cache-v2';
const urlsToCache = [
  'index.html',
  'styles1.css',
  'mult.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Install the service worker and cache the necessary files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch the files from the cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // Optional: Return a fallback page for HTML requests
          if (event.request.mode === 'navigate') {
            return caches.match('index.html');
          }
        });
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});