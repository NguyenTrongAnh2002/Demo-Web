export function initModal({
  openSelector = "#openQuote",
  closeSelector = "#closeQuote",
  modalSelector = "#quoteModal",
}) {
  document.addEventListener("DOMContentLoaded", function () {
    const openBtns = document.querySelectorAll(openSelector);
    const closeBtn = document.querySelector(closeSelector);
    const modal = document.querySelector(modalSelector);

    if (!modal || !closeBtn || openBtns.length === 0) {
      console.warn("Không tìm thấy phần tử modal hoặc nút mở/đóng!");
      return;
    }

    // Mở modal
    openBtns.forEach((openBtn) => {
      openBtn.addEventListener("click", function () {
        modal.classList.add("show");
      });
    });

    // Đóng modal khi bấm nút
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    // Đóng modal khi click ra ngoài
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  });
}
