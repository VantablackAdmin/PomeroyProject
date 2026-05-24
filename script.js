// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- topbar shrink on scroll ----------
const bar = document.querySelector('.topbar');
addEventListener('scroll', () => {
  bar.style.padding = scrollY > 40 ? '9px 28px' : '14px 28px';
});
