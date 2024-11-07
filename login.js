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
      const user = userCredential.user;
      
      console.log(user);
      const userDocRef = doc(db, "users", user.uid);
      return getDoc(userDocRef); 

    }) .then((userSnapshot) => {
      if (userSnapshot.exists()) { // 문서 존재 여부 확인
        const userData = userSnapshot.data();
        console.log("Firestore에서 가져온 데이터:", userData);

        sessionStorage.setItem("nick", userData.nick);  // 닉네임 저장
        sessionStorage.setItem("password", logInPw);    //비밀번호 저장
        alert("로그인 성공!");
        location.href = "home.html"; // 홈 페이지로 이동
      } else {
        alert("유저 데이터를 찾을 수 없습니다."); 
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});