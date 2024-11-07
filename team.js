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
const memberArray = [];

// 세션 스토리지에 멤버 데이터 있으면 세션 스토리지에서 꺼내옴
if (sessionStorage.getItem('members')) memberArray.push(...JSON.parse(sessionStorage.getItem('members')));
else { // 세션 스토리지에 멤버 데이터 없을경우 DB에서 꺼내와서 다시 저장
  const members = await getDocs(collection(db, "members"));
  
  members.forEach((e) => {
    memberArray.push({
      memberId: e.id,
      ...e.data()
    });
  });

  sessionStorage.setItem('members', JSON.stringify(memberArray));
}

const images = document.querySelectorAll('div.container img');

images.forEach((img, idx) => {
  img.addEventListener('click', function() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("users", JSON.stringify(memberArray[idx]));
        location.href = './member.html';
      } else { 
        alert('세션 만료');
        location.href = './login.html';
      }
    });
  });
});