// 安装
const APP_ASSETS_CACHE_NAME = 'shuang-bau-cache-v19.6.18';
self.addEventListener('install', function (e) {
  console.log('Service Worker installing.');
  e.waitUntil(
    self
      .caches
      .open(APP_ASSETS_CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          'https://kuas1091104337.github.io/move_house/css/layout.min.css',
          'https://kuas1091104337.github.io/move_house/images/car1.jpg',
          'https://kuas1091104337.github.io/move_house/images/car2.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing0.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing1.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing2.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing3.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing4.jpg',
          'https://kuas1091104337.github.io/move_house/images/packing5.jpg',
          'https://kuas1091104337.github.io/move_house/images/people1.jpg',
          'https://kuas1091104337.github.io/move_house/images/people2.jpg',
          'https://kuas1091104337.github.io/move_house/js/index.js',
          'https://kuas1091104337.github.io/move_house/json/manifest.json',
        ])
      })
  )
  // 缓存 App Shell 等关键静态资源和 html (保证能缓存的内容能在离线状态跑起来)
});
// 激活
self.addEventListener('activate', function (e) {
  console.log('Service Worker activating.');
  // 激活的状态，这里就做一做老的缓存的清理工作
  e.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function(cacheName) {
              // Return true if you want to remove this cache, but remember that caches are shared across the whole origin
            })
            .map(function(cacheName) {
              return caches.delete(cacheName)
            })
        )
      })
  )
});
// 缓存请求和返回（这是个简单的缓存优先的例子）
self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] - fetch event')
  e.respondWith(
    self
      .caches
      .match(e.request)
      .then(result => {
        if (result == null) {
          // return fetch(e.request)
          return fetchAndCache(e.request);
        }
        return result
      })
      .catch(error => {
        console.error('Fetch Failed', error)
      })
  )
});