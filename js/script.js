/* ===== ANTI PROTECTION ===== */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J')) {
    e.preventDefault();
  }
  if (e.key === 'F12') {
    e.preventDefault();
  }
});

/* ===== CLICK SOUND ===== */
const clickSound = new Audio('data:audio/wav;base64,UklGRl4FAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToFAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA');
clickSound.volume = 0.3;

document.addEventListener('click', (e) => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  const ripple = document.createElement('div');
  ripple.classList.add('click-ripple');
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
});

/* ===== SCROLL PROGRESS BAR ===== */
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress);

/* ===== PROFESSIONAL SCROLL ANIMATIONS ===== */
const animationMap = [
  { selector: '.section-header', type: 'animate-scale' },
  { selector: '.stat-card', type: 'animate-slide-up', stagger: true },
  { selector: '.service-card', type: 'animate-slide-up', stagger: true },
  { selector: '.team-card', type: 'animate-scale' },
  { selector: '.pricing-card', type: 'animate-slide-up', stagger: true },
  { selector: '.testimonial-card', type: 'animate-slide-right' },
  { selector: '.contact-form', type: 'animate-slide-left' },
  { selector: '.contact-info-card', type: 'animate-slide-right', stagger: true },
  { selector: '.pricing-note', type: 'animate-slide-up' },
];

animationMap.forEach(item => {
  document.querySelectorAll(item.selector).forEach((el, i) => {
    el.classList.add(item.type);
    if (item.stagger) {
      el.classList.add('stagger-' + Math.min(i + 1, 8));
    }
  });
});

function checkAnimations() {
  document.querySelectorAll('.animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-rotate').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', checkAnimations);

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 2000);
});

/* ===== 3D ICON MOUSE TRACKING ===== */
document.querySelectorAll('.stat-card').forEach(card => {
  const icon = card.querySelector('.stat-icon');
  if (!icon) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    icon.style.transition = 'transform 0.1s ease-out';
    icon.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;

    icon.style.boxShadow = `${rotateY * -0.6}px ${rotateX * 0.6}px 24px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 0 rgba(0, 0, 0, 0.2)`;
  });

  card.addEventListener('mouseleave', () => {
    icon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    icon.style.transform = 'perspective(600px) rotateX(6deg) rotateY(12deg) scale(1)';
    icon.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)';
  });
});

/* ===== HERO LOGO 3D MOUSE TRACKING ===== */
const heroLogo = document.querySelector('.hero-logo-glow');
if (heroLogo) {
  const heroChars = heroLogo.querySelectorAll('.hero-char');

  heroLogo.addEventListener('mousemove', (e) => {
    const rect = heroLogo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 25;
    const rotateX = ((y - centerY) / centerY) * -25;

    heroLogo.style.animation = 'none';
    heroLogo.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;

    heroChars.forEach((ch, i) => {
      const offset = (i - 1) * 6;
      ch.style.transition = 'transform 0.15s ease-out, text-shadow 0.15s ease-out';
      ch.style.transform = `translateZ(${15 + Math.abs(offset)}px) rotateY(${rotateY * 0.3}deg)`;
    });
  });

  heroLogo.addEventListener('mouseleave', () => {
    heroLogo.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    heroLogo.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
    heroLogo.style.animation = 'hero-float 6s ease-in-out infinite';

    heroChars.forEach(ch => {
      ch.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      ch.style.transform = 'translateZ(0px) rotateY(0deg)';
    });

    setTimeout(() => {
      heroLogo.style.transition = '';
      heroChars.forEach(ch => { ch.style.transition = ''; });
    }, 600);
  });

  heroLogo.addEventListener('mouseenter', () => {
    heroLogo.style.transition = '';
    heroChars.forEach(ch => { ch.style.transition = ''; });
  });
}

