// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
// // [END messaging_on_background_message_modular]s
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDYjjUVxk2Td3a2ejMOgvnUdzNgPUftWFo",
    authDomain: "react-fcm-e48f7.firebaseapp.com",
    projectId: "react-fcm-e48f7",
    storageBucket: "react-fcm-e48f7.appspot.com",
    messagingSenderId: "75282346886",
    appId: "1:75282346886:web:842904e62842f166f2f207",
    measurementId: "G-0GTNJ8QT6V"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload){
    console.log('Received background message', payload);
    if (payload.notification.body === 'ㅎㅇ') {
        console.log('gd');
    }
});
