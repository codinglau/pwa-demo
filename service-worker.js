self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("pwa-demo-cache").then((cache) => {
            return cache.addAll([
                "/pwa-demo/",
                "/pwa-demo/index.html",
                "/pwa-demo/manifest.json",
                "/pwa-demo/js/app.js",
                "/pwa-demo/js/html5-qrcode.min.js",
                "/pwa-demo/js/jquery.min.js",
                "/pwa-demo/js/bootstrap.bundle.min.js",
                "/pwa-demo/images/icons/android-chrome-192x192.png",
                "/pwa-demo/images/icons/android-chrome-512x512.png",
                "/pwa-demo/images/icons/apple-touch-icon.png",
                "/pwa-demo/images/icons/favicon-16x16.png",
                "/pwa-demo/images/icons/favicon-32x32.png",
                "/pwa-demo/images/icons/favicon.ico",
                "/pwa-demo/css/bootstrap.min.css",
                "/pwa-demo/css/styles.css",
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