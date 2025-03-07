export class BackgroundSlider {
  constructor(selector, slideCount = 3, interval = 3000) {
    this.slider = document.querySelector(selector);
    this.index = 0;
    this.slideCount = slideCount;
    this.interval = interval;

    if (!this.slider) {
      console.warn(`Không tìm thấy phần tử với selector "${selector}"`);
      return;
    }

    this.startAutoSlide();
  }

  changeSlide() {
    this.index = (this.index + 1) % this.slideCount; // Khi index = slideCount - 1, quay về 0
    this.slider.style.transform = `translateX(-${this.index * 100}vw)`;
  }

  startAutoSlide() {
    setInterval(() => this.changeSlide(), this.interval);
  }
}
