const precisionLink=document.createElement('link');
precisionLink.rel='stylesheet';
precisionLink.href='precision.css?v=20260904-2';
document.head.appendChild(precisionLink);

const headerHost=document.getElementById('site-header');
const footerHost=document.getElementById('site-footer');
const current=location.pathname.split('/').pop()||'index.html';

if(headerHost){
  headerHost.innerHTML=`<header class="site-header"><a class="brand" href="index.html" aria-label="MRA Concreting home"><span>MRA</span><small>CONCRETING</small></a><button class="menu" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button><nav class="site-nav" aria-label="Main navigation"><a href="index.html">Home</a><a href="about.html">About MRA</a><a href="services.html">Services</a><a href="exposed-aggregate.html">Exposed Aggregate Concrete</a><a href="projects.html">Projects</a><a href="faq.html">Learn</a><a href="service-areas.html">Service Areas</a><a href="contact.html">Contact</a></nav><a class="button header-cta" href="contact.html">Request a free quote</a></header>`;
  const nav=document.querySelector('.site-nav');
  const menu=document.querySelector('.menu');
  nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
    menu.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
  const header=document.querySelector('.site-header');
  const sync=()=>header.classList.toggle('scrolled',scrollY>25);
  addEventListener('scroll',sync,{passive:true});
  sync();
}

if(footerHost){
  footerHost.innerHTML=`<footer class="site-footer"><div class="footer-inner"><a class="brand" href="index.html"><span>MRA</span><small>CONCRETING</small></a><div><h4>Quick links</h4><a href="about.html">About</a><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="service-areas.html">Service Areas</a></div><div><h4>Services</h4><a href="exposed-aggregate.html">Exposed Aggregate</a><a href="services.html">Plain & Coloured</a><a href="services.html">Stencil / Slate</a><a href="services.html">Council Works</a></div><div><h4>Contact</h4><a href="tel:+61432827436">0432 827 436</a><a href="mailto:amanda@mraconcreting.com.au">amanda@mraconcreting.com.au</a></div></div><div class="footer-bottom">© <span id="year"></span> MRA Concreting. All Rights Reserved.</div></footer><a class="mobile-call" href="tel:+61432827436">Call Amanda <span>0432 827 436</span></a>`;
  document.getElementById('year').textContent=new Date().getFullYear();
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    observer.unobserve(e.target);
  }
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.filterable').forEach(card=>card.classList.toggle('hidden',f!=='all'&&card.dataset.category!==f));
}));

if(document.body.classList.contains('home')){
  const cta=document.querySelector('.cta-band');
  if(cta){
    const mapUrl='https://maps.app.goo.gl/WyDg2VaBcSfiM9oi9?g_st=ic';
    const reviews=document.createElement('section');
    reviews.className='google-reviews-section';
    reviews.innerHTML=`<div class="google-reviews-inner"><p class="google-reviews-kicker">GOOGLE REVIEWS</p><h2>WHAT OUR CLIENTS SAY</h2><div class="google-review-cards"><a class="google-review-card" href="${mapUrl}" target="_blank" rel="noopener"><div class="google-stars">★★★★★</div><strong>5.0</strong><span>GOOGLE RATING</span></a><a class="google-review-card" href="${mapUrl}" target="_blank" rel="noopener"><div class="google-stars">★★★★★</div><strong>15 REVIEWS</strong><span>GOOGLE REVIEWS</span></a><a class="google-review-card google-review-link" href="${mapUrl}" target="_blank" rel="noopener"><div class="google-mark">G</div><strong>MRA CONCRETING</strong><span>VIEW ON GOOGLE →</span></a></div></div>`;
    cta.before(reviews);
  }
}
