const slider = document.querySelector(".slider");
const items = document.querySelectorAll(".item");
const itemWidth = 350; // Kích thước mỗi item
let startX = 0;
let currentTranslate = 0;
let isDragging = false;

// Nhân đôi danh sách để tạo hiệu ứng vô hạn
const originalItems = [...items];
originalItems.forEach((item) => {
  const clone = item.cloneNode(true);
  slider.appendChild(clone);
});
originalItems.reverse().forEach((item) => {
  const clone = item.cloneNode(true);
  slider.prepend(clone);
});

// Cập nhật danh sách mới sau khi nhân đôi
const allItems = document.querySelectorAll(".item");
const totalItems = allItems.length;
slider.style.width = `${totalItems * itemWidth}px`;

// Đặt slider ở vị trí chính giữa danh sách thật
let currentIndex = originalItems.length;
slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

function getTranslateX() {
  const transformMatrix = window
    .getComputedStyle(slider)
    .getPropertyValue("transform");
  if (transformMatrix !== "none") {
    return parseFloat(transformMatrix.split(",")[4]);
  }
  return 0;
}

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  currentTranslate = getTranslateX();
  slider.style.transition = "none"; // Không transition khi kéo
}

function dragging(e) {
  if (!isDragging) return;
  let moveX =
    (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) - startX;
  slider.style.transform = `translateX(${currentTranslate + moveX}px)`;
}

function stopDrag() {
  isDragging = false;
  currentTranslate = getTranslateX();

  // Nếu kéo quá phần cuối → Dịch chuyển ngay lập tức về phần đầu
  if (currentTranslate > -itemWidth * (originalItems.length - 1)) {
    slider.style.transition = "none";
    currentTranslate = -itemWidth * (totalItems - originalItems.length - 1);
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
  // Nếu kéo quá phần đầu → Dịch chuyển ngay lập tức về phần cuối
  else if (
    currentTranslate <
    -itemWidth * (totalItems - originalItems.length)
  ) {
    slider.style.transition = "none";
    currentTranslate = -itemWidth * originalItems.length;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
}

// Sự kiện chuột
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("mousemove", dragging);
slider.addEventListener("mouseup", stopDrag);
slider.addEventListener("mouseleave", stopDrag);

// Sự kiện cảm ứng (Mobile)
slider.addEventListener("touchstart", startDrag);
slider.addEventListener("touchmove", dragging);
slider.addEventListener("touchend", stopDrag);

/* làm phần background */

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".background-slider");
  let index = 0;

  function changeSlide() {
    index = (index + 1) % 3; // Khi index = 2, quay về 0
    slider.style.transform = `translateX(-${index * 100}vw)`;
  }

  setInterval(changeSlide, 3000); // Chuyển đổi mỗi 3 giây
});
