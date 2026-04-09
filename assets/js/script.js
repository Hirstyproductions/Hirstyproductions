// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== INTERSECTION OBSERVER - FADE IN ANIMATIONS =====
// Handles both service cards / video items AND masonry photo items
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger masonry items slightly based on position
      const delay = entry.target.classList.contains('masonry-item') ? 0 : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '';
        entry.target.style.transform = '';
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
});

// Observe masonry items (photo portfolio page)
function observeMasonryItems() {
  document.querySelectorAll('.fade-in-item').forEach((el, i) => {
    // Stagger in batches so columns animate nicely
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    fadeObserver.observe(el);
  });
}

// Observe service/video cards (homepage)
document.querySelectorAll('.service-card, .video-item, .client-logo').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// Run after DOM fully populated (photo grid builds via JS)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeMasonryItems);
} else {
  // DOM already ready — but masonry items may be appended by inline script
  // Use a short defer to let the inline script finish
  setTimeout(observeMasonryItems, 50);
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPosition = window.scrollY + 200;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', debounce(highlightNav, 50), { passive: true });

// ===== FORM SUBMISSION FEEDBACK =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function () {
    const button = this.querySelector('.btn-submit');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  });
}

// ===== HERO SLIDESHOW (index.html) =====
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 4000);
}

// ===== HASH SCROLL ON LOAD =====
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});

// ===== UTILITY: DEBOUNCE =====
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

console.log('🎬 Hirsty Productions - Website Loaded Successfully!');
