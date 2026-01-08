document.addEventListener("DOMContentLoaded", function () {
  // 1. Khai báo các thành phần giao diện
  const introSection = document.getElementById("intro-section");
  const recruitmentForm = document.getElementById("recruitment-form");
  const questionsSection = document.getElementById("questions-section");
  const confirmationSection = document.getElementById("confirmation-section");

  const banCards = document.querySelectorAll(".ban-card");
  const subBanCards = document.querySelectorAll(".sub-ban-card");
  const nextToInfoBtn = document.getElementById("next-to-info-btn");
  const dhMangInput = document.getElementById("dh-mang-chon-input");

  let selectedBan = null;

  // 2. Chuyển từ phần Giới thiệu sang Form điền thông tin
  if (nextToInfoBtn) {
    nextToInfoBtn.addEventListener("click", function () {
      introSection.classList.add("hidden");
      recruitmentForm.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 3. Logic chọn Ban (Main Departments)
  banCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Xóa trạng thái active của các ban khác
      banCards.forEach((c) =>
        c.classList.remove("selected", "border-teal-500", "bg-teal-50")
      );

      // Kích hoạt ban vừa chọn
      this.classList.add("selected", "border-teal-500", "bg-teal-50");
      selectedBan = this.dataset.ban;

      // Hiển thị khu vực câu hỏi
      questionsSection.classList.remove("hidden");

      // Ẩn tất cả khối câu hỏi của các ban và xóa thuộc tính 'required'
      document
        .querySelectorAll("#questions-section > div[id$='-q']")
        .forEach((div) => {
          div.classList.add("hidden");
          div.querySelectorAll("textarea, select, input").forEach((input) => {
            input.removeAttribute("required");
          });
        });

      // Hiển thị khối câu hỏi của ban đã chọn
      const currentBanDiv = document.getElementById(`ban-${selectedBan}-q`);
      if (currentBanDiv) {
        currentBanDiv.classList.remove("hidden");

        // Chỉ thêm 'required' cho các câu hỏi chung của ban đó (trừ ban Đồ họa xử lý riêng bên dưới)
        if (selectedBan !== "dohoa") {
          currentBanDiv
            .querySelectorAll("textarea, select, input")
            .forEach((input) => {
              input.setAttribute("required", "true");
            });
        } else {
          // Ban đồ họa chỉ yêu cầu bắt buộc câu hỏi chung đầu tiên
          document
            .querySelector("textarea[name='DH-Chung-Q1']")
            .setAttribute("required", "true");
        }
      }

      // Cuộn xuống phần câu hỏi
      window.scrollTo({
        top: questionsSection.offsetTop - 50,
        behavior: "smooth",
      });
    });
  });

  // 4. Logic chọn Tiểu ban cho Đồ họa (Design / Edit / Both)
  subBanCards.forEach((card) => {
    card.addEventListener("click", function () {
      // UI: Xóa active cũ và thêm active mới
      subBanCards.forEach((c) =>
        c.classList.remove("selected", "bg-indigo-600", "text-white")
      );
      this.classList.add("selected", "bg-indigo-600", "text-white");

      const option = this.dataset.option;
      if (dhMangInput) dhMangInput.value = option;

      // Tắt tất cả các khối câu hỏi riêng và xóa required
      const subSections = ["dh-design-only", "dh-edit-only", "dh-both-only"];
      subSections.forEach((id) => {
        const el = document.getElementById(id);
        el.classList.add("hidden");
        el.querySelectorAll("textarea").forEach((tx) =>
          tx.removeAttribute("required")
        );
      });

      // Bật khối tương ứng và thêm required
      let targetId = "";
      if (option === "design") targetId = "dh-design-only";
      else if (option === "edit") targetId = "dh-edit-only";
      else if (option === "both") targetId = "dh-both-only";

      const targetDiv = document.getElementById(targetId);
      if (targetDiv) {
        targetDiv.classList.remove("hidden");
        targetDiv
          .querySelectorAll("textarea")
          .forEach((tx) => tx.setAttribute("required", "true"));

        // Cuộn nhẹ đến phần câu hỏi vừa hiện
        targetDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // 5. Xử lý gửi Form
  recruitmentForm.addEventListener("submit", function (e) {
    // Nếu bạn muốn hiển thị thông báo thành công ngay lập tức (không chuyển trang)
    // Lưu ý: Nếu dùng Basin/Formspree thì bỏ preventDefault để nó tự submit

    /* e.preventDefault(); 
    recruitmentForm.classList.add("hidden");
    confirmationSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    */

    // Thêm log để kiểm tra trước khi gửi
    console.log("Đơn ứng tuyển đang được gửi cho Ban:", selectedBan);
  });
});
