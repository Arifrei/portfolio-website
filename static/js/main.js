// main.js
document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, i) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.opacity = 1;
    }, 100 + i * 100);
  });
});
