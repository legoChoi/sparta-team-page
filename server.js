import { firebaseConfig } from './config.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, getDoc, query } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const auth = getAuth();

// setPersistence(auth, browserSessionPersistence)
// .then(() => {})
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   alert(errorMessage);
// });

// POST: /users/login
// 유저 로그인
document.getElementById('btn_login').addEventListener('click', () => {
  event.preventDefault();
  const logInId = document.getElementById('id').value;
  const logInPw = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, logInId, logInPw)
              .then((userCredential) => {
                // Signed in 
                console.log(userCredential);
                location.href = "./home.html";
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
              });
});

// POST: /users/join
// 유저 회원가입
document.getElementById('btn_join').addEventListener('click', () => {
  const email = document.getElementById('joinId').value;
  const password = document.getElementById('joinPassword').value;
  const nick = document.getElementById('joinNick').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});