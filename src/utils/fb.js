import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR2s1x2l8iorhFKDGsqe50nUFQaD2Tkpw",
  authDomain: "wk-32f79.firebaseapp.com",
  projectId: "wk-32f79",
  storageBucket: "wk-32f79.appspot.com",
  messagingSenderId: "581581806558",
  appId: "1:581581806558:web:dc950ef22ce812f27a1b4f"
};

const app = firebase.initializeApp(firebaseConfig);
const fstore = app.firestore();
const fauth = app.auth();

export { fstore, fauth };
