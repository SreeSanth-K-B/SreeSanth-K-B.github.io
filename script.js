/* ── Active nav highlight ── */
const sections  = document.querySelectorAll('section[id]');
const navIds    = { hero:'nav-home', projects:'nav-proj', experience:'nav-exp', skills:'nav-skills', contact:'nav-cont' };
const navIcons  = document.querySelectorAll('.nav-icon');

function updateNav() {
  let current = 'hero';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navIcons.forEach(icon => icon.classList.remove('active'));
  const active = document.getElementById(navIds[current]);
  if (active) active.classList.add('active');
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // Stagger siblings
      const siblings = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(e.target) * 60;
      setTimeout(() => {
        e.target.classList.add('visible');
      }, delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
