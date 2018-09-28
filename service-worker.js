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
    "revision": "9e096ba77f36bcb2524b9ba7b52608d7"
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
    "url": "assets/css/styles.8de066c8.css",
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
    "url": "assets/js/5.84d1acec.js",
    "revision": "ff27c86fccc0917c2c48f4d6dbdfa7b1"
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
    "url": "assets/js/app.8de066c8.js",
    "revision": "0268b43929287aa66b5c217bf914f8e3"
  },
  {
    "url": "config/default.html",
    "revision": "9a5552209716cbacd1f82699275684eb"
  },
  {
    "url": "config/detail.html",
    "revision": "76b3cf8f08039919e759c2a939bf4521"
  },
  {
    "url": "config/index.html",
    "revision": "ded2c339aab251b1ea609abe8fa9fb0b"
  },
  {
    "url": "config/own.html",
    "revision": "daf15bcb9f207c2f61cc1a88622a5a4a"
  },
  {
    "url": "index.html",
    "revision": "cd31c3b0c3d4bfdd6860715713b0d657"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "09225ea188fd4bc77dbe729658d8877b"
  },
  {
    "url": "quick-start/index.html",
    "revision": "342e13d4f22a97bee7c3e61ea0f8af33"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "86f4c6693eb2270399c794cae090f90f"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "997edd4a002c640dbcb6200d3896c2b3"
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
