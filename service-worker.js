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
    "revision": "75d0054454ef1efb944b7026da8255dc"
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
    "url": "assets/css/styles.b9f2d023.css",
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
    "url": "assets/js/11.aaff2c36.js",
    "revision": "b175492d258c86eeeddaa7f0bf4e37bb"
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
    "url": "assets/js/5.9b116675.js",
    "revision": "54749ba4762ad625392bec084b839c04"
  },
  {
    "url": "assets/js/6.7700314f.js",
    "revision": "cfdc2718077121ea9ebd82eb080910c0"
  },
  {
    "url": "assets/js/7.6c1db858.js",
    "revision": "f661796c4691f8875f1f048c64ddf545"
  },
  {
    "url": "assets/js/8.8fbee516.js",
    "revision": "d1b3aceec1ea7cf7966d65815f6999ac"
  },
  {
    "url": "assets/js/9.c0f68bd3.js",
    "revision": "2f9ce721f838bf56037aa074e87ca314"
  },
  {
    "url": "assets/js/app.b9f2d023.js",
    "revision": "9a90d1bf51649586812464ea33d27cd0"
  },
  {
    "url": "config/default.html",
    "revision": "7c1e41174d93173aba2a4fb34d6d85b1"
  },
  {
    "url": "config/detail.html",
    "revision": "205bb157296cfa005670a276d213f603"
  },
  {
    "url": "config/index.html",
    "revision": "d238db2ca4c1833b146c015e362cf45f"
  },
  {
    "url": "config/own.html",
    "revision": "0807f3d3f257cd30a60ba6a641cd7051"
  },
  {
    "url": "index.html",
    "revision": "f15bee379b3645972ef9bf0850f79706"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "a3c56d15036770751f184873a346e2ed"
  },
  {
    "url": "quick-start/index.html",
    "revision": "a5afcde5e48c4c8fd49d8fb7c12b8502"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "e208c4b7c7fada6dc5bde9c8f7a8b555"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "4d8cff02ea3eeda8d6ad8cbf4a89e37e"
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
