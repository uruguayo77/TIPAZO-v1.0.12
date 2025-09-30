// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase configuration для веб-приложения
const firebaseConfig = {
  apiKey: "AIzaSyDzhARcf5psBIWRGarOOTRk2bMqrj2qyig",
  authDomain: "radar-31017.firebaseapp.com",
  projectId: "radar-31017",
  storageBucket: "radar-31017.firebasestorage.app",
  messagingSenderId: "210340122791",
  appId: "1:210340122791:web:d799a0ad5ea61ff2b88b82",
  measurementId: "G-108PC3R7LG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'RADAR Safety Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'New safety alert',
    icon: '/app-icon.png',
    badge: '/app-icon.png',
    tag: 'radar-notification',
    requireInteraction: true,
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received.');

  event.notification.close();

  if (event.action === 'open') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 