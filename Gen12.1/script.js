// document.addEventListener("DOMContentLoaded", function () {
//   // Lấy các phần tử HTML cần thao tác
//   const introSection = document.getElementById("intro-section");
//   const recruitmentForm = document.getElementById("recruitment-form");
//   const questionsSection = document.getElementById("questions-section");
//   const feedbackSection = document.getElementById("feedback-section");
//   const confirmationSection = document.getElementById("confirmation-section");
//   const banCards = document.querySelectorAll(".ban-card");
//   const subBanCards = document.querySelectorAll(".sub-ban-card");
//   const nextToInfoBtn = document.getElementById("next-to-info-btn");
//   const fixedActionBtn = document.getElementById("fixed-action-btn");
//   let selectedBan = null;
//   // Lắng nghe sự kiện click vào nút "Tiếp tục" ở cuối phần giới thiệu
//   nextToInfoBtn.addEventListener("click", function () {
//     // Ẩn phần giới thiệu
//     introSection.classList.add("hidden");
//     // Hiển thị form chính
//     recruitmentForm.classList.remove("hidden");
//     // Hiển thị nút hành động cố định và đặt văn bản là "Tiếp tục"
//     fixedActionBtn.classList.remove("hidden");
//     fixedActionBtn.textContent = "Sang phần câu hỏi";
//     // Cuộn lên đầu trang của form mới
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
//   // Lắng nghe sự kiện click vào các thẻ ban
//   banCards.forEach((card) => {
//     card.addEventListener("click", function () {
//       // Xóa trạng thái 'selected' khỏi tất cả các thẻ ban khác
//       banCards.forEach((c) => c.classList.remove("selected"));
//       // Thêm trạng thái 'selected' cho thẻ ban hiện tại
//       this.classList.add("selected");
//       selectedBan = this.dataset.ban;
//       // Ẩn tất cả các bộ câu hỏi của các ban
//       document
//         .querySelectorAll("#questions-section > div")
//         .forEach((qSection) => {
//           qSection.classList.add("hidden");
//           // Loại bỏ thuộc tính 'required' để form không yêu cầu điền vào các trường ẩn
//           qSection
//             .querySelectorAll('textarea, input:not([type="file"])')
//             .forEach((input) => {
//               input.removeAttribute("required");
//             });
//         });
//       // Hiển thị bộ câu hỏi tương ứng với ban được chọn
//       const currentBanQuestions = document.getElementById(
//         `ban-${selectedBan}-q`
//       );
//       if (currentBanQuestions) {
//         questionsSection.classList.remove("hidden"); // Hiển thị cả phần chứa câu hỏi
//         currentBanQuestions.classList.remove("hidden");
//         // Thêm lại thuộc tính 'required' cho các trường trong ban hiện tại, trừ input file
//         currentBanQuestions
//           .querySelectorAll('textarea, input:not([type="file"])')
//           .forEach((input) => {
//             // Chỉ thêm required cho các ban ngoại trừ Đồ hoạ và Photo
//             if (selectedBan !== "dohoa" && selectedBan !== "photo") {
//               input.setAttribute("required", "required");
//             }
//           });
//       }
//       // Xử lý logic đặc biệt cho ban Đồ họa
//       if (selectedBan === "dohoa") {
//         document.getElementById("dohoa-options").classList.remove("hidden");
//       } else {
//         document.getElementById("dohoa-options").classList.add("hidden");
//         document.getElementById("design-questions").classList.add("hidden");
//         document.getElementById("edit-questions").classList.add("hidden");
//         document.getElementById("both-questions").classList.add("hidden");
//         // Hủy chọn tiểu ban khi chuyển sang ban khác
//         subBanCards.forEach((c) => c.classList.remove("selected"));
//       }
//       // Cuộn trang lên đầu phần câu hỏi để người dùng dễ dàng điền
//       window.scrollTo({
//         top: questionsSection.offsetTop,
//         behavior: "smooth",
//       });
//     });
//   });
//   // Lắng nghe sự kiện click vào các thẻ tiểu ban Đồ hoạ
//   subBanCards.forEach((card) => {
//     card.addEventListener("click", function () {
//       // Xóa trạng thái 'selected' khỏi tất cả các thẻ tiểu ban khác
//       subBanCards.forEach((c) => c.classList.remove("selected"));
//       // Thêm trạng thái 'selected' cho thẻ tiểu ban hiện tại
//       this.classList.add("selected");
//       const selectedOption = this.dataset.option;
//       const designQ = document.getElementById("design-questions");
//       const editQ = document.getElementById("edit-questions");
//       const bothQ = document.getElementById("both-questions");
//       // Ẩn tất cả các câu hỏi riêng
//       designQ.classList.add("hidden");
//       editQ.classList.add("hidden");
//       bothQ.classList.add("hidden");
//       // Loại bỏ thuộc tính 'required' cho tất cả các trường riêng để tránh lỗi
//       designQ
//         .querySelectorAll("textarea")
//         .forEach((input) => input.removeAttribute("required"));
//       editQ
//         .querySelectorAll("textarea")
//         .forEach((input) => input.removeAttribute("required"));
//       bothQ
//         .querySelectorAll("textarea")
//         .forEach((input) => input.removeAttribute("required"));
//       if (selectedOption === "design") {
//         designQ.classList.remove("hidden");
//         // Không thêm required vì ban Đồ hoạ không bắt buộc
//       } else if (selectedOption === "edit") {
//         editQ.classList.remove("hidden");
//         // Không thêm required vì ban Đồ hoạ không bắt buộc
//       } else if (selectedOption === "both") {
//         bothQ.classList.remove("hidden");
//         // Không thêm required vì ban Đồ hoạ không bắt buộc
//       }
//       // Cuộn trang lên đầu phần câu hỏi để người dùng dễ dàng điền
//       window.scrollTo({
//         top: questionsSection.offsetTop,
//         behavior: "smooth",
//       });
//     });
//   });
//   // Hàm hiển thị thông báo tùy chỉnh
//   function showCustomAlert(message) {
//     const customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "fixed",
//       "top-1/2",
//       "left-1/2",
//       "-translate-x-1/2",
//       "-translate-y-1/2",
//       "bg-red-500",
//       "text-white",
//       "p-6",
//       "rounded-lg",
//       "shadow-xl",
//       "z-50"
//     );
//     customAlert.innerHTML = `
//       <div class="flex items-center space-x-2">
//           <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//               <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-11.293a1 1 0 00-1.414-1.414L7 8.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clip-rule="evenodd"></path>
//           </svg>
//           <span>${message}</span>
//       </div>
//   `;
//     document.body.appendChild(customAlert);
//     setTimeout(() => {
//       customAlert.remove();
//     }, 3000); // Ẩn sau 3 giây
//   }
//   // Lắng nghe sự kiện click vào nút cố định
//   // Lắng nghe sự kiện click vào nút cố định
//   fixedActionBtn.addEventListener("click", function () {
//     // Chống nháy/nhấp đúp
//     if (fixedActionBtn.disabled) return;
//     fixedActionBtn.disabled = true; // will fix capitalization below
//     setTimeout(() => {
//       fixedActionBtn.disabled = false;
//     }, 800);

