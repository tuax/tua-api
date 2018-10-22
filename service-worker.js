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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0fc6ae662ca0a46c350598ea62572dce"
  },
  {
    "url": "assets/css/1.styles.babd7481.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.8662775e.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/styles.a6a2dc71.css",
    "revision": "5f4e33fe0881a45048694069c94020ff"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.babd7481.js",
    "revision": "87b26c931f15723340e79b7706f16a71"
  },
  {
    "url": "assets/js/10.25ced0dc.js",
    "revision": "4e40d12b27dce3bda2ff51fcb1b9628a"
  },
  {
    "url": "assets/js/11.c8f20643.js",
    "revision": "187247a8d6a99a0ea234f5b00b87f602"
  },
  {
    "url": "assets/js/2.8662775e.js",
    "revision": "3e8dfa2d9402ea6f0abeb0c1157d1d39"
  },
  {
    "url": "assets/js/3.53589cd1.js",
    "revision": "407f22334443f72778868302b4f232f4"
  },
  {
    "url": "assets/js/4.7d11ee18.js",
    "revision": "7dcf99586e758d73bde5fbad63a6a2fc"
  },
  {
    "url": "assets/js/5.a4f50863.js",
    "revision": "5752eab4330b812ab04e9acbd0230e62"
  },
  {
    "url": "assets/js/6.04cff614.js",
    "revision": "ac6304fcd357aa062150de7b17b7363f"
  },
  {
    "url": "assets/js/7.787f7d7d.js",
    "revision": "c09c045769ef221523d15eb1f353ec23"
  },
  {
    "url": "assets/js/8.961efca4.js",
    "revision": "654a49f980d21faf4394e71f22c6c0a2"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.a6a2dc71.js",
    "revision": "b7162713a0226ce65eb9d4dbf8261621"
  },
  {
    "url": "config/default.html",
    "revision": "7d8b7b8c62230ba5818cf55623795bf0"
  },
  {
    "url": "config/detail.html",
    "revision": "48d364b610ee415a5b28d7d7b5ed3543"
  },
  {
    "url": "config/index.html",
    "revision": "c1d68090d0766b89807d814750c2e8f2"
  },
  {
    "url": "config/own.html",
    "revision": "3a81d2f6dca66dd2cf6e0c6f76288ed6"
  },
  {
    "url": "index.html",
    "revision": "de15ac547d8c5c5db563049333bd7c85"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "16031fc9dcb119df5ca3e370fe092889"
  },
  {
    "url": "quick-start/index.html",
    "revision": "0da5324de192c848dfa3b2704487097f"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "2e5dc1cba91ea55e6cdc2ed31a1f6293"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "aa604b71b2a2610def1a1207529ca5a5"
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
