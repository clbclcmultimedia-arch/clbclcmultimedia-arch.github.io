import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. Cấu hình Firebase (Giữ nguyên từ code gốc của bạn)
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

// Định nghĩa 2 đường dẫn dữ liệu khác nhau
const wishesRefV1 = ref(db, "wishes"); // Cây cũ (Lưu trữ)
const wishesRefV2 = ref(db, "wishes_v2"); // Cây mới (Hoạt động)

// DOM Elements
const treeV1 = document.getElementById("tree-container-v1");
const treeV2 = document.getElementById("tree-container-v2");
const wishModal = document.getElementById("wish-modal");
const displayModal = document.getElementById("display-modal");
const wishInput = document.getElementById("wish-input");

let tempCoords = { x: 0, y: 0 };

// --- 2. HIỂN THỊ DỮ LIỆU ---

// Lấy dữ liệu cho Cây 1 (Chỉ xem)
onValue(wishesRefV1, (snapshot) => {
  renderAllItems(snapshot, treeV1);
});

// Lấy dữ liệu cho Cây 2 (Mới)
onValue(wishesRefV2, (snapshot) => {
  renderAllItems(snapshot, treeV2);
});

// Hàm bổ trợ để vẽ lại toàn bộ vật phẩm trong một container cụ thể
function renderAllItems(snapshot, container) {
  if (!container) return;
  // Xóa các item cũ trong container này trước khi vẽ mới
  const existingItems = container.querySelectorAll(".item");
  existingItems.forEach((item) => item.remove());

  const data = snapshot.val();
  if (data) {
    Object.values(data).forEach((wish) => {
      renderSingleItem(wish, container);
    });
  }
}

// --- 3. TƯƠNG TÁC NGƯỜI DÙNG ---

// Click vào Cây 2 để hiện Modal nhập lời chúc
if (treeV2) {
  treeV2.addEventListener("click", (e) => {
    // Chỉ kích hoạt nếu click trực tiếp vào ảnh cây đào mới
    if (e.target.id === "peach-tree-v2") {
      const rect = treeV2.getBoundingClientRect();
      tempCoords.x = ((e.clientX - rect.left) / rect.width) * 100;
      tempCoords.y = ((e.clientY - rect.top) / rect.height) * 100;
      wishModal.style.display = "block";
    }
  });
}

// Lưu lời chúc (Chỉ đẩy lên wishesRefV2)
window.saveWish = function () {
  const text = wishInput.value.trim();
  const selectedType = document.querySelector(
    'input[name="itemType"]:checked',
  ).value;

  if (text.length > 0 && text.length <= 150) {
    push(wishesRefV2, {
      text: text,
      x: tempCoords.x,
      y: tempCoords.y,
      type: selectedType,
      timestamp: Date.now(),
    });
    window.closeModal();
  } else {
    alert("Vui lòng nhập lời chúc!");
  }
};

// --- 4. HÀM VẼ VÀ HIỂN THỊ ---

function renderSingleItem(wish, container) {
  const item = document.createElement("div");
  item.className = `item item-${wish.type || "coin"}`;
  item.style.left = wish.x + "%";
  item.style.top = wish.y + "%";

  // Khi click vào vật phẩm (dù ở cây nào) vẫn hiện lời chúc
  item.onclick = (e) => {
    e.stopPropagation();
    showWish(wish.text);
  };

  container.appendChild(item);
}

function showWish(text) {
  document.getElementById("wish-text").innerText = text;
  displayModal.style.display = "block";
}

// --- 5. QUẢN LÝ MODAL ---

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
