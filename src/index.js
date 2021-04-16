import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVQWtNjw2kiww5X3n8ydafEEHob1nNXNE",
  authDomain: "evernote-clone-kim.firebaseapp.com",
  projectId: "evernote-clone-kim",
  storageBucket: "evernote-clone-kim.appspot.com",
  messagingSenderId: "704246948895",
  appId: "1:704246948895:web:2db6ffc7dfab26ca59e12a",
  measurementId: "G-DQQ38HWL39"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
