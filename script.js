/* Campus Nook scripts. Beginner-friendly notes inside. */
// 1) ARTICLE LIST: add new articles here (see the README steps).
const ARTICLES = [
  {
    "title": "Best Laptop Accessories for College Students",
    "url": "best-laptop-accessories-for-college-students.html",
    "cat": "Laptop Accessories",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Laptop Stands for Students",
    "url": "best-laptop-stands-for-students.html",
    "cat": "Laptop Accessories",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Desk Accessories for Small Dorm Rooms",
    "url": "best-desk-accessories-for-small-dorm-rooms.html",
    "cat": "Desk Setup",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best USB Hubs for College Students",
    "url": "best-usb-hubs-for-college-students.html",
    "cat": "Laptop Accessories",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Desk Lamps for Studying",
    "url": "best-desk-lamps-for-studying.html",
    "cat": "Study Products",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Budget Keyboards for Students",
    "url": "best-budget-keyboards-for-students.html",
    "cat": "Desk Setup",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Mice for Home Study",
    "url": "best-mice-for-home-study.html",
    "cat": "Home Office",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Dorm Room Storage Products",
    "url": "best-dorm-room-storage-products.html",
    "cat": "Dorm Essentials",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Backpacks for College Students",
    "url": "best-backpacks-for-college-students.html",
    "cat": "Study Products",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "Best Home Office Accessories",
    "url": "best-home-office-accessories.html",
    "cat": "Home Office",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "How to Build a Small Study Desk Setup",
    "url": "how-to-build-a-small-study-desk-setup.html",
    "cat": "Desk Setup",
    "desc": "Placeholder summary: add a short, original description of this guide."
  },
  {
    "title": "College Dorm Essentials Checklist",
    "url": "college-dorm-essentials-checklist.html",
    "cat": "Dorm Essentials",
    "desc": "Placeholder summary: add a short, original description of this guide."
  }
];

// 2) Mobile menu toggle
const btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
if (btn) btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
const yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();

// 3) Draw article cards
function cardHTML(a) {
  return `<article class="card"><div class="ph" role="img" aria-label="Placeholder image for ${a.title}">Image</div>
  <p class="tag">${a.cat}</p><h3><a href="${a.url}">${a.title}</a></h3><p>${a.desc}</p></article>`;
}
function draw(id, list) { const el = document.getElementById(id); if (el) el.innerHTML = list.map(cardHTML).join(''); }
draw('featured-grid', ARTICLES.slice(0, 3));
draw('latest-grid', ARTICLES.slice(-3));

// 4) Search + category filters (runs only on pages with the grid)
const grid = document.getElementById('article-grid');
if (grid) {
  const params = new URLSearchParams(location.search);
  let cat = params.get('cat') || 'All', q = params.get('q') || '';
  const box = document.getElementById('s'); if (box) box.value = q;
  const chips = document.querySelectorAll('.chip');
  function render() {
    const list = ARTICLES.filter(a => (cat === 'All' || a.cat === cat) &&
      a.title.toLowerCase().includes(q.toLowerCase()));
    draw('article-grid', list);
    document.getElementById('no-results').hidden = list.length > 0;
    chips.forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  }
  chips.forEach(c => c.addEventListener('click', () => { cat = c.dataset.cat; render(); }));
  if (box) box.addEventListener('input', e => { q = e.target.value; render(); });
  render();
}
