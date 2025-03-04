const slider = document.querySelector(".slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");

let currentIndex = 6; // Bắt đầu từ danh sách gốc
const totalItems = items.length;
const itemWidth = 350;
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

// Cập nhật lại danh sách sau khi nhân đôi
const allItems = document.querySelectorAll(".item");
slider.style.width = `${allItems.length * itemWidth}px`;

// Đặt slider ở vị trí chính giữa danh sách thật
slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

function slideNext() {
  currentIndex++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Khi đến cuối bản sao → Nhảy về đầu danh sách thật (không hiệu ứng)
  if (currentIndex === totalItems * 2) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = totalItems;
      slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }, 500);
  }
}

function slidePrev() {
  currentIndex--;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Khi đến đầu bản sao → Nhảy về cuối danh sách thật (không hiệu ứng)
  if (currentIndex === 0) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = totalItems;
      slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }, 500);
  }
}

nextButton.addEventListener("click", slideNext);
prevButton.addEventListener("click", slidePrev);

/* làm phần background */

const container = document.querySelector(".background-container");
let offset = 0;
setInterval(() => {
  offset += 33.33; // Di chuyển qua mỗi background
  if (offset >= 99) {
    offset = 0; // Quay lại vị trí ban đầu
  }
  container.style.transform = `translateX(-${offset}%)`;
}, 3000); // Lướt mỗi 3 giây
