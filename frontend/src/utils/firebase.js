

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJymZo40hc3Js0ALCsJc5jh6BgBYnOvks",
    authDomain: "clientchat-6bc76.firebaseapp.com",
    projectId: "clientchat-6bc76",
    storageBucket: "clientchat-6bc76.appspot.com",
    messagingSenderId: "808194224578",
    appId: "1:808194224578:web:903b95caf9fdc5b151265b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

