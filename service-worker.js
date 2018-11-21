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
    "revision": "b2277b3fda8c839a5c18af38b1325875"
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
    "url": "assets/css/styles.1cfae150.css",
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
    "url": "assets/js/10.2b752c17.js",
    "revision": "eb00ce522d20dfb7035aafbf8a3a0beb"
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
    "url": "assets/js/8.5eb78e42.js",
    "revision": "730c370f8ac054a8937b8cb73e6793ee"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.1cfae150.js",
    "revision": "f70b45acc880765959f75524fd210e8e"
  },
  {
    "url": "config/default.html",
    "revision": "b56e7f989f0da9b418c73773f5ceb2ee"
  },
  {
    "url": "config/detail.html",
    "revision": "f3979b7a4c5ae6e56b88bf959c77c07b"
  },
  {
    "url": "config/index.html",
    "revision": "104115cf24aa13818184b5bcb22c9b84"
  },
  {
    "url": "config/own.html",
    "revision": "3450d1cdfa3c9ca0e4553cee63b8fa7b"
  },
  {
    "url": "index.html",
    "revision": "7f74901522f8de4d7e964c99d77ffbf9"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "894e076797abe67da5dfa8df5af8a603"
  },
  {
    "url": "quick-start/index.html",
    "revision": "d004f1a4b4d6e7c807ecb6c552555826"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "02390ec1e1fcbd2b8646234b4ca6fdd7"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "53f6245767e37c1b07abe23c5069e6c8"
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
