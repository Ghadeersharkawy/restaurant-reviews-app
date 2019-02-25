self.addEventListener('install',function (event) {
    event.waitUntil(
        caches.open('restaurant-review')
        .then(function(cache) {
            return cache.addAll([
                'index.html',
                'restaurant.html',
                'css/styles.css',
                'js/main.js',
                'js/restaurant_info.js',
                'js/dbhelper.js'
                
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });