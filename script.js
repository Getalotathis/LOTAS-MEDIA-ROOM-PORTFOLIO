// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Live "timecode" readout in the nav — HH:MM:SS:FF, FF = fake frame count (30fps)
const tcEl = document.getElementById('timecode');
function pad(n){ return n.toString().padStart(2, '0'); }
function tick(){
  const now = new Date();
  const frames = Math.floor((now.getMilliseconds() / 1000) * 30);
  tcEl.textContent =
    pad(now.getHours()) + ':' +
    pad(now.getMinutes()) + ':' +
    pad(now.getSeconds()) + ':' +
    pad(frames);
}
if (tcEl){
  tick();
  setInterval(tick, 1000 / 30);
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Subtle scroll reveal for work cards and sections
const reveal = document.querySelectorAll('.work-card, .service, .about-text, .about-facts');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && 'IntersectionObserver' in window){
  reveal.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveal.forEach(el => io.observe(el));
}
