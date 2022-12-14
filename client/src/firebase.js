// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhKGOtmLyhb2ffpMoaoWUBYT61NPCsHSU",
  authDomain: "mysnkrapp.firebaseapp.com",
  projectId: "mysnkrapp",
  storageBucket: "mysnkrapp.appspot.com",
  messagingSenderId: "200422942373",
  appId: "1:200422942373:web:b1ada977e423d30fa0cf4c",
  measurementId: "G-NZLSVR7NG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage = getStorage(app)