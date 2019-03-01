self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('review_app')
        .then((caches) => {
            return caches.addAll([
                '/index.html',
                '/restaurant.html',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/sw_register.js',
                '/data/restaurants.json',
                '/css/styles.css'
            ]);
        })
    );
});

self.addEventListener('activate', (event)=> {

    var cacheWhitelist = ['review_app', 'review_app-v1'];
  
    event.waitUntil(
      caches.keys().then((cacheNames)=> {
        return Promise.all(
          cacheNames.map((cacheName) =>{
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {

            if (response) {
                return response;
            }

            return fetch(event.request).then(
                (response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(review_app)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});