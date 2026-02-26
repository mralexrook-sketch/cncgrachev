/**
 * CNC Engineer Portfolio - Interactive Scripts
 * mralexrook-sketch.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Generate Particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }

  // Mobile Menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.querySelector('i').classList.remove('fa-times');
      mobileToggle.querySelector('i').classList.add('fa-bars');
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Counter Animation
  const counters = document.querySelectorAll('.stat-value');
  const speed = 200;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(animateCounters, 20);
      } else {
        counter.innerText = target + '+';
      }
    });
  };

  // Skill Bars Animation
  const skillLevels = document.querySelectorAll('.skill-level');
  const animateSkills = () => {
    skillLevels.forEach(skill => {
      const level = skill.getAttribute('data-level');
      skill.style.setProperty('--level', level + '%');
    });
  };

  // Intersection Observer
  const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.closest('.hero-stats')) animateCounters();
        if (entry.target.closest('.skills-container')) animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .timeline-item, .skill-category, .project-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Active Navigation
  const sections = document.querySelectorAll('section[id], header[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // Form Handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      }, 3000);
    });
  }

  // Console Easter Egg
  console.log('%c⚙️ CNC ENGINEER PORTFOLIO', 'font-size: 20px; font-weight: bold; color: #ff6b00;');
  console.log('%c👨‍💻 Грачев Алексей Сергеевич', 'font-size: 14px; color: #b0b0b0;');
  console.log('%c📧 grachevcnc@gmail.com', 'font-size: 13px; color: #ff6b00;');
  console.log('%c🔗 github.com/mralexrook-sketch', 'font-size: 13px; color: #ff6b00;');
});