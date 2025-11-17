// Service Worker Version - Update this to force service worker refresh
const SW_VERSION = '2.0.0';

// Force service worker to update immediately
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Take control of all pages immediately
});

self.addEventListener("push", event => {
  let data = {};
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    data = { title: "Orange Code", body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "Orange Code";
  const options = {
    body: data.body || "",
    icon: "/toc-app-1.png",
    badge: "/toc-app-1.png",
    data: data.data || {}
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "/admin/mobile";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

