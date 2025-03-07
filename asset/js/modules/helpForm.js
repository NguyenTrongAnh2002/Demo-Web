export function initHelpForm() {
  const openHelp = document.querySelector(".btn-help-show");
  const closeHelp = document.querySelector(".btn-help-close");
  const form = document.querySelector(".help-form");

  if (!openHelp || !closeHelp || !form) {
    console.warn("Không tìm thấy phần tử của help form!");
    return;
  }

  openHelp.addEventListener("click", function () {
    form.classList.add("show");
  });

  closeHelp.addEventListener("click", function () {
    form.classList.remove("show");
  });
}
