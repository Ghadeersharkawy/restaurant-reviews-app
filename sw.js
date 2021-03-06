self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('review_app')
        .then((cache) => {
            return cache.addAll([
                '/index.html',
                '/restaurant.html',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
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

                    caches.open('review_app')
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});