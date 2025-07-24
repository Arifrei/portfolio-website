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

  // NAVBAR SMOOTH SCROLL AND ACTIVE HIGHLIGHT
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function setActiveLink() {
    let scrollPos = window.scrollY + 120; // adjust offset if you have a fixed header
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // --- HERO SECTION JS INTERACTIVITY ---

  // Typewriter reveal for hero title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 32); // adjust typing speed here (ms)
      }
    }
    setTimeout(typeWriter, 200); // delay before typing starts
  }

  // Subtle hero background animation on mouse move
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      const { width, height, left, top } = heroSection.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 16; // max 8px left/right
      const y = ((e.clientY - top) / height - 0.5) * 12; // max 6px up/down
      heroSection.style.backgroundPosition = `${60 + x}% ${50 + y}%`;
    });
    heroSection.addEventListener('mouseleave', function () {
      heroSection.style.backgroundPosition = '';
    });
  }
});
