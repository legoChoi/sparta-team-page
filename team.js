import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// Member
// GET: /members/photos
const members = await getDocs(collection(db, "members"));
const memberArray = [];

// 세션 스토리지에 멤버 데이터 있으면 세션 스토리지에서 꺼내옴
if (sessionStorage.getItem('members')) memberArray.push(...JSON.parse(sessionStorage.getItem('members')));
else { // 세션 스토리지에 멤버 데이터 없을경우 DB에서 꺼내와서 다시 저장
  members.forEach((e) => {
    memberArray.push({
      memberId: e.id,
      ...e.data()
    });
  });

  sessionStorage.setItem('members', JSON.stringify(memberArray));
}

document.getElementById('memberImg1').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(memberArray[0]));
});

document.getElementById('memberImg2').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(memberArray[1]));
});

document.getElementById('memberImg3').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(memberArray[2]));
});

document.getElementById('memberImg4').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(memberArray[3]));
});

document.getElementById('memberImg5').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(memberArray[4]));
});