//     // Kiểm tra xem người dùng đang ở phần nào của form
//     if (
//       !recruitmentForm.classList.contains("hidden") &&
//       questionsSection.classList.contains("hidden")
//     ) {
//       // Đây là trường hợp người dùng vừa hoàn thành phần thông tin cá nhân và muốn chuyển sang phần câu hỏi
//       const requiredInputs = recruitmentForm.querySelectorAll(
//         ".space-y-6 [required]"
//       );
//       let allFilled = true;
//       requiredInputs.forEach((input) => {
//         if (input.value.trim() === "") {
//           allFilled = false;
//         }
//       });
//       if (allFilled && selectedBan) {
//         questionsSection.classList.remove("hidden");
//         // Đặt văn bản nút thành "Sang phần góp ý"
//         fixedActionBtn.textContent = "Sang phần góp ý";
//         window.scrollTo({
//           top: questionsSection.offsetTop,
//           behavior: "smooth",
//         });
//       } else {
//         showCustomAlert("Vui lòng điền đủ thông tin cá nhân và chọn ban!");
//       }
//     } else if (!questionsSection.classList.contains("hidden")) {
//       // Nếu đang ở phần câu hỏi, kiểm tra và chuyển sang phần góp ý
//       const requiredInputs = questionsSection.querySelectorAll("[required]");
//       let allFilled = true;
//       requiredInputs.forEach((input) => {
//         if (input.value.trim() === "") {
//           allFilled = false;
//         }
//       });
//       if (allFilled) {
//         // Nếu đã điền đủ, ẩn phần câu hỏi và hiện phần góp ý
//         questionsSection.classList.add("hidden");
//         feedbackSection.classList.remove("hidden");
//         // Cập nhật văn bản nút thành "Gửi"
//         fixedActionBtn.textContent = "Gửi";
//         fixedActionBtn.classList.remove("bg-blue-600", "hover:bg-blue-700");
//         fixedActionBtn.classList.add("bg-green-600", "hover:bg-green-700");
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         // Hiển thị thông báo nếu còn câu hỏi chưa được điền
//         showCustomAlert("Vui lòng trả lời tất cả các câu hỏi bắt buộc!");
//       }
//     } else if (!feedbackSection.classList.contains("hidden")) {
//       // Nếu đang ở phần góp ý, gửi form tới Basin
//       recruitmentForm.submit();
//     }
//   });
//   // Lắng nghe sự kiện khi người dùng chọn file
//   document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
//     fileInput.addEventListener("change", function (event) {
//       const fileName = event.target.files[0].name;
//       const parentDiv = fileInput.parentElement;
//       let feedbackSpan = parentDiv.querySelector(".file-feedback");
//       if (!feedbackSpan) {
//         feedbackSpan = document.createElement("span");
//         feedbackSpan.classList.add(
//           "file-feedback",
//           "ml-4",
//           "text-sm",
//           "text-green-600",
//           "italic"
//         );
//         parentDiv.appendChild(feedbackSpan);
//       }
//       feedbackSpan.textContent = `File đã chọn: ${fileName}`;
//     });
//   });

