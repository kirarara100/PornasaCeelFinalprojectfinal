/* =========================================================
   1. HOME: carousel
   ========================================================= */
function initCarousel() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;                       // not on this page

  const slides  = [...carousel.querySelectorAll('.slide')];
  const dotsBox = document.getElementById('carouselDots');
  const total   = slides.length;
  let current   = 0;
  let timer;

  // one dot per slide
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsBox.appendChild(dot);
    return dot;
  });

  // give each slide a role: active (center), prev (left), next (right)
  function render() {
    slides.forEach((slide, i) => {
      const offset = (i - current + total) % total;
      slide.classList.toggle('active', offset === 0);
      slide.classList.toggle('next',   offset === 1);
      slide.classList.toggle('prev',   offset === total - 1);
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  const goTo = i => { current = (i + total) % total; render(); };
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // controls
  carousel.querySelector('.carousel-btn.next').addEventListener('click', () => { next(); restart(); });
  carousel.querySelector('.carousel-btn.prev').addEventListener('click', () => { prev(); restart(); });
  slides.forEach(slide => slide.addEventListener('click', () => {
    if (slide.classList.contains('next')) next();
    if (slide.classList.contains('prev')) prev();
    restart();
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft')  { prev(); restart(); }
  });

  // autoplay (pauses while the mouse is over the carousel)
  const start   = () => { timer = setInterval(next, 4000); };
  const restart = () => { clearInterval(timer); start(); };
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', start);

  render();
  start();
}

/* =========================================================
   2. CERTIFICATES: grid + view modal
   ========================================================= */
// Replace the src values with your own certificate images.
const certificates = [
  { title: 'Certificate 1', src: 'cert1.png' },
  { title: 'Certificate 2', src: 'cert2.png' },
  { title: 'Certificate 3', src: 'cert3.png' },
  { title: 'Certificate 4', src: 'cert4.png' },
  { title: 'Certificate 5', src: 'cert5.png' },
  { title: 'Certificate 6', src: 'cert6.png' },
];

function initCertificates() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;                           // not on this page

  const modal     = document.getElementById('certModal');
  const modalImg  = document.getElementById('modalImg');
  const modalDown = document.getElementById('modalDownload');

  // build the cards
  grid.innerHTML = certificates.map((c, i) => `
    <article class="cert-card">
      <img src="${c.src}" alt="${c.title}">
      <div class="cert-actions">
        <a class="btn btn-download" href="${c.src}" download>download</a>
        <button class="btn btn-view" data-index="${i}">view</button>
      </div>
    </article>`).join('');

  // open the modal
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-view');
    if (!btn) return;
    const cert = certificates[btn.dataset.index];
    modalImg.src  = cert.src;
    modalImg.alt  = cert.title;
    modalDown.href = cert.src;
    modal.hidden  = false;
  });

  // close the modal: X button, click outside the box, or Esc key
  const close = () => { modal.hidden = true; };
  document.getElementById('modalClose').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

initCarousel();
initCertificates();
