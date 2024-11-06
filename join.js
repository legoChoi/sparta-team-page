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

// POST: apis/users/join
// 유저 회원가입
document.getElementById('btn_join').addEventListener('click', () => {
  const email = document.getElementById('joinId').value;
  const password = document.getElementById('joinPassword').value;
  const nick = document.getElementById('joinNick').value;

  if (email.length <= 0 | password.length <= 0 | nick.length <= 0) {
    alert('모두 입력해주세요.'); 
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log(userCredential);
      
      // Signed up 
      const user = userCredential.user;

      const newUser = await addDoc(collection(db, 'users'), {
        id: email,
        nick,
      })

      alert('회원가입 성공');
      location.href = "./login.html";
    })
    .catch((error) => {
      if (email.length <= 0 | password <= 0 | nick <= 0) alert('');

      if (!email) alert('');

      const errorMessage = error.message;
      alert(errorMessage);

    });
});