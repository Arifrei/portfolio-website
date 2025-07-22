// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Fade-in for all .fade-in elements (staggered)
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 160 + i * 150);
  });

  // Button ripple effect for .button and .btn
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.classList.add('ripple');
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;

    // Remove old ripple
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
  document.querySelectorAll('.button, .btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // Project card animation (if present)
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, idx) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200 + idx * 130);
  });

  // Contact form input animation (label highlight on focus)
  document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', e => {
      e.target.closest('.form-group').classList.add('focused');
    });
    input.addEventListener('blur', e => {
      e.target.closest('.form-group').classList.remove('focused');
    });
  });
});
