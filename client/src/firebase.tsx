import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQKTA6qYVtOerJ7YWEp8D4N2GpwHXbF9Q",
    authDomain: "admin-dashboard-1d4ad.firebaseapp.com",
    projectId: "admin-dashboard-1d4ad",
    storageBucket: "admin-dashboard-1d4ad.appspot.com",
    messagingSenderId: "314155722648",
    appId: "1:314155722648:web:874838168c3937b920eded"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();