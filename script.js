/* ===== Project data (from CV) ===== */
const PROJECTS = [
  { title: "Evaristus Shikongo Piggery & Abattoir", year: "2021–2026", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Bulk supply upgrade, electrical services, CCTV, access control, fire detection, standby generators & synchronisation, with site supervision." },
  { title: "Kitai Abattoir & Feedlot", year: "2024–2026", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Design and project management of the abattoir — lighting, small power, and LV/MV reticulation." },
  { title: "Namibian Poultry Industry — EU Audit", year: "2024–2026", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Electrical audit and refurbishment of all equipment to meet EU export standards, with condition-based preventative maintenance." },
  { title: "Charcoal Factory — PLC Automation", year: "2025", cat: "automation", catLabel: "Automation", loc: "Namibia",
    desc: "Sequential function chart & PLC program (Delta WPLSoft) driving 15 VFDs across conveyors, plus full distribution-panel estimate and control-circuit design." },
  { title: "Husab Mine — Crusher Cubicle Dust Control", year: "2023–2024", cat: "automation", catLabel: "Automation", loc: "Namibia",
    desc: "Design of the control circuit for a pressurised cubicle HVAC system." },
  { title: "NamDeb On-Grid Solar PV", year: "2023", cat: "solar", catLabel: "Renewables", loc: "Oranjemund",
    desc: "Design and implementation of roof-mounted on-grid solar PV for both the main building and IT building." },
  { title: "Livestock Support Programme — Opuwo", year: "2021–2025", cat: "solar", catLabel: "Renewables", loc: "Namibia",
    desc: "Reticulation, lighting, small power and a 50 kWp grid-tied ground-mounted solar PV system for an existing abattoir." },
  { title: "Mycelium Demo Shed — Brakwater", year: "2023–2024", cat: "solar", catLabel: "Renewables", loc: "Namibia",
    desc: "Electrical services design & supervision including an 8 kWp on-grid solar PV system." },
  { title: "DebMarine Headquarters", year: "2023–2025", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "DigSILENT model design for the building's full electrical reticulation." },
  { title: "GIPF Headquarters — CCTV & Access Control", year: "2023–2024", cat: "security", catLabel: "Security & Safety", loc: "Namibia",
    desc: "Design, implementation and construction supervision of a replacement CCTV and access-control system." },
  { title: "One Economy — Be-Free Youth Centre", year: "2024–2025", cat: "security", catLabel: "Security & Safety", loc: "Namibia",
    desc: "Full electrical scope for a skills centre: lighting, small power, LV reticulation, CCTV, access control, fire detection, intrusion & lightning protection." },
  { title: "Rundu Agribank Implementation Plan", year: "2021–2023", cat: "security", catLabel: "Security & Safety", loc: "Rundu",
    desc: "Bulk supply upgrade, electrical services, CCTV, access control and fire detection for an existing building." },
  { title: "Rehoboth Abattoir", year: "2022–2025", cat: "design", catLabel: "Electrical Design", loc: "Rehoboth",
    desc: "Design and implementation of electrical equipment for the slaughtering and packaging floor." },
  { title: "Feedlots — Etunda", year: "2022–2024", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Preliminary designs and low-voltage electrical design work under registered professional supervision." },
  { title: "Bank Windhoek — Hofmeyer St (3rd Floor)", year: "2023–2024", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Small-power design, documentation and construction supervision of lighting, small power and fire-detection services." },
  { title: "Finkenstein Estate Generator", year: "2023", cat: "design", catLabel: "Electrical Design", loc: "Namibia",
    desc: "Sizing of a peak-shaving generator." },
];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  PROJECTS.filter(p => filter === "all" || p.cat === filter).forEach(p => {
    const el = document.createElement("article");
    el.className = "project reveal";
    el.innerHTML = `
      <div class="project-top">
        <span class="project-tag">${p.catLabel}</span>
        <span class="project-year">${p.year}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <span class="loc">📍 ${p.loc}</span>`;
    grid.appendChild(el);
  });
  observeReveals();
}

/* ===== Filters ===== */
document.getElementById("filterBar").addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
  btn.classList.add("active");
  renderProjects(btn.dataset.filter);
});

/* ===== Theme toggle ===== */
const themeToggle = document.getElementById("themeToggle");
const stored = localStorage.getItem("theme");
if (stored) document.documentElement.setAttribute("data-theme", stored);
themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ===== Mobile menu ===== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* ===== Navbar scroll state + progress + active link ===== */
const nav = document.getElementById("nav");
const progress = document.getElementById("scrollProgress");
const sections = [...document.querySelectorAll("section[id]")];
const linkMap = new Map([...document.querySelectorAll(".nav-links a")].map(a => [a.getAttribute("href").slice(1), a]));

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 8);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";

  let current = "";
  for (const s of sections) {
    if (y >= s.offsetTop - 120) current = s.id;
  }
  linkMap.forEach((a, id) => a.classList.toggle("active", id === current));
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ===== Reveal on scroll ===== */
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
}

/* ===== Animated stat counters ===== */
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target) + (t === 1 && target >= 10 ? "+" : "");
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
const heroStats = document.querySelector(".hero-stats");
const statsObserver = new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
}, { threshold: 0.4 });
if (heroStats) statsObserver.observe(heroStats);

/* ===== Lightbox gallery ===== */
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = (i + galleryItems.length) % galleryItems.length;
  const btn = galleryItems[lbIndex];
  const img = btn.querySelector("img");
  lbImg.src = btn.dataset.src;
  lbImg.alt = img ? img.alt : "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
galleryItems.forEach((btn, i) => btn.addEventListener("click", () => openLightbox(i)));
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => openLightbox(lbIndex - 1));
document.getElementById("lbNext").addEventListener("click", () => openLightbox(lbIndex + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  else if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
});

/* ===== Init ===== */
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".section, .hero-stats .stat, .tl-item").forEach(el => el.classList.add("reveal"));
renderProjects();
observeReveals();
onScroll();
