import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".navbar-nav");
  const loginNavItem = document.getElementById("loginNavItem");
  const joinNavItem = document.getElementById("joinNavItem");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const q = query(collection(db, "users"), where("id", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const nickname = userData.nick;

          // 닉네임 + 환영메시지 
          const welcomeMessage = document.createElement("li");
          welcomeMessage.className = "nav-item";
          welcomeMessage.innerHTML = `<span class="nav-link" style="color: aliceblue;"> ${nickname}님 환영합니다</span>`;

          // 로그아웃버튼
          const logoutButton = document.createElement("li");
          logoutButton.className = "nav-item";
          logoutButton.innerHTML = `<a class="nav-link" href="#" style="color: aliceblue;">로그아웃</a>`;
          logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
              location.reload();
            }).catch((error) => {
              alert("로그아웃에 실패했습니다.");
              console.error(error);
            });
          });

          // 환영 메시지, 로그아웃버튼
          navContainer.appendChild(welcomeMessage);
          navContainer.appendChild(logoutButton);

          // 로그인, 회원가입버튼 숨기기
          loginNavItem.style.display = "none";
          joinNavItem.style.display = "none";
        } else {
          console.error("유저 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("데이터베이스에서 유저 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    } else {
      //로그아웃시 로그인,회원가입버튼 보이게
      loginNavItem.style.display = "block";
      joinNavItem.style.display = "block";
    }
  });
});
