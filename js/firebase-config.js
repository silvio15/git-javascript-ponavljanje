//FIREBASE KONFIGURACIJA
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO_3uHkiq3xBIzriTrfBeQiIG2-qDIzy0",
  authDomain: "gradiliste-ec814.firebaseapp.com",
  databaseURL: "https://gradiliste-ec814.firebaseio.com",
  projectId: "gradiliste-ec814",
  storageBucket: "gradiliste-ec814.firebasestorage.app",
  messagingSenderId: "9251856266",
  appId: "1:9251856266:web:06f00c9d1497c8630db273",
  measurementId: "G-G9CZPQ5XHY"
};

//Pokretanje Firebase aplikacije
firebase.initializeApp(firebaseConfig);

//Kreiranje firestore baze
const db = firebase.firestore();