//   // Thêm dấu * đỏ cho các trường bắt buộc (trừ ban Đồ hoạ & Photo)
//   function addRequiredAsterisks() {
//     const excludeSelectors = ["#ban-dohoa-q", "#ban-photo-q"];
//     const excluded = new Set();
//     excludeSelectors.forEach((sel) => {
//       document
//         .querySelectorAll(sel + " [id]")
//         .forEach((el) => excluded.add(el.id));
//     });
//     document.querySelectorAll("[required]").forEach((el) => {
//       const id = el.id;
//       if (!id) return;
//       if (excluded.has(id)) return;
//       const label = document.querySelector(`label[for="${id}"]`);
//       if (label && !label.querySelector(".req-star")) {
//         const star = document.createElement("span");
//         star.className = "req-star text-red-500";
//         star.textContent = " *";
//         label.appendChild(star);
//       }
//     });
//   }
//   addRequiredAsterisks();
// });

document.addEventListener("DOMContentLoaded", () => {
  // Get all necessary elements from the DOM
  const introSection = document.getElementById("intro-section");
  const recruitmentForm = document.getElementById("recruitment-form");
  const nextToInfoBtn = document.getElementById("next-to-info-btn");
  const questionsSection = document.getElementById("questions-section");
  const submitBtn = document.getElementById("fixed-action-btn");
  const banCards = document.querySelectorAll(".ban-card");
  const subBanCards = document.querySelectorAll(".sub-ban-card");

  // State variables to track selected ban and sub-ban
  let selectedBan = null;
  let selectedSubBan = null;

  // Event listener for the "Tiếp tục" (Continue) button
  nextToInfoBtn.addEventListener("click", () => {
    // Hide the intro section and show the form with a fade-in animation
    introSection.classList.remove("animated-scroll");
    introSection.classList.add("hidden");
    recruitmentForm.classList.remove("hidden");
    recruitmentForm.classList.add("animated-scroll");
  });

  // Event listeners for the main "ban" selection cards
  banCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Clear all active states and question sections
      banCards.forEach((c) => c.classList.remove("selected"));
      questionsSection.classList.add("hidden");
      document.querySelectorAll("#questions-section > div").forEach((q) => {
        q.classList.add("hidden");
        // Reset required state for all hidden inputs to prevent form submission issues
        q.querySelectorAll("input, textarea").forEach((input) => {
          input.removeAttribute("required");
        });
      });
      // Reset sub-ban selection
      subBanCards.forEach((c) => c.classList.remove("selected"));

      // Set the newly selected ban
      card.classList.add("selected");
      selectedBan = card.dataset.ban;

      // Show the appropriate questions section based on the selected ban
      const questionBlock = document.getElementById(`ban-${selectedBan}-q`);
      if (questionBlock) {
        questionBlock.classList.remove("hidden");
        questionsSection.classList.remove("hidden");
        // Set all inputs in the active section as required
        questionBlock.querySelectorAll("input, textarea").forEach((input) => {
          input.setAttribute("required", "true");
        });
      }

      // Show the submit button
      submitBtn.classList.remove("hidden");
      submitBtn.classList.add("animated-scroll");
    });
  });

  // Event listeners for the "sub-ban" selection cards (for "Đồ hoạ" ban)
  subBanCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Clear active state for all sub-ban cards
      subBanCards.forEach((c) => c.classList.remove("selected"));

      // Hide all sub-ban question sections
      document.getElementById("design-questions").classList.add("hidden");
      document.getElementById("edit-questions").classList.add("hidden");
      document.getElementById("both-questions").classList.add("hidden");

      // Remove required attribute from all sub-ban inputs
      document
        .querySelectorAll("#ban-dohoa-q input, #ban-dohoa-q textarea")
        .forEach((input) => {
          if (!["Đồ hoạ - Câu hỏi chung 1"].includes(input.name)) {
            input.removeAttribute("required");
          }
        });

      // Set the newly selected sub-ban
      card.classList.add("selected");
      selectedSubBan = card.dataset.option;

      // Show the correct sub-ban question block and set inputs as required
      const subQuestionBlock = document.getElementById(
        `${selectedSubBan}-questions`
      );
      if (subQuestionBlock) {
        subQuestionBlock.classList.remove("hidden");
        subQuestionBlock
          .querySelectorAll("input, textarea")
          .forEach((input) => {
            input.setAttribute("required", "true");
          });
      }
    });
  });

  // Event listener for the main form submission button
  recruitmentForm.addEventListener("submit", (event) => {
    // Add the selected ban and sub-ban to the form data
    const banInput = document.createElement("input");
    banInput.type = "hidden";
    banInput.name = "Ban ứng tuyển";
    banInput.value = selectedBan || "Chưa chọn";
    recruitmentForm.appendChild(banInput);

    if (selectedBan === "dohoa") {
      const subBanInput = document.createElement("input");
      subBanInput.type = "hidden";
      subBanInput.name = "Tiểu ban Đồ hoạ";
      subBanInput.value = selectedSubBan || "Chưa chọn";
      recruitmentForm.appendChild(subBanInput);
    }
  });
});
