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

// 멤버 사진 클릭 후 상세 페이지로 이동
const images = document.querySelectorAll('div.container img');

images.forEach((img, idx) => {
  img.addEventListener('click', function() {
    // 멤버 정보 세션 스토리지에 저장 후 이동
    sessionStorage.setItem("users", JSON.stringify(memberArray[idx]));
    sessionStorage.setItem("memberId", memberArray[idx].memberId);
    location.href = './member.html';
  });
});