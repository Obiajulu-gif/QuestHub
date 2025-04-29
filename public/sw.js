// Service Worker for image caching
const CACHE_NAME = "questhub-image-cache-v1"
const IMAGE_CACHE_URLS = [
  "/hero-battle.png",
  "/hero-badges.png",
  "/hero-rewards.png",
  "/badges/early-adopter.png",
  "/badges/quest-master.png",
  "/badges/quiz-wizard.png",
  "/badges/first-quest.png",
  "/quest-knowledge.png",
  "/quest-riddle.png",
  "/quest-brain.png",
  "/quest-logic.png",
  "/quest-memory.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(IMAGE_CACHE_URLS)
    }),
  )
})

self.addEventListener("fetch", (event) => {
  // Only cache image requests
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached image if available
        if (response) {
          return response
        }

        // Otherwise fetch from network and cache
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      }),
    )
  } else {
    // For non-image requests, just fetch from network
    event.respondWith(fetch(event.request))
  }
})

// Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
