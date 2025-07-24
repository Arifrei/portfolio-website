document.addEventListener('DOMContentLoaded', function () {
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

  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.classList.add('ripple');
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;

    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  }
  document.querySelectorAll('.button, .btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  const seeProjectsBtn = document.querySelector('.hero-btn[href="#projects"]');
  if (seeProjectsBtn) {
    seeProjectsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector('#projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

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
    let scrollPos = window.scrollY + 120;
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

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 32);
      }
    }
    setTimeout(typeWriter, 200);
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (
        e.target.classList.contains('btn') ||
        e.target.classList.contains('button') ||
        e.target.tagName === 'A'
      ) return;
      this.classList.toggle('flipped');
    });
    card.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.classList.toggle('flipped');
      }
    });
    card.addEventListener('mouseleave', function () {
      this.classList.remove('flipped');
    });
  });
});
