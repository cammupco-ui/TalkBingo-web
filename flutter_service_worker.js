'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache-v2';

const RESOURCES = {"flutter_bootstrap.js": "74d364b5001e43155ef17df964b71797",
"guide_bingo.html": "4590b6fd44b5a1f538a00ba4339cb50f",
"version.json": "975b18bd614b77fd4c829cfbc46566d7",
"index.html": "6ed4c2639529d3ebf2df48333539a17a",
"/": "6ed4c2639529d3ebf2df48333539a17a",
"CNAME": "6a833849f699a4a5a3da962b67295abb",
"googleadd3a33693be7912.html": "f2873ca2d490a615aef1f828b4bfa919",
"main.dart.js": "4e1eb1359514453b3f204c2f1a517755",
"privacy_en.html": "08c85510f8f610dd19c375026a085285",
"ads.txt": "f3d4401d0fbf94bf64c519aaeb384a27",
".well-known/apple-app-site-association": "92207d5a27fc0f17be8ad46d1d6823d3",
".well-known/assetlinks.json": "3cb6ef7852ed04e8d824c3d3b054e03f",
"terms.html": "cab06bd8337b0e69168be7666ba58e69",
"404.html": "884fdd4b6255e9108cf9ee9a2432abba",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"app-ads.txt": "490dcb3c0fc20509017c3e17cd7c844f",
"favicon.png": "1969fb60d3b8cc823fed21cd431dd72d",
"guide_points.html": "0704ed65ce01aca2dc4478177af94d69",
"icons/Icon-192.png": "b1d0fb005db1f12b5ce1c317d678ab17",
"icons/Icon-maskable-192.png": "b1d0fb005db1f12b5ce1c317d678ab17",
"icons/Icon-maskable-512.png": "219427107deba332c079c717bcd6c4d7",
"icons/Icon-512.png": "219427107deba332c079c717bcd6c4d7",
"guide_points_en.html": "f9888e3630dc930d437eb8e470d8a56c",
"manifest.json": "094d26e493534907192ff6d154462c09",
"sitemap.xml": "9d34035edb63d42ed29799ca5c8195bf",
"assets/AssetManifest.json": "0c1ccffcd0cf6728e76f143ae8b7686c",
"assets/NOTICES": "d0e063adfe73f16f426dd66b811c0259",
"assets/FontManifest.json": "f690e1ef038dbabb7823f9ae7f907d48",
"assets/AssetManifest.bin.json": "311208ec2e189dc7d7780e6da9626c8c",
"assets/packages/iamport_flutter/assets/images/iamport-logo.png": "2face5c40217bba082ef64aa5c66e9b6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/record_web/assets/js/record.fixwebmduration.js": "1f0108ea80c8951ba702ced40cf8cdce",
"assets/packages/record_web/assets/js/record.worklet.js": "6d247986689d283b7e45ccdf7214c2ff",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e9a2c31b30e14fa75a21bd5073b47a34",
"assets/fonts/MaterialIcons-Regular.otf": "82f5b17ac430640eb0a58e7fd830401b",
"assets/assets/images/animalvectorized.svg": "e3340ef0056f7132757f154c30b479de",
"assets/assets/images/arrow.svg": "9c40fdf9fc952852c19163d29243d36e",
"assets/assets/images/soccerball.svg": "24756ae2df7fc700c8adff43b8ddec90",
"assets/assets/images/Restart_icon.svg": "e6e43d74e86d6427e02ebcb6cb821b58",
"assets/assets/images/HomeMainButton.svg": "2b981588d2e337821fb0a5fd49e38dbb",
"assets/assets/images/AppIcon_talkbingo.png": "121c06bf3f49bbe3b9b7a10dfed2bc7b",
"assets/assets/images/logo_36.png": "0ea564b60545bb5caaff7aead58633e2",
"assets/assets/images/HomeMainButton2.svg": "e9251ef0382f08769e00e7ca4dd2342e",
"assets/assets/images/Targetboard.svg": "78c289c274cd70b7f201e52b0bf54ebc",
"assets/assets/images/logo_24.png": "cd7ebbefdcc46325b854cfb4357a7416",
"assets/assets/images/Bow.svg": "10f3e6232ce0808cb2177b2053d27137",
"assets/assets/images/Goalkeeper.svg": "8d8a743cdd113534b65c75b54df3711b",
"assets/assets/images/open_icon.svg": "1ff995078412cb1bea44c43b8ac6b43a",
"assets/assets/images/Setting.svg": "afa85022424c54129464f04aacb70429",
"assets/assets/images/save_icon.svg": "d947c806e90b798f3125515d1f9febc0",
"assets/assets/images/Bow_2.svg": "688ad265ac84c7fc6f56f26d9565b7da",
"assets/assets/images/Notice.svg": "ba9d9be78ce95680cf4dc93bc8d25fb0",
"assets/assets/images/TalkBingo_AppIcon.png": "d87c7cef3052f0d0253bb0ab951aad2f",
"assets/assets/images/anmimalVector/3bear.svg": "91b2e67d314291f4e90a75d79dbcf950",
"assets/assets/images/anmimalVector/10eleph.svg": "2cf1e7467e8f2656dcc3090135c98797",
"assets/assets/images/anmimalVector/7fox.svg": "e8d4386c1543a6dad9521ff0658a2e31",
"assets/assets/images/anmimalVector/4lion.svg": "19d8a127345e4d59dd1bcadf4578f843",
"assets/assets/images/anmimalVector/8rabbit.svg": "7ea094025622aeb051fca914074825f8",
"assets/assets/images/anmimalVector/1dog.svg": "8409a10d3e9c417ea263dd2234e9f650",
"assets/assets/images/anmimalVector/5panda.svg": "d1d2535301c69cd61175dfa40909ce43",
"assets/assets/images/anmimalVector/2cat.svg": "11d22c8dfa9ecd01fb71098741bdd1a5",
"assets/assets/images/anmimalVector/9tiger.svg": "d610215c0f9aa8d5eee239571e98e0aa",
"assets/assets/images/anmimalVector/6coara.svg": "dea8fda07ed854866200374901d161d2",
"assets/assets/images/MainButtonVector.svg": "c6865c812297686f894a4ca4edcdd915",
"assets/assets/images/End_icon.svg": "f2f95de57ec31bd1c4b6079ad7a40f7d",
"assets/assets/images/logo_vector.svg": "84e9d3fc5105ea4c5d7944ca23279b16",
"assets/assets/images/logo_48.png": "5aaccc33ab2b71199169c1106fd878e7",
"assets/assets/images/pause_icon.svg": "dbe0d9d917a5c90da411b5198ddc1115",
"assets/assets/images/google_logo.svg": "9d1505ce71a16305b4c5d68511fe463c",
"assets/assets/images/PointPlus.svg": "a99c37f782179c793688688d8385ac32",
"assets/assets/images/Mainvector.svg": "11e33e29cfed945d46a196b4d86ad93c",
"assets/assets/images/open_icon.png": "3de7736ff83a4ea9b09931f42c4b4e72",
"assets/assets/images/play_icon.svg": "56c46b0acb1b60acf8e793506c7bc1d4",
"assets/assets/audio/thock_mid.wav": "2ee27b2d2f285fa795dc4f413e8eb835",
"assets/assets/audio/thock_low.wav": "df1076a3ec9abbbe7aa7361fa04291b1",
"assets/assets/audio/typing_high.wav": "31e1803e3ecaeecc56f05be133a29247",
"assets/assets/audio/thock_high.wav": "e27e5c2e177dec6ae619eb941b528220",
"assets/assets/audio/typing_mid.wav": "dd54b5b28e322597d72ecdb008a9900e",
"assets/assets/audio/disabled.wav": "6dc8fc17062320dc77973472cdc7169f",
"assets/assets/fonts/Nura%2520Normal.ttf": "e711293a5915f25961d14f286c8d81e7",
"assets/assets/fonts/Nura%2520ExtraBold.ttf": "c4d6d8ac4490b402c8b4b150f74fd123",
"assets/assets/fonts/EliceDigitalBaeum_Bold.ttf": "59af972a5ac77204d2c382b09180ab60",
"assets/assets/fonts/Nura%2520Bold.ttf": "b1f4e04d3b2e90ffec5acee63290e57d",
"assets/assets/fonts/Nura%2520Light.ttf": "71f3e878e878c01fb4bf0ff018d03870",
"assets/assets/fonts/EliceDigitalBaeum_Regular.ttf": "281cb68d44cde40dea399119199cfc67",
"privacy.html": "171f03bcc95a2e73c3b4e9f54c4c7e82",
"terms_en.html": "c5ab5a81e46273dea0ffc72b9554efa0",
"guide_bingo_en.html": "93b798048a1aabf41ab42c0864272e80",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
