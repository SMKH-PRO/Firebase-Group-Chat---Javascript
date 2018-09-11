// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyD6QZLNLqIAzdh83jHAFLDUgkKjlh4f1vE",
    authDomain: "chatroom-e7870.firebaseapp.com",
    databaseURL: "https://chatroom-e7870.firebaseio.com",
    projectId: "chatroom-e7870",
    storageBucket: "chatroom-e7870.appspot.com",
    messagingSenderId: "324350719559"
  };
  firebase.initializeApp(config);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Do you AJAX request here.

  // Customize and show your notification
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    click_action: payload.data.click_action
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});













var filesToCache  = [
  '/OneToOne/',
  '/OneToOne/index.html',
  '/OneToOne/favicon.png',
  '/OneToOne/css/style.css',
  '/OneToOne/css/fontawesome.css',
  '/OneToOne/css/animate.css',
  '/OneToOne/css/bootstrap.css',
  '/OneToOne/css/hamburger.css',
  '/OneToOne/css/loading.css',
  '/OneToOne/css/mdbs.css',
  '/OneToOne/css/reset.css',
  '/OneToOne/js/BigPicture.js',
  '/OneToOne/js/authentication.js',
  '/OneToOne/js/blockedusers.js',
  '/OneToOne/js/bootstrap.js',
  '/OneToOne/js/firebaseintialize.js',
  '/OneToOne/js/hamburgers.js',
  '/OneToOne/js/handlebar.js',
  '/OneToOne/js/idle.js',
  '/OneToOne/js/jquery.js',
  '/OneToOne/js/list.js',
  '/OneToOne/js/main.js',
  '/OneToOne/js/menumaker.js',
  '/OneToOne/js/notifications.js',
  '/OneToOne/js/popper.js',
  
  '/OneToOne/js/pushnotif.js',
  '/OneToOne/js/shownotifications.js',
  '/OneToOne/js/time.js',
  '/OneToOne/js/userdetails.js',
  '/OneToOne/js/userinfo.js'
  
  
];


var staticCacheName = 'onetonechat';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});






self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});





self.addEventListener('fetch', function(event) {
  //console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
       // console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      //console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    }).then(function(response) {

  // TODO 5 - Respond with custom 404 page

  return caches.open(staticCacheName).then(function(cache) {
    if (event.request.url.indexOf('test') < 0) {
     // cache.put(event.request.url, response.clone());
      //Not Supported in Chrome..!
    }
    return response;
  })
})
    
  );
});
