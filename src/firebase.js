
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlUm31RuXqCeTFJqHfcu8VB1onqjWIAOE",
  authDomain: "my-reels-25b50.firebaseapp.com",
  projectId: "my-reels-25b50",
  storageBucket: "my-reels-25b50.appspot.com",
  messagingSenderId: "414338457888",
  appId: "1:414338457888:web:1bca1dc5615ed9de27b745"
};

firebase.initializeApp(firebaseConfig);

// Created object for everything that is required.

export const firestore=firebase.firestore();
export const auth=firebase.auth();
export const storage=firebase.storage();

let provider=new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export  default firebase;
