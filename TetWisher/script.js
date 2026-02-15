import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wishesRef = ref(db, "wishes");

const treeContainer = document.getElementById("tree-container");
const wishModal = document.getElementById("wish-modal");
const displayModal = document.getElementById("display-modal");
const wishInput = document.getElementById("wish-input");
let tempCoords = { x: 0, y: 0 };

// 1. Hiển thị dữ liệu từ Firebase
onValue(wishesRef, (snapshot) => {
  // Xóa tất cả vật phẩm cũ có class .item để vẽ lại bản mới nhất
  const existingItems = treeContainer.querySelectorAll(".item");
  existingItems.forEach((item) => item.remove());

  const data = snapshot.val();
  if (data) {
    Object.values(data).forEach((wish) => {
      renderItem(wish);
    });
  }
});

// 2. Click cây để chọn vị trí
treeContainer.addEventListener("click", (e) => {
  if (e.target.id === "peach-tree") {
    const rect = treeContainer.getBoundingClientRect();
    tempCoords.x = ((e.clientX - rect.left) / rect.width) * 100;
    tempCoords.y = ((e.clientY - rect.top) / rect.height) * 100;
    wishModal.style.display = "block";
  }
});

// 3. Lưu lời chúc và loại vật phẩm
window.saveWish = function () {
  const text = wishInput.value.trim();
  const selectedType = document.querySelector(
    'input[name="itemType"]:checked',
  ).value;

  if (text.length > 0 && text.length <= 150) {
    push(wishesRef, {
      text: text,
      x: tempCoords.x,
      y: tempCoords.y,
      type: selectedType, // Lưu trường type vào đây
      timestamp: Date.now(),
    });
    window.closeModal();
  } else {
    alert("Vui lòng nhập lời chúc!");
  }
};

// 4. Hàm vẽ vật phẩm lên cây
function renderItem(wish) {
  const item = document.createElement("div");
  // Nếu dữ liệu cũ không có type, mặc định là coin
  item.className = `item item-${wish.type || "coin"}`;
  item.style.left = wish.x + "%";
  item.style.top = wish.y + "%";

  item.onclick = (e) => {
    e.stopPropagation();
    showWish(wish.text);
  };

  treeContainer.appendChild(item);
}

function showWish(text) {
  document.getElementById("wish-text").innerText = text;
  displayModal.style.display = "block";
}

window.closeModal = () => {
  wishModal.style.display = "none";
  wishInput.value = "";
};

window.closeDisplay = () => {
  displayModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == wishModal) closeModal();
  if (event.target == displayModal) closeDisplay();
};
