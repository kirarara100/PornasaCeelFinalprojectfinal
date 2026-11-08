/*
  CEEL PORTFOLIO CONTENT
  Edit the arrays below to update the site's text, images, cards, and carousel.
  Images live in the images/ folder and use relative paths.
*/
const PROJECTS = [
  { title: 'Brew Haven', type: 'Brand + web concept', image: 'images/projects/brew-haven-landing.jpg', summary: 'A warm visual direction for a coffee concept, including landing-page and campaign artwork.' },
  { title: 'Road 56', type: 'Logo identity', image: 'images/projects/road-56-logo.png', summary: 'A bold badge-style identity exploration with a road-trip energy.' },
  { title: 'System interface study', type: 'Web system concept', image: 'images/projects/system-screenshot.png', summary: 'A first look at a digital system layout focused on clear information and simple navigation.' },
  { title: 'Logo idea', type: 'Graphic design', image: 'images/projects/logo-idea.jpg', summary: 'An early mark exploration from the visual identity process.' },
];

const CERTIFICATES = [
  { title: 'Certificate 01', image: 'images/certs/cert1.png' },
  { title: 'Certificate 02', image: 'images/certs/cert2.png' },
  { title: 'Certificate 03', image: 'images/certs/cert3.png' },
  { title: 'Certificate 04', image: 'images/certs/cert4.png' },
  { title: 'Certificate 05', image: 'images/certs/cert5.png' },
  { title: 'Certificate 06', image: 'images/certs/cert6.png' },
];

const SKILLS = [
  { number: '01', title: 'Prompting', text: 'Writing thoughtful instructions for AI tools, shaping ideas, and turning rough questions into useful first drafts.', tags: ['AI workflows', 'clear briefs', 'iteration'] },
  { number: '02', title: 'Web system coding', text: 'Building simple, responsive websites and systems with a focus on structure, usability, and easy maintenance.', tags: ['HTML / CSS / JS', 'responsive UI', 'information flow'] },
  { number: '03', title: 'Java developer', text: 'Learning to design practical Java programs with readable logic, reusable methods, and a problem-solving mindset.', tags: ['Java', 'OOP thinking', 'logic'] },
  { number: '04', title: 'System tester', text: 'Looking for the edge cases, unclear moments, and small details that make a system more dependable.', tags: ['test cases', 'debugging', 'quality mindset'] },
  { number: '05', title: 'Graphics designing', text: 'Exploring composition, layout, identity, and visual systems that help an idea communicate quickly.', tags: ['branding', 'layout', 'visual direction'] },
  { number: '06', title: 'Animation', text: 'Using movement, timing, and transitions to give digital experiences a little more life and personality.', tags: ['motion', 'timing', 'storytelling'] },
];

/*
  CONTACT
  Change your email here. The contact form builds an email in the visitor's own email app
  (this site has no server, so it cannot send messages by itself).
*/
const CONTACT_EMAIL = 'japornasa@ccc.edu.ph';

