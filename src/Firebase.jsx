import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDBTr41hfVeAdknPnj-gwlkGQceXl523Qo",
  
    authDomain: "reels-app-react.firebaseapp.com",
  
    projectId: "reels-app-react",
  
    storageBucket: "reels-app-react.appspot.com",
  
    messagingSenderId: "962928064988",
  
    appId: "1:962928064988:web:6e194bb492c4e1dc8bf719"
  
  };
  




// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const Auth = firebase.auth();

// const firestore = firebase.firestore();


// export const database = {
//     users : firestore.collection('users'),
//     posts : firestore.collection('posts'),
//     comments : firestore.collection('comments'),
//     getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
// }

// export const storage = firebase.storage();





const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = firebase.storage();