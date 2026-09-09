const redesignLink = document.createElement('link');
redesignLink.rel = 'stylesheet';
redesignLink.href = 'mra-redesign.css?v=20260909-2';
if (!document.querySelector('link[href*="mra-redesign.css"]')) document.head.appendChild(redesignLink);

const compatLink = document.createElement('link');
compatLink.rel = 'stylesheet';
compatLink.href = 'mra-compat.css?v=20260909-2';
if (!document.querySelector('link[href*="mra-compat.css"]')) document.head.appendChild(compatLink);

const headerHost = document.getElementById('site-header');
const footerHost = document.getElementById('site-footer');
const current = location.pathname.split('/').pop() || 'index.html';

const servicePages = ['services.html', 'exposed-aggregate.html'];
const resourcePages = ['resources.html', 'faq.html', 'service-areas.html'];

if (headerHost) {
  headerHost.innerHTML = `
    <header class="site-header" aria-label="MRA Concreting site header">
      <a class="brand" href="index.html" aria-label="MRA Concreting home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-copy">
          <strong>MRA</strong>
          <small>CONCRETING</small>
          <em>BUILT ON FAMILY. BUILT TO LAST.</em>
        </span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <div class="nav-drop${servicePages.includes(current) ? ' active' : ''}">
          <button type="button" aria-expanded="false">Services <span>⌄</span></button>
          <div class="nav-drop-menu">
            <a href="services.html">All Services</a>
            <a href="exposed-aggregate.html">Exposed Aggregate</a>
            <a href="services.html">Plain &amp; Coloured Concrete</a>
            <a href="services.html">Stencil / Slate Concrete</a>
            <a href="services.html">Council Crossovers / Footpaths</a>
            <a href="services.html">Retaining Walls / Foundations</a>
            <a href="services.html">Resealing / Acid Washing</a>
            <a href="services.html">Bobcat Works / Site Levels</a>
          </div>
        </div>
        <a href="projects.html">Our Work</a>
        <a href="about.html">About Us</a>
        <a href="reviews.html">Reviews</a>
        <div class="nav-drop${resourcePages.includes(current) ? ' active' : ''}">
          <button type="button" aria-expanded="false">Resources <span>⌄</span></button>
          <div class="nav-drop-menu">
            <a href="resources.html">Resources</a>
            <a href="faq.html">FAQs</a>
            <a href="service-areas.html">Service Areas</a>
          </div>
        </div>
        <a href="contact.html">Contact</a>
      </nav>

      <div class="header-actions">
        <a class="mra-btn header-quote" href="contact.html">Get a free quote</a>
        <a class="header-phone" href="tel:+61432827436">
          <small>Call Amanda</small>
          <strong>0432 827 436</strong>
        </a>
      </div>

      <button class="menu" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>
    </header>`;

  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu');
  const directLinks = nav.querySelectorAll(':scope > a');

  directLinks.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  const closeAllDrops = except => {
    nav.querySelectorAll('.nav-drop.open').forEach(drop => {
      if (drop !== except) {
        drop.classList.remove('open');
        drop.querySelector('button')?.setAttribute('aria-expanded', 'false');
      }
    });
  };

  nav.querySelectorAll('.nav-drop > button').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const drop = button.closest('.nav-drop');
      const isOpen = drop.classList.toggle('open');
      closeAllDrops(drop);
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (!open) closeAllDrops();
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-drop')) closeAllDrops();
  });

  const header = document.querySelector('.site-header');
  const syncHeader = () => header.classList.toggle('scrolled', scrollY > 28);
  addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}

if (footerHost) {
  footerHost.innerHTML = `
    <footer class="site-footer mra-footer">
      <div class="mra-footer-inner">
        <div class="mra-footer-logo">
          <span class="brand-mark" aria-hidden="true"></span>
          <div>
            <strong>MRA</strong>
            <span>Concreting</span>
            <p>Built on Family. Built to Last.</p>
          </div>
        </div>

        <div>
          <h4>Services</h4>
          <a href="exposed-aggregate.html">Exposed Aggregate</a>
          <a href="services.html">Plain &amp; Coloured</a>
          <a href="services.html">Retaining Walls &amp; Slabs</a>
          <a href="services.html">Council Works</a>
          <a href="services.html">Cleaning &amp; Resealing</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="about.html">Our Story</a>
          <a href="projects.html">Our Work</a>
          <a href="reviews.html">Reviews</a>
          <a href="resources.html">Resources</a>
          <a href="contact.html">Contact Us</a>
        </div>

        <div>
          <h4>Service Areas</h4>
          <a href="service-areas.html">Melbourne &amp; Surrounds</a>
          <a href="service-areas.html">Western Suburbs</a>
          <a href="service-areas.html">Northern Suburbs</a>
          <a href="service-areas.html">South-Eastern Suburbs</a>
        </div>

        <div>
          <div class="mra-trust-badges">
            <div class="mra-trust-badge"><b>◇</b><span>Free Quotes</span></div>
            <div class="mra-trust-badge"><b>✓</b><span>Quality Workmanship</span></div>
            <div class="mra-trust-badge"><b>☂</b><span>Family Run</span></div>
          </div>
          <div class="mra-socials" aria-label="MRA social and contact links">
            <a href="https://maps.app.goo.gl/WyDg2VaBcSfiM9oi9?g_st=ic" target="_blank" rel="noopener" aria-label="Google">G</a>
            <a href="mailto:amanda@mraconcreting.com.au" aria-label="Email">@</a>
            <a href="tel:+61432827436" aria-label="Phone">☎</a>
          </div>
        </div>
      </div>

      <div class="mra-footer-bottom">
        <span>© <span id="year"></span> MRA Concreting. All Rights Reserved.</span>
        <span><a href="contact.html">Privacy</a><a href="contact.html">Terms &amp; Conditions</a></span>
      </div>
    </footer>`;

  document.getElementById('year').textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.09 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.filterable').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));
