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
    "revision": "a6bce9750f05efeadc4dbbec9d988dbd"
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
    "url": "assets/css/styles.701f2692.css",
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
    "url": "assets/js/11.569c83ef.js",
    "revision": "6938377ba37cf4591f54b13b3cc6a52b"
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
    "url": "assets/js/8.260b00b5.js",
    "revision": "2bec2d7d70d62d5c2929846cd4bb4e8f"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.701f2692.js",
    "revision": "596aee80e91b74ca78528a107e0bc1d6"
  },
  {
    "url": "config/default.html",
    "revision": "d74a64b2fee3eb0839818e569f9a15ea"
  },
  {
    "url": "config/detail.html",
    "revision": "ab41f5a5c37d614f4e1dee55af9380cc"
  },
  {
    "url": "config/index.html",
    "revision": "c2da310cf8dd13bd2fe01a7ddbe1a844"
  },
  {
    "url": "config/own.html",
    "revision": "6aa4eb17b8cf8ca49c5c9515201fb820"
  },
  {
    "url": "index.html",
    "revision": "b88ce06688a68151f65df3cc8c023500"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "e404084bbb93eeff3901baf415b9d116"
  },
  {
    "url": "quick-start/index.html",
    "revision": "c0ce2c0b0dc584f92632e59c895202b1"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "354bfbf8c2adf44032a2d7563868d5e4"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "5090df9acbbdb2db7ee986f5c5855fcc"
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
