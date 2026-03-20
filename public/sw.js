/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple Service Worker for Background Notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🌾 Mandi & Weather Update';
  const options = {
    body: data.body || 'Check the latest prices and weather.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'daily-update',
    renotify: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
