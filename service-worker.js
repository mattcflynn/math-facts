const CACHE_NAME = 'multiplication-practice-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './multiplication-practice.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
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
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return the cached version if present, otherwise fetch from the network
        return response || fetch(event.request);
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});