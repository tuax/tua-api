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
    "revision": "d6a2bb7ec06e7af777a05b1d1d38eebe"
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
    "url": "assets/css/styles.8ae97d7e.css",
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
    "url": "assets/js/8.9c8da6a1.js",
    "revision": "502aa952ba068700b9dfbe0dc0cb4fa6"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.8ae97d7e.js",
    "revision": "3cb3f20dbe7630bc367096d15d568084"
  },
  {
    "url": "config/default.html",
    "revision": "d2312671dd5c32b5bd92521c4a22879a"
  },
  {
    "url": "config/detail.html",
    "revision": "aa9d66acc6f2ccfa3ce80ef44aab1792"
  },
  {
    "url": "config/index.html",
    "revision": "a514d52b57e07da166ba8abd175d85af"
  },
  {
    "url": "config/own.html",
    "revision": "75b723e70ed287baeae448e8ca4d1986"
  },
  {
    "url": "index.html",
    "revision": "6715694e17fa9d31ae221675145367e0"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "5031cf4159aba52c2a5baf525e0ea9e1"
  },
  {
    "url": "quick-start/index.html",
    "revision": "8d955111ac3b2d0f7564d5c1cb91e196"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "8aa8561263bffe648d80c469fcaecb95"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "a2b11cf1e0da3f6e1d9df3ac63fbddf4"
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
