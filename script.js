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

// Live "frame counter" in the hero — counts up at 24fps since the page loaded,
// as if the camera started rolling the moment you landed here.
const frameEl = document.getElementById('frameCounter');
if (frameEl){
  const start = performance.now();
  function tickFrames(){
    const elapsedFrames = Math.floor((performance.now() - start) / (1000 / 24));
    frameEl.textContent = 'FRAME ' + elapsedFrames.toString().padStart(6, '0');
  }
  tickFrames();
  setInterval(tickFrames, 1000 / 24);
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

// Archive — year tabs + category chips filter the grid, with a brief
// "reel spin" transition between states
const archiveGrid = document.getElementById('archiveGrid');
const archiveEmpty = document.getElementById('archiveEmpty');
const yearTabs = document.querySelectorAll('.year-tab');
const catChips = document.querySelectorAll('.cat-chip');

let activeYear = '2026';
let activeCat = 'all';

function applyArchiveFilter(){
  if (!archiveGrid) return;
  archiveGrid.classList.add('reeling');
  setTimeout(() => {
    const cards = archiveGrid.querySelectorAll('.archive-card');
    let visibleCount = 0;
    cards.forEach(card => {
      const matchesYear = card.dataset.year === activeYear;
      const matchesCat = activeCat === 'all' || card.dataset.cat === activeCat;
      const show = matchesYear && matchesCat;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    if (archiveEmpty) archiveEmpty.hidden = visibleCount > 0;
    archiveGrid.classList.remove('reeling');
  }, 200);
}

yearTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    yearTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeYear = tab.dataset.year;
    applyArchiveFilter();
  });
});

catChips.forEach(chip => {
  chip.addEventListener('click', () => {
    catChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    applyArchiveFilter();
  });
});

if (archiveGrid) applyArchiveFilter();

// Reel progress rail — fills down the left edge as the page scrolls,
// reading as one continuous filmstrip from hero to footer
const reelFill = document.getElementById('reelFill');
function updateReelFill(){
  if (!reelFill) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  reelFill.style.height = Math.min(100, Math.max(0, pct)) + '%';
}
if (reelFill){
  updateReelFill();
  window.addEventListener('scroll', updateReelFill, { passive: true });
  window.addEventListener('resize', updateReelFill);
}
