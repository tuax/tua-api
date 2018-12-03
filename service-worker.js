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
    "revision": "eb626c335cadfc830f3f4d3f22b333ba"
  },
  {
    "url": "assets/css/0.styles.74beca84.css",
    "revision": "afc1943a0244d28c65c18962cbc32c96"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0fbb9a7d.js",
    "revision": "2e5860d5bb1838613f3ccf11a358b072"
  },
  {
    "url": "assets/js/11.ea670a31.js",
    "revision": "7eac44d1a857584f19f20806de849879"
  },
  {
    "url": "assets/js/12.5dfdc5ae.js",
    "revision": "5987f96337a71f3faf2e6aa1eb7e83a5"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.4e72f00a.js",
    "revision": "acdd7e47cc17c5e60cc3c4b76159b36b"
  },
  {
    "url": "assets/js/4.2ac8c7f1.js",
    "revision": "a402d85c1de5dcd62c70dec7e538c8c6"
  },
  {
    "url": "assets/js/5.4190696a.js",
    "revision": "08c53cc9db4a07cc02f519038a65e7de"
  },
  {
    "url": "assets/js/6.1fc59759.js",
    "revision": "60c9dd0a5e6e10eda334082d9417f7bf"
  },
  {
    "url": "assets/js/7.4186d5b7.js",
    "revision": "04c2813aeccd43d51fb20db23bdf2c0f"
  },
  {
    "url": "assets/js/8.b217e1fa.js",
    "revision": "c884c1e7b641bed7111af74c75a9dfb5"
  },
  {
    "url": "assets/js/9.b93984c6.js",
    "revision": "fec6bca7db1ed6bd56412cc8b53bc414"
  },
  {
    "url": "assets/js/app.9540b825.js",
    "revision": "51469e1b64659c8f6100c3aa8749ea53"
  },
  {
    "url": "config/default.html",
    "revision": "4e3c2b34d2012933750d2040096ce3ee"
  },
  {
    "url": "config/detail.html",
    "revision": "298147ab226d80127d24fac5d4dcd1c0"
  },
  {
    "url": "config/index.html",
    "revision": "b33b4470e4a6a6b975571cca75f8dd94"
  },
  {
    "url": "config/own.html",
    "revision": "777d2248f4e148a109fc188c378938e2"
  },
  {
    "url": "index.html",
    "revision": "1b8550d53adba23990a5900b4a8c1a90"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "be75d84f6241936aac18892e6641d8ac"
  },
  {
    "url": "quick-start/index.html",
    "revision": "b3776529c6dc098095bb077b7c58e8f2"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "3cbcf086e518665f958e572a45076543"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "8fc00c8e50b53282cb92acd300494878"
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
