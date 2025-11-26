let prizes = [
  { name: "🟨 Blind box", count: 3, color: "#f7d794" },
  { name: "🟥 Đèn ngủ", count: 2, color: "#ff7675" },
  { name: "🟦 Combo Bút + Tẩy", count: 5, color: "#74b9ff" },
  { name: "🟩 Móc khóa Độc Quyền", count: 4, color: "#55efc4" },
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const historyListEl = document.getElementById("history-list");
const prizeListEl = document.getElementById("prize-list");

let currentResult = null; // LƯU lại kết quả trúng
let shouldReset = false; // CHỈ reset sau khi quay xong thực sự

function createSegmentPath(cx, cy, r, startAngle, endAngle) {
  const rad = (deg) => (deg * Math.PI) / 180;

  const x1 = cx + r * Math.cos(rad(startAngle));
  const y1 = cy + r * Math.sin(rad(startAngle));
  const x2 = cx + r * Math.cos(rad(endAngle));
  const y2 = cy + r * Math.sin(rad(endAngle));

  return `
    M ${cx} ${cy}
    L ${x1} ${y1}
    A ${r} ${r} 0 0 1 ${x2} ${y2}
    Z
  `;
}

function renderWheel() {
  const available = prizes.filter((p) => p.count > 0);
  const n = available.length;

  const step = 360 / n;
  let svg = `<svg viewBox="0 0 1000 1000">`;

  available.forEach((p, i) => {
    const start = i * step;
    const end = start + step;
    const mid = (start + end) / 2;

    // Hình quạt
    svg += `
      <path d="${createSegmentPath(500, 500, 500, start, end)}"
            fill="${p.color}"></path>
    `;

    // Text
    svg += `
      <text
        x="${500 + 350 * Math.cos(((mid - 90) * Math.PI) / 180)}"
        y="${500 + 350 * Math.sin(((mid - 90) * Math.PI) / 180)}"
        class="segment-text"
      >
        ${p.name}
      </text>
    `;
  });

  svg += "</svg>";
  wheel.innerHTML = svg;
}

function updatePrizeList() {
  prizeListEl.innerHTML = "";
  prizes.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.name}: ${p.count}`;
    if (p.count === 0) li.style.opacity = 0.5;
    prizeListEl.appendChild(li);
  });
}

function spinWheel() {
  const available = prizes.filter((p) => p.count > 0);
  const n = available.length;
  const step = 360 / n;

  const index = Math.floor(Math.random() * n);
  const prize = available[index];

  currentResult = prize; // Lưu lại để xử lý sau
  shouldReset = true;

  const targetAngle = (index * step + step / 2 - 90 + 360) % 360;

  const fullRotation = 360 * 8 + (360 - targetAngle);

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${fullRotation}deg)`;

  spinBtn.disabled = true;
}

// SỰ KIỆN NÀY CHỈ CHẠY KHI ANIMATION KẾT THÚC THẬT SỰ
wheel.addEventListener("transitionend", () => {
  if (!shouldReset) return;
  shouldReset = false;

  // Xử lý quà
  if (currentResult) {
    currentResult.count--;
    alert(`🎉 Bạn trúng: ${currentResult.name}!`);

    let li = document.createElement("li");
    li.textContent = `${new Date().toLocaleTimeString()} - Trúng: ${
      currentResult.name
    }`;
    historyListEl.prepend(li);
  }

  updatePrizeList();
  renderWheel();

  // RESET góc mà KHÔNG tạo animation
  wheel.style.transition = "none";
  const available = prizes.filter((p) => p.count > 0);
  const step = 360 / available.length;
  const index = available.findIndex((p) => p.name === currentResult.name);
  const target = (index * step + step / 2 - 90 + 360) % 360;

  wheel.style.transform = `rotate(${(360 - target) % 360}deg)`;

  spinBtn.disabled = false;
});

document.addEventListener("DOMContentLoaded", () => {
  renderWheel();
  updatePrizeList();
  spinBtn.addEventListener("click", spinWheel);
});
