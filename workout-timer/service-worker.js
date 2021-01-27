// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.CacheFirst()
// )

const loc = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

const staticCacheName = 'site-static';
const assets = [
    loc + '/',
    loc + '/index.html',
    loc + '/manifest.json',
    loc + '/assets/audio/beep-01.mp3',
    loc + '/assets/audio/beep-02.mp3',
    loc + '/assets/css/main.css',
    loc + '/assets/fonts/digital-7.ttf',
    loc + '/assets/icons/coffee.svg',
    loc + '/assets/icons/muscles.svg',
    loc + '/assets/icons/repeat.svg',
    loc + '/assets/icons/square.svg',
    loc + '/assets/icons/timer.svg',
    loc + '/assets/icons/timer2.svg',
    loc + '/assets/icons/triangle.svg',
    loc + '/assets/js/main.js',
    loc + '/assets/js/NoSleep.min.js'   
];


self.addEventListener('install', event => {
    // console.log('new SW has been installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', event => {
    // console.log('SW has been activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    )
});