// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANmRhLv6-qxw6i4CJGeka0EpKMR1JUq78",
  authDomain: "nasgor-10c75.firebaseapp.com",
  databaseURL: "https://nasgor-10c75-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nasgor-10c75",
  storageBucket: "nasgor-10c75.appspot.com",
  messagingSenderId: "499383644513",
  appId: "1:499383644513:web:612339a8e9f2efc47f5520",
  measurementId: "G-CV4BDMC2YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);