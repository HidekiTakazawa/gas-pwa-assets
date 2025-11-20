const CACHE_NAME = 'chinese-checker-cache-v1';
// キャッシュするファイルのリスト。'./'はアプリのルートURL (/exec) を指します。
const urlsToCache = [
  './'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetchイベントでリクエストを横取りし、キャッシュにあればそれを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す。なければネットワークにリクエストする。
        return response || fetch(event.request);
      }
    )
  );
});
