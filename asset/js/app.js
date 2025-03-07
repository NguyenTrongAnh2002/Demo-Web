// Hiện form index
import { initModal } from "./modules/modal.js";
initModal({
  openSelector: "#openQuote",
  closeSelector: "#closeQuote",
  modalSelector: "#quoteModal",
});

// Tạo hiệu ứng cho slider
import { InfiniteSlider } from "./modules/slider.js";

// Khởi tạo slider với class .slider
document.addEventListener("DOMContentLoaded", function () {
  new InfiniteSlider(".slider", 350);
});

// Chat form
import { initHelpForm } from "./modules/helpForm.js";
document.addEventListener("DOMContentLoaded", function () {
  initHelpForm();
});

// Button về đầu trang
import { initBackToTop } from "./modules/backtohome.js";
initBackToTop(".back-home", 200);

// LÀm hiệu ứng background
import { BackgroundSlider } from "./modules/backgroundSlider.js";

document.addEventListener("DOMContentLoaded", function () {
  new BackgroundSlider(".background-slider", 3, 3000);
});
