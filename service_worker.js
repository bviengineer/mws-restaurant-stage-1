/*
Matthew Cranford's Part 4 Walkthrough was a guide during this part of the project.
https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
*/

//Array of files to be cached for offline use 
const offlineFiles = [
    "/",
    "index.html", "restaurant.html",
    "/css/styles.css",
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
        caches.open("appVersion1").then(function(cache){
           // console.log("I'm in side of the caches.open-initial entry of files to cache"); //testing purposes
            return cache.addAll(offlineFiles);            
        })
    );
});

//Fetching requested files from cache
self.addEventListener("fetch", function(event){
    console.log(event.request); //testing
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                //console.log(event.request, " is in the cache"); //testing
                return response;
            } else {
               // console.log(event.response, " was not in the cache, will obtain it via a fetch"); //testing
                return fetch(event.request)
                
                //Receives fetched resource form above return statement & pushes it to the cache
                .then(function(response){
            
                    const response2 = response.clone(); //clones' response object
                    
                    caches.open("appVersion1").then(function(cache){
                        cache.put(event.request, response2);
                        console.log(cache); //verifying new resoruce has been added to the cache
                        //return response.clone();
                    })
                    return response;
                  
                    //Will catch and log error if one occurs while adding new resource to cache  
                }).catch(function(error){
                    console.log(error);
                });
            }            
        })
    );
});