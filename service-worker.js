const CACHE_NAME = "todo-app-v3";

self.addEventListener("install", (event) => {
  self.skipWaiting(); // IMPORTANT
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/todo-app/",
        "/todo-app/index.html",
        "/todo-app/style.css",
        "/todo-app/script.js",
        "/todo-app/icon.png"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // IMPORTANT
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
