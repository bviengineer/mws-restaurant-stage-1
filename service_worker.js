// self.addEventListener("fetch", function(event){
//     console.log(event.request);
// });

//Array of files to be cached for offline use 
const offlineFiles = [
    "/",
    "index.html", "restaurant.html",
    "css/styles.css",
    "/data/restaurants.json",
    "/js/main.js", "/js/restaurant_info.js", "/js/dbhelper.js",
    "/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg", "/img/5.jpg",
    "/img/6.jpg", "/img/7.jpg", "/img/8.jpg", "/img/9.jpg", "/img/10.jpg",
    // "//normalize-css.googlecode.com/svn/trunk/normalize.css",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
];

//Adds offlineFiles to cache
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open("version1").then(function(cache){
            console.log("I'm in side of the caches.open");
            return cache.addAll(offlineFiles);            
        })
    );
});

// caches.open("offlineFiles").then(function(cache){
//     console.log(offlineFiles);
// });