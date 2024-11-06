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
let memberPhotos = await getDocs(collection(db, "members"));
let photos = [];

memberPhotos.forEach((e) => {
  console.log(e.data());
  
  photos.push({
    memberId: e.id,
    photo: e.data().photo
  });
});

let target = photos[0];

// GET: apis/members/:memberId
// member 문서 ID로 검색
let member = await getDoc(doc(db, "members", target.memberId));
console.log(member.data());

// GET: /members/:memberId/comments
let comments = await getDocs(collection(db, 'members', target.memberId, 'comments'))

comments.forEach((e) => {
  console.log(e.data());
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        location.href = 'test.html';
        // User is signed out
        // ...
    }
});