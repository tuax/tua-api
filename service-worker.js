/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4f96b1fa436ad69f34ac5a7f6a0f9b31"
  },
  {
    "url": "assets/css/0.styles.74beca84.css",
    "revision": "83246f757c2f14f421c5c1e86dabaf28"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4de27916.js",
    "revision": "552a0afed0b30e686948179af24d3bed"
  },
  {
    "url": "assets/js/11.f7926ce8.js",
    "revision": "47fdbd20774e09b2d683c1b78d3a4b54"
  },
  {
    "url": "assets/js/12.5dfdc5ae.js",
    "revision": "5987f96337a71f3faf2e6aa1eb7e83a5"
  },
  {
    "url": "assets/js/13.016da1ff.js",
    "revision": "14e2781bc18dea7a06513158cf334d3b"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.7c0b9fb1.js",
    "revision": "62743958309dab2c52ea9a790514ef3b"
  },
  {
    "url": "assets/js/4.cfa066f1.js",
    "revision": "1b090486c41a10ae3fe8fdb05fe984ae"
  },
  {
    "url": "assets/js/5.f270ecdf.js",
    "revision": "320e02b13854220835eb0dc30263d39c"
  },
  {
    "url": "assets/js/6.4edb68df.js",
    "revision": "2857d0b6e0a0ec9d125ec7bf927bb558"
  },
  {
    "url": "assets/js/7.45356367.js",
    "revision": "d0f1f940c1551f39033eb041bc24f6d5"
  },
  {
    "url": "assets/js/8.cb99ad27.js",
    "revision": "64e1fd7c6a6d7fd7aadadb5abc2f3021"
  },
  {
    "url": "assets/js/9.283c5a42.js",
    "revision": "34f826ff1b739f21bc8726ceac02c204"
  },
  {
    "url": "assets/js/app.b097222c.js",
    "revision": "f77cf50e089c04cd3f879f2dd91ee9ef"
  },
  {
    "url": "config/default.html",
    "revision": "e055fd86653122b0d83f0c007db1988c"
  },
  {
    "url": "config/detail.html",
    "revision": "58431ba8d6bd8bc0f397dc9fe8d42e6e"
  },
  {
    "url": "config/index.html",
    "revision": "a10dbff2c1e506448aba9dfd8f249098"
  },
  {
    "url": "config/own.html",
    "revision": "49f9e8dad79a10506b2446996dc48e20"
  },
  {
    "url": "index.html",
    "revision": "1547eb395ce4db93c768e6fb973b0680"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "a2bd7fa75b7ed0b8fe8fab73ab14a902"
  },
  {
    "url": "quick-start/index.html",
    "revision": "9ea3007469eaed3b13b66a287bdd262e"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "c1b2258e17cd9dd663a3aecf5556d1f1"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "c4d97890b5785f8e2f35664f109aca00"
  },
  {
    "url": "quick-start/mock.html",
    "revision": "0a7ee8d974f0a4c43a4bb748b7569bfe"
  },
  {
    "url": "standard.svg",
    "revision": "92650602b63995390fc74b25ea4bd501"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
