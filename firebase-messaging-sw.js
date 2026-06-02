importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCK2j13R9IoIP0Tjrmsj-qCwDtFUW_oa4E",
    authDomain: "prime-goat-farm-3e148.firebaseapp.com",
    projectId: "prime-goat-farm-3e148",
    storageBucket: "prime-goat-farm-3e148.firebasestorage.app",
    messagingSenderId: "42499736897",
    appId: "1:42499736897:web:462172284aa9ebd8d4cdc0",
    databaseURL: "https://prime-goat-farm-3e148-default-rtdb.firebaseio.com"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/Assets/Images/prime goat farm logo pic png01.png'
    });
});