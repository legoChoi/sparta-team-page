import { firebaseConfig } from './config.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, getDoc, query } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

setPersistence(auth, browserSessionPersistence).then().catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
});

// POST: apis/users/login
// 유저 로그인
document.getElementById('btn_login').addEventListener('click', () => {
  event.preventDefault();
  const logInId = document.getElementById('id').value;
  const logInPw = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, logInId, logInPw)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential);
      alert("로그인 성공!");
      location.href = "home.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});