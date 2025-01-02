self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("pwa-demo-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/js/app.js",
                "/js/html5-qrcode.min.js",
                "/js/jquery.min.js",
                "/js/bootstrap.bundle.min.js",
                "/images/icons/android-chrome-192x192.png",
                "/images/icons/android-chrome-512x512.png",
                "/images/icons/apple-touch-icon.png",
                "/images/icons/favicon-16x16.png",
                "/images/icons/favicon-32x32.png",
                "/images/icons/favicon.ico",
                "/css/bootstrap.min.css",
                "/css/styles.css",
            ]).catch((error) => {
                console.error("Failed to cache all", error);
            } );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = ["pwa-demo-cache"];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});