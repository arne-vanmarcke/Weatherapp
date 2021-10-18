import {precacheAndRoute} from 'workbox-precaching';
// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.

const applicationServerPublicKey="BKOeW7lXW6Efbra-_YMygVxCX7eGDAOhuaRGCpHUg9BlfMmJCjuZEnGs24vEgCagNxj16QNXUdnSnbpxXDRZZmE";

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works.',
      icon: './assests/icon_small.png',
      badge: './assests/icon_small.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web/')
    );
});

self.addEventListener('pushsubscriptionchange', function(event) {
    console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    event.waitUntil(
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        .then(function(newSubscription) {
            // TODO: Send to application server
            console.log('[Service Worker] New subscription: ', newSubscription);
        })
    );
});
precacheAndRoute(self.__WB_MANIFEST);