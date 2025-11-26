document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("order-form");
  const productItems = document.querySelectorAll(".product-item");

  // Các thẻ hiển thị tổng tiền MỚI (Đã cập nhật theo index.html mới)
  const rawTotalDisplay = document.getElementById("raw-total-display");
  const discountRow = document.getElementById("discount-row");
  const discountPercentSpan = document.getElementById("discount-percent");
  const discountAmountDisplay = document.getElementById(
    "discount-amount-display"
  );
  const calculatedTotalSpan = document.getElementById("calculated-total");
  const totalAmountInput = document.getElementById("total-amount-input");

  // --- Logic Số lượng Sản phẩm và Tính Tổng Tiền (CÓ ƯU ĐÃI) ---
  function calculateTotal() {
    let rawTotal = 0;
    let itemCount = 0; // Tổng số cốc

    productItems.forEach((item) => {
      const checkbox = item.querySelector(".product-checkbox");
      const quantityInput = item.querySelector(".quantity-input");

      const price = parseInt(item.dataset.price);

      // Cập nhật trạng thái input số lượng và tính tổng
      if (checkbox.checked) {
        quantityInput.disabled = false;

        let quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
          quantity = 1;
          quantityInput.value = 1;
        }

        rawTotal += price * quantity;
        itemCount += quantity;
      } else {
        quantityInput.disabled = true;
      }
    });

    // 1. Xác định mức ưu đãi
    let discountRate = 0;

    if (itemCount >= 3) {
      discountRate = 0.1; // 10% cho 3 cốc trở lên
    } else if (itemCount === 2) {
      discountRate = 0.05; // 5% cho 2 cốc
    }

    // 2. Tính toán tiền ưu đãi và thành tiền cuối
    const discountAmount = Math.round(rawTotal * discountRate); // Làm tròn để tránh số lẻ
    const finalTotal = rawTotal - discountAmount;

    // 3. Định dạng và Cập nhật giao diện
    const formattedRawTotal = rawTotal.toLocaleString("vi-VN") + " VNĐ";
    const formattedDiscountAmount =
      discountAmount.toLocaleString("vi-VN") + " VNĐ";
    const formattedFinalTotal = finalTotal.toLocaleString("vi-VN") + " VNĐ";

    // Cập nhật Tổng tiền (Chưa giảm)
    rawTotalDisplay.textContent = formattedRawTotal;

    if (discountRate > 0) {
      // Hiển thị dòng ưu đãi
      discountRow.style.display = "flex";
      discountPercentSpan.textContent = `(${itemCount} cốc, ${
        discountRate * 100
      }%)`;
      discountAmountDisplay.textContent = `- ${formattedDiscountAmount}`;
    } else {
      // Ẩn dòng ưu đãi
      discountRow.style.display = "none";
    }

    // Cập nhật Thành tiền cuối
    calculatedTotalSpan.textContent = formattedFinalTotal;

    // Cập nhật input hidden để gửi form (chỉ gửi Thành tiền cuối)
    totalAmountInput.value = formattedFinalTotal;
  }

  // Gắn sự kiện cho checkbox và input số lượng
  productItems.forEach((item) => {
    const checkbox = item.querySelector(".product-checkbox");
    const quantityInput = item.querySelector(".quantity-input");

    checkbox.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);
    quantityInput.addEventListener("change", calculateTotal);

    quantityInput.addEventListener("blur", function () {
      // Đảm bảo giá trị là số và >= 1
      if (isNaN(parseInt(this.value)) || parseInt(this.value) <= 0) {
        this.value = 1;
      }
      calculateTotal();
    });
  });

  // --- Logic Kiểm tra trước khi Gửi Form (GIỮ NGUYÊN) ---
  orderForm.addEventListener("submit", function (event) {
    let isProductSelected = false;

    productItems.forEach((item) => {
      const checkbox = item.querySelector(".product-checkbox");
      const quantityInput = item.querySelector(".quantity-input");

      const quantity = parseInt(quantityInput.value);

      if (checkbox.checked && quantity > 0) {
        isProductSelected = true;
      }
    });

    if (!isProductSelected) {
      event.preventDefault();
      alert(
        "Vui lòng chọn ít nhất một món Matcha và nhập số lượng hợp lệ (tối thiểu 1)."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
  });

  // Tính tổng lần đầu khi tải trang
  calculateTotal();
});
