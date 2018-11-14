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
    "revision": "27e730cdf88ef76c9ee3d58fc5864087"
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
    "url": "assets/css/styles.fec25b36.css",
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
    "url": "assets/js/10.8efd15b5.js",
    "revision": "e70f42885087076a60af9f54fde49337"
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
    "url": "assets/js/5.768349d1.js",
    "revision": "eb1d303f62f580b88e24f416e509d350"
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
    "url": "assets/js/8.9c8da6a1.js",
    "revision": "502aa952ba068700b9dfbe0dc0cb4fa6"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.fec25b36.js",
    "revision": "89e9de9ca7ea5d85096243a6f1d66b3b"
  },
  {
    "url": "config/default.html",
    "revision": "773241768b7213fee75d3b126b708085"
  },
  {
    "url": "config/detail.html",
    "revision": "eb73f102f0d012e79e0aa71e74d16347"
  },
  {
    "url": "config/index.html",
    "revision": "6eea7204bad48d47fdcd3e6ae2aaad10"
  },
  {
    "url": "config/own.html",
    "revision": "428011d4fe8ef4659a58ef8165f1ea76"
  },
  {
    "url": "index.html",
    "revision": "9eb4c25ab6040227f0c31fff783de5b3"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "684af3491e301e3bca2dd4b082a9646d"
  },
  {
    "url": "quick-start/index.html",
    "revision": "38044f71014d82358b2cd661af3996aa"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "3b37e19446a3509fb3d8c029f1de0db3"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "37a4bfc63fb26deacf59c70fb0b91d33"
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
