// Service worker script

// Define the cache name
const cacheName = 'my-site-cache-v1';

// List of URLs to cache
const urlsToCache = [
  '/',
  'index.html',
  'css/style.css',
  'js/script.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            return response || fetch(event.request);
          });
      })
  );
});