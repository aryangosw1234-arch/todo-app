const CACHE_NAME = "todo-app-v2";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/todo-app/",
        "/todo-app/index.html",
        "/todo-app/style.css",
        "/todo-app/script.js",
        "/todo-app/manifest.json",
        "/todo-app/icon.png"
      ]);
    })
  );
});
