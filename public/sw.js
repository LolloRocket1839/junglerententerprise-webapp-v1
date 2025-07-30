const CACHE_NAME = 'jungle-rent-v1.0.0';
const RUNTIME_CACHE = 'jungle-rent-runtime';

// Assets to cache during installation
const PRECACHE_ASSETS = [
  '/',
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/').then(response => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  // Handle other requests
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

        // Clone the response before caching
        const responseToCache = fetchResponse.clone();

        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(event.request, responseToCache);
        });

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
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});