/* ===== SERVICE CARD 3D MOUSE TRACKING ===== */
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.querySelector('.service-icon');
  const iconI = icon ? icon.querySelector('i') : null;
  if (!icon) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    icon.style.transition = 'transform 0.1s ease-out';
    icon.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;

    icon.style.boxShadow = `${rotateY * -0.5}px ${rotateX * 0.5}px 20px rgba(59, 130, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 0 rgba(0, 0, 0, 0.2)`;

    if (iconI) {
      iconI.style.transition = 'transform 0.1s ease-out';
      iconI.style.transform = `translateZ(6px) rotateY(${rotateY * -0.2}deg)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    icon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    icon.style.transform = 'perspective(600px) rotateX(6deg) rotateY(10deg) scale(1)';
    icon.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.15)';

    if (iconI) {
      iconI.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      iconI.style.transform = 'translateZ(3px) rotateY(0deg)';
    }
  });
});

/* ===== TEAM CARD 3D MOUSE TRACKING ===== */
document.querySelectorAll('.team-card').forEach(card => {
  const avatar = card.querySelector('.team-avatar');
  const social = card.querySelector('.team-social');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    if (avatar) {
      avatar.style.transition = 'transform 0.1s ease-out';
      avatar.style.transform = `perspective(400px) rotateX(${rotateX * -0.3}deg) rotateY(${rotateY * -0.3}deg) scale(1.1) translateZ(20px)`;
    }

    if (social) {
      social.style.transition = 'transform 0.1s ease-out';
      social.style.transform = `perspective(400px) rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg) translateZ(10px)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';

    if (avatar) {
      avatar.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      avatar.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
    }

    if (social) {
      social.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      social.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  });
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.15;
    this.color = Math.random() > 0.5 ? '59, 130, 246' : '168, 85, 247';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && dist > 0) {
      const force = (150 - dist) / 150;
      this.x -= dx * force * 0.002;
      this.y -= dy * force * 0.002;
    }

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function createParticles() {
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkEls = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  const sections = document.querySelectorAll('.section, .hero');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ===== COUNTER ANIMATION ===== */
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 80 && rect.bottom > 0;
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    function update() {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(update);
    }

    update();
  });
}

const statCards = document.querySelectorAll('.stat-card');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const aboutSection = document.getElementById('about');
  if (aboutSection && isInViewport(aboutSection)) {
    countersStarted = true;
    animateCounters();
  }
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);

/* ===== TESTIMONIALS CAROUSEL ===== */
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');
let currentSlide = 0;
let slides = track ? track.querySelectorAll('.testimonial-card') : [];
let autoPlayInterval;

function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  currentSlide = index;
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

if (slides.length > 0) {
  createDots();
  prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
  nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  startAutoPlay();
}

/* ===== CONTACT FORM ===== */
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1519568858946469888/UsI2clGoEiElCGm7WMeZkabi0HGfQWfjMIGdD4CceihjUyOXew_4mi7jMMapgmr0m-CM';

const phoneInput = document.getElementById('form-phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '');
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value || 'Not specified';
    const message = document.getElementById('form-message').value.trim();

    const serviceLabels = {
      website: 'Website Development',
      landing: 'Landing Page',
      dashboard: 'Dashboard System',
      uiux: 'UI/UX Design',
      discord: 'Discord Bot',
      fivem: 'FiveM Web Solution',
      api: 'API Integration',
      other: 'Other'
    };

    const embed = {
      title: '📩 New Contact Message',
      color: 5814783,
      fields: [
        { name: '👤 Name', value: name, inline: true },
        { name: '📧 Email', value: email, inline: true },
        { name: '📞 Phone', value: phone || 'Not provided', inline: true },
        { name: '🛠️ Service', value: serviceLabels[service] || service, inline: true },
        { name: '💬 Message', value: message || 'No message provided' }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'evv amine.dev • Contact Form' }
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });

      btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
      contactForm.reset();
    } catch (err) {
      btn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

/* ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== PARALLAX SCROLL EFFECT ===== */
function updateParallax() {
  const scrollY = window.scrollY;

  document.querySelectorAll('.hero-logo-glow').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.3}px)`;
  });

  document.querySelectorAll('.hero-title').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.15}px)`;
  });

  document.querySelectorAll('.hero-subtitle').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.1}px)`;
  });

  document.querySelectorAll('.hero-buttons').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.08}px)`;
  });

  document.querySelectorAll('.hero-scroll-indicator').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.4}px)`;
  });

  document.querySelectorAll('.shape-1').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.5}px)`;
  });

  document.querySelectorAll('.shape-2').forEach(el => {
    el.style.transform = `translateY(${scrollY * -0.35}px)`;
  });

  document.querySelectorAll('.shape-3').forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.25}px) translateX(${scrollY * -0.1}px)`;
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});
