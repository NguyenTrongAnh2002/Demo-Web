export function initBackToTop(selector = ".back-home", scrollThreshold = 200) {
  document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.querySelector(selector);

    if (!backToTop) {
      console.warn(`Không tìm thấy phần tử với selector "${selector}"`);
      return;
    }

    window.addEventListener("scroll", function () {
      if (window.scrollY > scrollThreshold) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
}
