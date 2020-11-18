importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

const urlsToCache = [
  {
    url: "/index.html",
    version: "1",
  },
  {
    url: "/nav.html",
    version: "1",
  },
  {
    url: "/team.html",
    version: "1",
  },
  {
    url: "/pages/home.html",
    version: "1",
  },
  {
    url: "/pages/klasemen.html",
    version: "1",
  },
  {
    url: "/pages/saved.html",
    version: "1",
  },
  {
    url: "/pages/teams.html",
    version: "1",
  },
  {
    url: "/css/materialize.css",
    version: "1",
  },
  {
    url: "/css/style.css",
    version: "1",
  },
  {
    url: "/js/api.js",
    version: "1",
  },
  {
    url: "/js/db.js",
    version: "1",
  },
  {
    url: "/js/idb.js",
    version: "1",
  },
  {
    url: "/js/main.js",
    version: "1",
  },
  {
    url: "/js/materialize.js",
    version: "1",
  },
  {
    url: "/js/nav.js",
    version: "1",
  },
  {
    url: "/manifest.json",
    version: "1",
  },
  {
    url: "img/icon-192.png",
    version: "1",
  },
  {
    url: "img/icon-512.png",
    version: "1",
  },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    version: "1",
  },
];

// install with workbox
precacheAndRoute(urlsToCache, { ignoreUrlParametersMatching: [/.*/] });

// fetch with workbox
registerRoute(
  new RegExp("(https://|http://)"),
  new StaleWhileRevalidate({
    cacheName: "data-api",
  })
);

// push
self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }

  const options = {
    body: body,
    icon: "img/icon-512.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
