importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.6/firebase.js');


firebase.initializeApp({
    apiKey: "AIzaSyCs4TkADK5ts5GdzZqHNDIzeZB1PGlO2ag",
    authDomain: "testpush-573c8.firebaseapp.com",
    databaseURL: "https://testpush-573c8.firebaseio.com",
    projectId: "testpush-573c8",
    storageBucket: "testpush-573c8.appspot.com",
    messagingSenderId: "895966208818"
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
