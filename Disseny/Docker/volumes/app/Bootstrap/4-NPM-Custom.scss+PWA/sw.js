 
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';


self.addEventListener('install', (event) => { 
  event.waitUntil(caches.open(cacheName).then((cache) => { 
    return cache.addAll([
      '/index.html',
      '/css/custom.css', 
      '/js/bootstrap.min.js',
      '/img/lupa.png',
    ]);
  }));
}); 

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
  } else {
    return;
  }
});