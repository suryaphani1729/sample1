var cacheName = 'samplePwaCache-8';
var filesToCache = [
   '/sample1/src/',
  '/sample1/src/index.html',
  '/sample1/src/main.js',
];


   const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BI0U4ogLSYZYHksiBPEwozy72kTaBmkQlSgC4TNQWF_EHyoM-2SVfG7bHNJHPUj6k2VVwNMviYKhDetIPtKtvaE");
    messaging.requestPermission().then(function() {
           console.log('Notification permission granted.');
      
           // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
          });
    console.log("-----------token-----------");
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      console.log('Error retrieving Instance ID token. ', err);
      setTokenSentToServer(false);
    });
    
    messaging.onMessage(function(payload) {
          console.log('Message received. ', payload);
  
   });
    





// I am new sevice worker 2
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  console.log('requestt',e.request);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: './sample1/src/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Open',
        icon: './sample1/src/logo.png'},
      {action: 'close', title: 'Close',
        icon: './sample1/src/logo.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});



