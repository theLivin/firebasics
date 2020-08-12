// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuWny-dCzoHdk6TQYSUz69Loa22NnaKDk",
  authDomain: "firebasics-2b0c9.firebaseapp.com",
  databaseURL: "https://firebasics-2b0c9.firebaseio.com",
  projectId: "firebasics-2b0c9",
  storageBucket: "firebasics-2b0c9.appspot.com",
  messagingSenderId: "413102007389",
  appId: "1:413102007389:web:6ca62da281b5357b9699b4",
  measurementId: "G-MT46YK0RZW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
