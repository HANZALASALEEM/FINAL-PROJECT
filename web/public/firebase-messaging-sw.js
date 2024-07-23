importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyAEgweJHDKF_B_SHeZe4v7BgrEYm2CBrv4",
	authDomain: "suffah-model-school-fed72.firebaseapp.com",
	projectId: "suffah-model-school-fed72",
	storageBucket: "suffah-model-school-fed72.appspot.com",
	messagingSenderId: "46075682266",
	appId: "1:46075682266:web:4a5d31c11f9b089b38b4e3",
	measurementId: "G-JN75VETP1E",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: payload.notification.image,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
