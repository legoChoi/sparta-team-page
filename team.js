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
const photos = [];

members.forEach((e) => {
  photos.push({
    memberId: e.id,
    ...e.data()
  });

  const img = document.getElementById(`memberImg${photos.length}`)
});

console.log(photos);

document.getElementById('memberImg1').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(photos[0]));
});

document.getElementById('memberImg2').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(photos[1]));
});

document.getElementById('memberImg3').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(photos[2]));
});

document.getElementById('memberImg4').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(photos[3]));
});

document.getElementById('memberImg5').addEventListener('click', () => {
  localStorage.setItem("users", JSON.stringify(photos[4]));
});