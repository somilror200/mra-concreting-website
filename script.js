const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');
const setHeader = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', setHeader, { passive: true });
setHeader();
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filters .active').classList.remove('active');
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.gallery figure').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
}));
document.getElementById('year').textContent = new Date().getFullYear();
