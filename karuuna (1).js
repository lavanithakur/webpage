/* ═══════════════════════════════════════════════════════
   KARUUNA — Shared JavaScript
   All pages include this script for consistent behaviour.
═══════════════════════════════════════════════════════ */

// ── Scroll-hide navbar ──────────────────────────────
const nav = document.getElementById('mainNav');
let lastY = 0;
if (nav) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('hide', y > lastY && y > 100);
    lastY = y;
  });
}

// ── Dark / Light mode toggle ────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (themeBtn) {
  // Restore saved preference
  const saved = localStorage.getItem('k-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  if (themeIcon) themeIcon.className = saved === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';

  themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('k-theme', next);
    if (themeIcon) themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  });
}

// ── Ripple effect ────────────────────────────────────
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.ripple-btn');
  if (!btn) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// ── Page transition overlay ──────────────────────────
function handleCTA(btn, href) {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;
  overlay.classList.add('active');
  setTimeout(() => {
    overlay.classList.remove('active');
    if (href) window.location.href = href;
  }, 500);
}

// ── Scroll reveal ────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Active nav link highlight ────────────────────────
const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('[data-nav-page]').forEach(link => {
  if (link.getAttribute('data-nav-page') === currentPage) link.classList.add('active');
});
