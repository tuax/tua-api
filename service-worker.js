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
    "revision": "c20a264e990060787520b80d2c9306d0"
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
    "url": "assets/js/10.7d11e0b9.js",
    "revision": "60e492a78550d6b50b57b49368414b9c"
  },
  {
    "url": "assets/js/11.f7926ce8.js",
    "revision": "47fdbd20774e09b2d683c1b78d3a4b54"
  },
  {
    "url": "assets/js/12.02df0c8a.js",
    "revision": "5bd2569fb4af07b600a346943c006e69"
  },
  {
    "url": "assets/js/13.e220c507.js",
    "revision": "6b41292df905b1cb325a6928c6e71dbc"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.c241b6e1.js",
    "revision": "f4f168d63b2d6e6f31f257af490f5248"
  },
  {
    "url": "assets/js/4.1e413103.js",
    "revision": "073a9938d7abf65e36f7857ebaadfc1c"
  },
  {
    "url": "assets/js/5.3a033fcc.js",
    "revision": "6ba74d08a32e8f7f8b296420b788e531"
  },
  {
    "url": "assets/js/6.af42ba56.js",
    "revision": "1f27a23f0aec9ec8562a96a8fd3c076c"
  },
  {
    "url": "assets/js/7.cc38730d.js",
    "revision": "f9074c83949143b8e67e4d30fd2ea06a"
  },
  {
    "url": "assets/js/8.f423383b.js",
    "revision": "5f8b9c1482c53d1d36006c983ab9f83b"
  },
  {
    "url": "assets/js/9.efa0c957.js",
    "revision": "27cd062c80c57049e222a200622306c2"
  },
  {
    "url": "assets/js/app.d4fac979.js",
    "revision": "8a6dc143c188acd70ee78fb2af8042bc"
  },
  {
    "url": "config/default.html",
    "revision": "e05c1b4b021c695cf226bb5ca5d5c9cb"
  },
  {
    "url": "config/detail.html",
    "revision": "7fc1fcf1431d95f8f7d2c4aa944ec0bd"
  },
  {
    "url": "config/index.html",
    "revision": "de8bf49ec151df1728a1ac12f0923510"
  },
  {
    "url": "config/own.html",
    "revision": "419a5c0272f50ef9426e3f9b6db97736"
  },
  {
    "url": "index.html",
    "revision": "dd2369bd9716b03bf13f58dca15253d1"
  },
  {
    "url": "logo.png",
    "revision": "7f5f5300ded88b992de697c61021a507"
  },
  {
    "url": "quick-start/export-utils.html",
    "revision": "2bbe29eab5daddb878dbd50cf218e929"
  },
  {
    "url": "quick-start/index.html",
    "revision": "b3627dbb4d4fe2985aa4fdbee072b0bd"
  },
  {
    "url": "quick-start/installation.html",
    "revision": "2cf46b7d0a0cc018220d9e30057c1a17"
  },
  {
    "url": "quick-start/middleware.html",
    "revision": "6a3adc1ee78ca55561fea79816567f0c"
  },
  {
    "url": "quick-start/mock.html",
    "revision": "cf809ddfa159b98a5a99a3249b7b0a78"
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
