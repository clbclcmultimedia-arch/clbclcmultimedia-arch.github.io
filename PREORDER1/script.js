// Thay thế toàn bộ nội dung của script.js bằng đoạn code sau
document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("order-form");
  const productItems = document.querySelectorAll(".product-item");
  const shippingRadios = document.querySelectorAll(".shipping-radio");
  const addressContainer = document.getElementById("address-field-container");
  const addressInput = document.getElementById("home-address");
  const paymentRadios = document.querySelectorAll(".payment-radio");
  const qrCodeContainer = document.getElementById("qr-code-container");
  const totalAmountSpan = document.getElementById("calculated-total");
  const totalAmountInput = document.getElementById("total-amount-input");

  // --- Logic Số lượng Sản phẩm và Tính Tổng Tiền ---
  function calculateTotal() {
    let total = 0;
    productItems.forEach((item) => {
      const checkbox = item.querySelector(".product-checkbox");
      const quantityInput = item.querySelector(".quantity-input");
      // Lấy giá từ data-attribute, đã được thiết lập trong HTML
      const price = parseInt(item.dataset.price);

      if (checkbox.checked && parseInt(quantityInput.value) > 0) {
        total += price * parseInt(quantityInput.value);
      }
    });

    // Định dạng tổng tiền và cập nhật cả thẻ <span> và input hidden
    const formattedTotal = total.toLocaleString("vi-VN") + " VNĐ";
    totalAmountSpan.textContent = formattedTotal;
    totalAmountInput.value = formattedTotal;
  }

  productItems.forEach((item) => {
    const checkbox = item.querySelector(".product-checkbox");
    const quantityInput = item.querySelector(".quantity-input");

    // 1. Sự kiện thay đổi Checkbox
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        quantityInput.removeAttribute("disabled");
        quantityInput.setAttribute("required", "required");
        quantityInput.value = 1; // Thiết lập số lượng mặc định là 1
      } else {
        quantityInput.setAttribute("disabled", "disabled");
        quantityInput.removeAttribute("required");
        quantityInput.value = ""; // Xóa số lượng khi bỏ chọn
      }
      calculateTotal();
    });

    // 2. Sự kiện nhập/thay đổi Số lượng
    quantityInput.addEventListener("input", function () {
      // Đảm bảo số lượng tối thiểu là 1
      if (parseInt(this.value) <= 0 || isNaN(parseInt(this.value))) {
        this.value = 1;
      }
      // Tự động check box nếu người dùng nhập số lượng
      if (this.value) {
        checkbox.checked = true;
        quantityInput.removeAttribute("disabled"); // Chỉ để đảm bảo
      }
      calculateTotal();
    });

    // 3. Sự kiện blur (thoát khỏi input) để xử lý giá trị không hợp lệ
    quantityInput.addEventListener("blur", function () {
      if (
        this.value === "" ||
        parseInt(this.value) <= 0 ||
        isNaN(parseInt(this.value))
      ) {
        this.value = 1;
      }
      calculateTotal();
    });
  });

  // --- Logic Phương thức Vận chuyển ---
  shippingRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "Tại nhà riêng") {
        addressContainer.classList.remove("hidden");
        addressInput.setAttribute("required", "required");
      } else {
        addressContainer.classList.add("hidden");
        addressInput.removeAttribute("required");
        addressInput.value = ""; // Xóa địa chỉ khi vận chuyển tại lớp
      }
    });
  });

  // --- Logic Phương thức Thanh toán (Hiển thị QR Code) ---
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "Chuyển khoản") {
        qrCodeContainer.classList.remove("hidden");
      } else {
        qrCodeContainer.classList.add("hidden");
      }
    });
  });

  // --- Logic Kiểm tra trước khi Gửi Form (chỉ kiểm tra việc chọn sản phẩm) ---
  orderForm.addEventListener("submit", function (event) {
    let isProductSelected = false;
    productItems.forEach((item) => {
      const checkbox = item.querySelector(".product-checkbox");
      const quantityInput = item.querySelector(".quantity-input");

      // Kiểm tra xem sản phẩm có được chọn VÀ số lượng có lớn hơn 0 không
      if (checkbox.checked && parseInt(quantityInput.value) > 0) {
        isProductSelected = true;
      }
    });

    if (!isProductSelected) {
      event.preventDefault(); // Ngăn gửi form
      alert(
        "Vui lòng chọn ít nhất một sản phẩm và nhập số lượng hợp lệ (tối thiểu 1)."
      );
      // Quay lại đầu trang
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    // Nếu tất cả pass, form sẽ được submit tự nhiên đến Usebasin,
    // và Usebasin sẽ chuyển hướng đến trang xác nhận (dựa trên _next field).
    return true;
  });

  // Khởi tạo tính tổng tiền khi tải trang
  calculateTotal();
});