function buildMailto(name, email, subject, message) {
  const finalSubject = subject || `Portfolio message from ${name}`;
  const body = `${message}\n\n— ${name}\n${email}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
}

function setupContact() {
  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formStatus');
  const copyButton = document.querySelector('#copyEmail');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(CONTACT_EMAIL); copyButton.textContent = 'Copied ✓'; }
      catch (error) { copyButton.textContent = CONTACT_EMAIL; }
      setTimeout(() => { copyButton.textContent = 'Copy email'; }, 2200);
    });
  }
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const link = buildMailto(data.get('name').trim(), data.get('email').trim(), data.get('subject').trim(), data.get('message').trim());
    status.textContent = 'Opening your email app… if nothing opens, write to ' + CONTACT_EMAIL + ' directly.';
    window.location.href = link;
  });
}

/*
  DOWNLOADS
  Every link with a "download" attribute is handled here (cards, modal, CV, profile).
  1) It fetches the file and saves it (works online and with Live Server).
  2) If the browser blocks that (site opened straight from the folder, or images on another
     domain), it uses the copy stored in the downloads/ folder (see make-downloads.py).
  3) Only if both fail, the image opens in a new tab.
*/
function saveBlob(blob, name) {
  const blobUrl = URL.createObjectURL(blob);
  const temp = document.createElement('a');
  temp.href = blobUrl;
  temp.download = name;
  document.body.appendChild(temp);
  temp.click();
  temp.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/data:(.*?);/)[1];
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}

function loadEmbeddedFile(path) {
  return new Promise((resolve, reject) => {
    window.EMBEDDED_FILES = window.EMBEDDED_FILES || {};
    if (window.EMBEDDED_FILES[path]) return resolve(window.EMBEDDED_FILES[path]);
    const script = document.createElement('script');
    script.src = 'downloads/' + path.replace(/\//g, '__') + '.js';
    script.onload = () => (window.EMBEDDED_FILES[path] ? resolve(window.EMBEDDED_FILES[path]) : reject(new Error('missing')));
    script.onerror = () => reject(new Error('not found'));
    document.head.appendChild(script);
  });
}

function setupDownloads() {
  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[download]');
    if (!link || link.getAttribute('href') === '#' || link.href.startsWith('blob:')) return;
    event.preventDefault();
    const path = link.getAttribute('href').replace(/^\.?\//, '');
    const name = link.getAttribute('download') || decodeURIComponent(path.split('/').pop().split('?')[0]) || 'download';
    try {
      const response = await fetch(link.href);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return saveBlob(await response.blob(), name);
    } catch (error) { /* try the stored copy next */ }
    try {
      return saveBlob(dataUrlToBlob(await loadEmbeddedFile(path)), name);
    } catch (error) { /* last resort */ }
    window.open(link.href, '_blank', 'noopener');
  });
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function buildCarousel() {
  const track = document.querySelector('#featuredTrack');
  const dotsBox = document.querySelector('#carouselDots');
  const caption = document.querySelector('#carouselCaption');
  const count = document.querySelector('#carouselCount');
  const shell = document.querySelector('#featuredCarousel');
  if (!track || !dotsBox || !shell) return;
  const items = [
    ...PROJECTS.map((item) => ({ ...item, href: 'projects.html' })),
    ...CERTIFICATES.map((item) => ({ ...item, type: 'Certificate', summary: 'A learning milestone from the CEEL certificate collection.', href: 'certificates.html' })),
  ];
  let current = 0;
  let timer;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  track.innerHTML = items.map((item, index) => `<article class="carousel-slide" data-index="${index}"><a class="slide-view" href="${item.href}" aria-label="View ${item.title}"><div class="slide-image"><img src="${item.image}" alt="${item.title}" loading="${index === 0 ? 'eager' : 'lazy'}"></div><div class="slide-info"><p class="card-kicker">${item.type}</p><h3>${item.title}</h3><span class="slide-arrow">↗</span></div></a></article>`).join('');
  dotsBox.innerHTML = items.map((_, index) => `<button type="button" aria-label="Go to featured item ${index + 1}" data-index="${index}"></button>`).join('');
  const slides = [...track.querySelectorAll('.carousel-slide')];
  const dots = [...dotsBox.querySelectorAll('button')];
  const render = () => {
    slides.forEach((slide, index) => {
      const offset = (index - current + items.length) % items.length;
      slide.className = 'carousel-slide';
      if (offset === 0) slide.classList.add('is-active');
      if (offset === 1) slide.classList.add('is-next');
      if (offset === items.length - 1) slide.classList.add('is-prev');
    });
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === current));
    caption.textContent = `${items[current].title} · ${items[current].type}`;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };
  const go = (step) => { current = (current + step + items.length) % items.length; render(); restart(); };
  const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(1), 5000); };
  shell.querySelector('.carousel-next').addEventListener('click', () => go(1));
  shell.querySelector('.carousel-prev').addEventListener('click', () => go(-1));
  dots.forEach((dot) => dot.addEventListener('click', () => { current = Number(dot.dataset.index); render(); restart(); }));
  shell.addEventListener('mouseenter', () => clearInterval(timer));
  shell.addEventListener('mouseleave', restart);
  document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') go(1); if (event.key === 'ArrowLeft') go(-1); });
  render();
  restart();
};

function buildProjects() {
  const grid = document.querySelector('#projectGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((project, index) => `<article class="project-card ${index === 0 ? 'project-card-featured' : ''}"><div class="project-image"><img src="${project.image}" alt="${project.title}" loading="lazy"><span class="project-index">0${index + 1}</span><a class="image-download" href="${project.image}" download aria-label="Download ${project.title} image">Download image <b>↓</b></a></div><div class="project-card-copy"><p class="card-kicker">${project.type}</p><h2>${project.title}</h2><p>${project.summary}</p><a class="text-link project-link" href="${project.image}" target="_blank" rel="noreferrer">Open image <span>↗</span></a></div></article>`).join('');
}

function buildSkills() {
  const list = document.querySelector('#skillsList');
  if (!list) return;
  list.innerHTML = SKILLS.map((skill) => `<article class="skill-row"><span class="skill-number">${skill.number}</span><div class="skill-main"><h2>${skill.title}</h2><p>${skill.text}</p><div class="skill-tags">${skill.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div><span class="skill-symbol">↗</span></article>`).join('');
}

function buildCertificates() {
  const grid = document.querySelector('#certificateGrid');
  if (!grid) return;
  grid.innerHTML = CERTIFICATES.map((certificate, index) => `<article class="certificate-card"><button type="button" class="certificate-open" data-index="${index}" aria-label="View ${certificate.title}"><img src="${certificate.image}" alt="${certificate.title}" loading="lazy"><span>view <b>↗</b></span></button><a class="text-link certificate-download" href="${certificate.image}" download aria-label="Download ${certificate.title}">Download image <span>↓</span></a><div><p class="card-kicker">Learning milestone</p><h2>${certificate.title}</h2></div></article>`).join('');
  const modal = document.querySelector('#certificateModal');
  const image = document.querySelector('#modalImage');
  const title = document.querySelector('#modalTitle');
  const download = document.querySelector('#modalDownload');
  let lastTrigger = null;
  const close = () => { modal.hidden = true; document.body.classList.remove('modal-open'); if (lastTrigger) lastTrigger.focus(); };
  grid.addEventListener('click', (event) => {
    const button = event.target.closest('.certificate-open');
    if (!button) return;
    const certificate = CERTIFICATES[Number(button.dataset.index)];
    lastTrigger = button;
    image.src = certificate.image; image.alt = certificate.title; title.textContent = certificate.title; download.href = certificate.image;
    modal.hidden = false; document.body.classList.add('modal-open'); document.querySelector('#modalClose').focus();
  });
  document.querySelector('#modalClose').addEventListener('click', close);
  modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}

setupMenu();
setupDownloads();
setupContact();
buildCarousel();
buildProjects();
buildSkills();
buildCertificates();
