import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAqKQzCb78UGXRV44KFWt3SWqbpgmk-OU0",
  authDomain: "tetwishes.firebaseapp.com",
  databaseURL:
    "https://tetwishes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tetwishes",
  storageBucket: "tetwishes.firebasestorage.app",
  messagingSenderId: "1096975912837",
  appId: "1:1096975912837:web:ed9b8296638ac93e44beec",
  measurementId: "G-3W987CV959",
};

// Khởi tạo
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wishesRef = ref(db, "wishes");

const treeContainer = document.getElementById("tree-container");
const wishModal = document.getElementById("wish-modal");
const displayModal = document.getElementById("display-modal");
const wishInput = document.getElementById("wish-input");
let tempCoords = { x: 0, y: 0 };

// 1. Lắng nghe dữ liệu và hiển thị đồng xu
onValue(wishesRef, (snapshot) => {
  // Xóa tất cả đồng xu cũ trước khi vẽ lại để tránh trùng lặp
  const existingCoins = treeContainer.querySelectorAll(".coin");
  existingCoins.forEach((coin) => coin.remove());

  const data = snapshot.val();
  if (data) {
    Object.values(data).forEach((wish) => {
      renderCoin(wish);
    });
  }
});

// 2. Mở modal khi click vào cây
treeContainer.addEventListener("click", (e) => {
  if (e.target.id === "peach-tree") {
    const rect = treeContainer.getBoundingClientRect();
    // Tính toán vị trí theo tỷ lệ % để hiển thị đúng trên mọi thiết bị
    tempCoords.x = ((e.clientX - rect.left) / rect.width) * 100;
    tempCoords.y = ((e.clientY - rect.top) / rect.height) * 100;

    wishModal.style.display = "block";
  }
});

// 3. Hàm lưu lời chúc (đưa vào window để HTML gọi được)
window.saveWish = function () {
  const text = wishInput.value.trim();
  if (text.length > 0 && text.length <= 150) {
    push(wishesRef, {
      text: text,
      x: tempCoords.x,
      y: tempCoords.y,
      timestamp: Date.now(),
    });
    window.closeModal();
  } else {
    alert("Vui lòng nhập lời chúc (tối đa 150 ký tự)");
  }
};

// 4. Vẽ đồng xu lên màn hình
function renderCoin(wish) {
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.style.left = wish.x + "%";
  coin.style.top = wish.y + "%";

  coin.onclick = (e) => {
    e.stopPropagation(); // Không kích hoạt sự kiện click của cây
    showWish(wish.text);
  };

  treeContainer.appendChild(coin);
}

function showWish(text) {
  document.getElementById("wish-text").innerText = text;
  displayModal.style.display = "block";
}

// Các hàm đóng Modal
window.closeModal = () => {
  wishModal.style.display = "none";
  wishInput.value = "";
};

window.closeDisplay = () => {
  displayModal.style.display = "none";
};

// Đóng modal khi click ra ngoài vùng trắng
window.onclick = (event) => {
  if (event.target == wishModal) closeModal();
  if (event.target == displayModal) closeDisplay();
};
