const CACHE_NAME = 'jungle-rent-v1.0.2';
const RUNTIME_CACHE = 'jungle-rent-runtime-v2';

// Assets to cache during installation (only truly static assets)
const PRECACHE_ASSETS = [
  '/manifest.json',
  '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Check if request is for build-critical assets (JS/CSS/HTML)
function isBuildCritical(request) {
  const url = request.url;
  const destination = request.destination;
  
  // Scripts and styles - always network first
  if (destination === 'script' || destination === 'style') {
    return true;
  }
  
  // JS/CSS files by extension
  if (url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.mjs') || url.endsWith('.map')) {
    return true;
  }
  
  // Vite build assets and deps
  if (url.includes('/assets/') || url.includes('node_modules/.vite')) {
    return true;
  }
  
  return false;
}

// Fetch event - network-first for critical assets, cache-first for static
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Kill switch: ?nocache=1 bypasses all caching
  if (event.request.url.includes('nocache=1')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Handle navigation requests - NETWORK FIRST for HTML
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/'))
        .then(response => response || fetch(event.request))
    );
    return;
  }

  // Build-critical assets (JS/CSS) - NETWORK FIRST, no caching
  if (isBuildCritical(event.request)) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets (images, fonts) - cache first with network fallback
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(fetchResponse => {
        // Don't cache non-successful responses
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }

        // Only cache images and fonts
        const destination = event.request.destination;
        if (destination === 'image' || destination === 'font') {
          const responseToCache = fetchResponse.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }

        return fetchResponse;
      });
    })
  );
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: 'Hai una nuova notifica da Jungle Rent',
    icon: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png',
    badge: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Visualizza',
        icon: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png'
      },
      {
        action: 'close',
        title: 'Chiudi',
        icon: '/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('Jungle Rent', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  } else if (event.action === 'close') {
    return;
  } else {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      console.log('Background sync triggered')
    );
  }
});
