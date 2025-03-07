export class InfiniteSlider {
  constructor(selector, itemWidth = 350) {
    this.slider = document.querySelector(selector);
    this.items = this.slider ? this.slider.querySelectorAll(".item") : [];
    this.itemWidth = itemWidth;
    this.startX = 0;
    this.currentTranslate = 0;
    this.isDragging = false;

    if (!this.slider || this.items.length === 0) {
      console.warn("Không tìm thấy slider hoặc item nào!");
      return;
    }

    this.init();
    this.attachEvents();
  }

  init() {
    // Nhân đôi danh sách để tạo hiệu ứng vô hạn
    const originalItems = [...this.items];
    originalItems.forEach((item) => {
      this.slider.appendChild(item.cloneNode(true));
    });
    originalItems.reverse().forEach((item) => {
      this.slider.prepend(item.cloneNode(true));
    });

    // Cập nhật danh sách mới sau khi nhân đôi
    this.allItems = this.slider.querySelectorAll(".item");
    this.totalItems = this.allItems.length;
    this.slider.style.width = `${this.totalItems * this.itemWidth}px`;

    // Đặt slider ở vị trí chính giữa danh sách thật
    this.currentIndex = originalItems.length;
    this.slider.style.transform = `translateX(-${
      this.currentIndex * this.itemWidth
    }px)`;
  }

  getTranslateX() {
    const transformMatrix = window
      .getComputedStyle(this.slider)
      .getPropertyValue("transform");
    if (transformMatrix !== "none") {
      return parseFloat(transformMatrix.split(",")[4]);
    }
    return 0;
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    this.currentTranslate = this.getTranslateX();
    this.slider.style.transition = "none"; // Không transition khi kéo
  }

  dragging(e) {
    if (!this.isDragging) return;
    let moveX =
      (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) -
      this.startX;
    this.slider.style.transform = `translateX(${
      this.currentTranslate + moveX
    }px)`;
  }

  stopDrag() {
    this.isDragging = false;
    this.currentTranslate = this.getTranslateX();

    // Nếu kéo quá phần cuối → Dịch chuyển ngay lập tức về phần đầu
    if (this.currentTranslate > -this.itemWidth * (this.items.length - 1)) {
      this.slider.style.transition = "none";
      this.currentTranslate =
        -this.itemWidth * (this.totalItems - this.items.length - 1);
      this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    // Nếu kéo quá phần đầu → Dịch chuyển ngay lập tức về phần cuối
    else if (
      this.currentTranslate <
      -this.itemWidth * (this.totalItems - this.items.length)
    ) {
      this.slider.style.transition = "none";
      this.currentTranslate = -this.itemWidth * this.items.length;
      this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }
  }

  attachEvents() {
    this.slider.addEventListener("mousedown", (e) => this.startDrag(e));
    this.slider.addEventListener("mousemove", (e) => this.dragging(e));
    this.slider.addEventListener("mouseup", () => this.stopDrag());
    this.slider.addEventListener("mouseleave", () => this.stopDrag());

    // Sự kiện cảm ứng (Mobile)
    this.slider.addEventListener("touchstart", (e) => this.startDrag(e));
    this.slider.addEventListener("touchmove", (e) => this.dragging(e));
    this.slider.addEventListener("touchend", () => this.stopDrag());
  }
}
