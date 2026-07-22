/* ═══════════════════════════════════════════════════════
HASNAE AHOUZI — PORTFOLIO SCRIPT
═══════════════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY  = 'bTjIQe2j9_B3CiHld';
const EMAILJS_SERVICE_ID  = 'service_3nqr84f';
const EMAILJS_TEMPLATE_ID = 'template_mwyd959';
const STORAGE_KEY = 'hasnae_portfolio_projects';
const CERT_STORAGE_KEY = 'hasnae_portfolio_certificates';
/* Inline SVG (no extra HTTP request) used when a certificate image 404s,
   so visitors never see the browser's broken-image icon. */
const CERT_PLACEHOLDER_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">' +
  '<rect width="400" height="280" fill="#11151f"/>' +
  '<text x="50%" y="50%" fill="#5a6270" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">Certificate image unavailable</text>' +
  '</svg>'
);

/* ── PROJECTS DATA ─── */
const DEFAULT_PROJECTS = [
  {
    id: 'trash-detector-robot',
    title: 'Trash Detector Robot',
    subtitle: 'YOLOv8 Real-time Waste Detection',
    description: 'Intelligent trash detection system trained on the TACO dataset, reduced and categorized into 5 waste classes. Supports real-time webcam detection for autonomous robot integration.',
    category: 'computer-vision',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'Ultralytics', 'TACO Dataset'],
    github: 'https://github.com/hasnae21/Trash-detector-Robot',
    demo: null, image: null, icon: '🤖',
    featured: true, date: '2024', status: 'completed'
  },
  {
    id: 'ros2-cafe-robot',
    title: 'ROS2 Café Service Robot',
    subtitle: 'Autonomous Indoor Delivery Robot',
    description: 'Full ROS2 Humble stack for an autonomous mobile robot designed for café/restaurant environments. Features Nav2 autonomous navigation, SLAM Toolbox for mapping, and Gazebo simulation.',
    category: 'robotics',
    tags: ['ROS2', 'Nav2', 'SLAM', 'Python', 'Gazebo', 'URDF'],
    github: 'https://github.com/hasnae21/ros2-cafe-service-robot',
    demo: null, image: null, icon: '☕',
    featured: true, date: '2025', status: 'in-progress'
  },
  {
    id: 'serbai-mobile-app',
    title: 'SerbAI Mobile App',
    subtitle: 'Android Interface for Delivery Robot',
    description: 'Android command & supervision interface for an autonomous line-following restaurant delivery robot. Features Auto/Manual/Stop modes, Bluetooth SPP control, 3 speed levels, and real-time event logging.',
    category: 'mobile',
    tags: ['Android', 'Java', 'Kotlin', 'Bluetooth SPP', 'HC-05'],
    github: 'https://github.com/hasnae21/SerbAI_mobile_application',
    demo: null, image: null, icon: '📱',
    featured: true, date: '2025', status: 'completed'
  },
  {
    id: 'skinaid-web-app',
    title: 'SkinAid Web App',
    subtitle: 'AI-Based Skin Disease Detection',
    description: 'Web application using deep learning and image processing to detect and classify skin diseases from user-uploaded photos. Trained on Google Colab with Python and Jupyter.',
    category: 'ai-ml',
    tags: ['Python', 'Deep Learning', 'OpenCV', 'Jupyter', 'Google Colab'],
    github: null, demo: null, image: null, icon: '',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'hack-ai-morocco',
    title: 'Hack AI Morocco',
    subtitle: 'Event Platform — 4-Day AI Hackathon',
    description: 'Dynamic web platform for "Hack AI Morocco", a 4-day hackathon bringing AI students across Morocco together for intensive challenges. Built with Astro, Tailwind CSS, and TypeScript.',
    category: 'web',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'GitHub Actions'],
    github: 'https://github.com/hasnae21/Potfolio_Hackathon',
    demo: null, image: null, icon: '🏆',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'projet7-laravel-react',
    title: 'Laravel + React App',
    subtitle: 'Full-Stack API Integration',
    description: 'Full-stack application connecting a Laravel REST API backend with a React.js frontend. Implements CRUD operations, Blade templates, and demonstrates modern API consumption patterns.',
    category: 'web',
    tags: ['Laravel', 'React.js', 'PHP', 'MySQL', 'REST API'],
    github: 'https://github.com/hasnae21/Projet_7',
    demo: null, image: null, icon: '🌐',
    featured: false, date: '2023', status: 'completed'
  },
  {
    id: 'free-fall-detection',
    title: 'Free-Fall Detection System',
    subtitle: 'Model-Based Design in Simulink',
    description: 'Real-time free-fall detection logic in MATLAB/Simulink following Model-Based Design methodology (MIL/SIL testing) with accelerometer signal processing and threshold logic.',
    category: 'embedded',
    tags: ['MATLAB', 'Simulink', 'Model-Based Design', 'MIL/SIL'],
    github: null, demo: null, image: null, icon: '📡',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'fir-filter-fpga',
    title: 'FIR Filter on FPGA',
    subtitle: 'VHDL Implementation on Cyclone V',
    description: 'Digital FIR filter implemented in VHDL for Altera Cyclone V FPGA. Designed, synthesized, and verified with Quartus Prime and ModelSim simulation environments.',
    category: 'embedded',
    tags: ['VHDL', 'FPGA', 'Cyclone V', 'Quartus', 'ModelSim'],
    github: null, demo: null, image: null, icon: '⚡',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'secure-locking-system',
    title: 'Secure Locking System',
    subtitle: 'PIC16F877A + RFID Embedded Design',
    description: 'Smart security locking system using PIC16F877A with RFID authentication, keypad input, and LCD display. Programmed in MicroC and fully simulated in Proteus 8.',
    category: 'embedded',
    tags: ['PIC16F877A', 'RFID', 'MicroC', 'Proteus 8', 'LCD'],
    github: null, demo: null, image: null, icon: '',
    featured: false, date: '2023', status: 'completed'
  }
];

const CATEGORY_LABELS = {
  'computer-vision': 'Computer Vision',
  'ai-ml': 'AI & ML',
  'embedded': 'Embedded',
  'web': 'Web Dev',
  'mobile': 'Mobile',
  'robotics': 'Robotics',
  'other': 'Other'
};

/* ─── Storage ─── */
function getProjects() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : DEFAULT_PROJECTS;
  } catch { return DEFAULT_PROJECTS; }
}

function saveProjects(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

/* ─── CERTIFICATES ─── */
/* Bumped whenever DEFAULT_CERTIFICATES changes below, so a browser holding
   an older cached copy in localStorage auto-refreshes instead of silently
   keeping stale (and possibly broken) data forever. */
const CERT_DATA_VERSION = 2;

const DEFAULT_CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'Les fondamentaux de l\'UX DESIGN',
    issuer: 'OPENCLASSROOMS',
    date: '29/11/2022',
    category: 'certification',
    image: 'assets/img/certificates/certif5.jpg',
    url: null
  },
  {
    id: 'cert-2',
    title: 'Certificate of Appreciation — "How to Be The Best Version of Yourself"',
    issuer: 'Climatic Peace Foundation (Head of Morocco OC)',
    date: '19 Feb 2025',
    category: 'certification',
    image: 'assets/img/certificates/certif4.jpg',
    url: null
  },
  {
    id: 'cert-3',
    title: 'SOLIHACKATHON — Coding Competition Participation',
    issuer: 'SOLICODE Tanger — OFPPT & Simplon',
    date: '2022',
    category: 'competition',
    image: 'assets/img/competitions/comp1.jpeg',
    url: null
  },
  {
    id: 'cert-4',
    title: 'SOLI HACKATHON — Certificat de Participation (2ème Edition)',
    issuer: 'SOLICODE Tanger — OFPPT & Simplon',
    date: '15 Juin 2023',
    category: 'competition',
    image: 'assets/img/competitions/comp0.jpeg',
    url: null
  },
  {
    id: 'cert-5',
    title: 'Certificate of Achievement — Développeur Mobile',
    issuer: 'Simplon.co — Centre Solidaire Digital SoliCode, Tanger',
    date: '04/09/2023',
    category: 'training',
    image: 'assets/img/certificates/certif3.jpeg',
    url: null
  },
  {
    id: 'cert-6',
    title: 'Certificat de Formation Qualifiante — Développeur Web',
    issuer: 'OFPPT — Institut Spécialisé de Technologie Appliquée NTIC, Tanger',
    date: 'Juin 2022',
    category: 'certification',
    image: 'assets/img/certificates/certif0.jpeg',
    url: null
  },
  {
    id: 'cert-7',
    title: 'Certificate of Achievement — Développeur Web',
    issuer: 'Simplon.co — Centre Solidaire Digital SoliCode, Tanger',
    date: '12/09/2022',
    category: 'training',
    image: 'assets/img/certificates/certif2.jpeg',
    url: null
  },
  {
    id: 'cert-8',
    title: 'Certificat de Formation Qualifiante — Développeur Mobile',
    issuer: 'OFPPT — Office de la Formation Professionnelle et de la Promotion du Travail',
    date: 'Juillet 2023',
    category: 'certification',
    image: 'assets/img/certificates/certif1.jpeg',
    url: null
  }
];

function getCertificates() {
  try {
    const raw = localStorage.getItem(CERT_STORAGE_KEY);
    if (!raw) return DEFAULT_CERTIFICATES;
    const parsed = JSON.parse(raw);
    // Old plain-array format or an outdated version → discard and re-seed
    // instead of keeping visitors stuck on a stale/broken cached copy.
    if (Array.isArray(parsed) || !parsed.version || parsed.version !== CERT_DATA_VERSION) {
      localStorage.removeItem(CERT_STORAGE_KEY);
      return DEFAULT_CERTIFICATES;
    }
    return parsed.data;
  } catch { return DEFAULT_CERTIFICATES; }
}

function saveCertificates(c) {
  localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify({ version: CERT_DATA_VERSION, data: c }));
}

/* ── Render projects ─── */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  const projects = getProjects();
  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted)"><i class="fas fa-folder-open" style="font-size:2rem;display:block;margin-bottom:12px"></i>No projects in this category yet.</div>`;
    return;
  }
  
  grid.innerHTML = list.map(p => `
    <div class="project-card" data-category="${p.category}" data-id="${p.id}" data-aos="fade-up">
      <div class="project-image">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" onerror="this.style.display='none'">` : ''}
        <div class="project-icon" ${p.image ? 'style="display:none"' : ''}>${p.icon || '📁'}</div>
        ${p.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
        <div class="project-overlay">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="overlay-btn" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="overlay-btn" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
        </div>
      </div>
      <div class="project-body">
        <div class="project-category-badge ${p.category}">${CATEGORY_LABELS[p.category] || p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-subtitle">${p.subtitle}</p>
        <p class="project-description">${p.description}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-footer">
          <span class="project-date"><i class="fas fa-calendar-alt"></i> ${p.date}</span>
          <span class="project-status ${p.status}">${p.status.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  `).join('');
  
  if (typeof AOS !== 'undefined') AOS.refresh();
}

/* ─── Render Certificates ─── */
function renderCertificates() {
  const grid = document.getElementById('certificates-grid');
  if (!grid) return;
  
  const certs = getCertificates();
  
  if (certs.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted)"><i class="fas fa-certificate" style="font-size:2.5rem;display:block;margin-bottom:12px;opacity:0.4"></i><p>No certificates yet</p></div>`;
    return;
  }
  
  grid.innerHTML = certs.map(cert => `
    <div class="certificate-card" data-aos="fade-up" onclick="openCertificateModal('${cert.image}', '${cert.title}')">
      <img src="${cert.image}" alt="${cert.title}" class="certificate-image" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${CERT_PLACEHOLDER_SVG}'">
      <div class="certificate-body">
        <span class="certificate-category ${cert.category}">${cert.category}</span>
        <h3 class="certificate-title">${cert.title}</h3>
        <p class="certificate-issuer">${cert.issuer}</p>
        <p class="certificate-date">
          <i class="fas fa-calendar-alt"></i> ${cert.date}
        </p>
      </div>
    </div>
  `).join('');
}

/* ─── Certificate Modal ── */
function openCertificateModal(image, title) {
  let modal = document.getElementById('certificate-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'certificate-modal';
    modal.className = 'certificate-modal';
    modal.innerHTML = `
      <span class="certificate-modal-close" onclick="closeCertificateModal()">&times;</span>
      <img src="" alt="Certificate">
    `;
    document.body.appendChild(modal);
  }
  
  modal.querySelector('img').src = image;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertificateModal();
});

/* ─── Typing animation ─── */
const ROLES = [
  'Robotics & Cobotics Engineer',
  'AI & Computer Vision Developer',
  'Full-Stack Web Developer',
  'Android App Developer',
  'ROS2 & Embedded Engineer'
];

let rIdx = 0, cIdx = 0, del = false;

function typeAnim() {
  const el = document.getElementById('typed');
  if (!el) return;
  const role = ROLES[rIdx];
  el.textContent = del ? role.slice(0, --cIdx) : role.slice(0, ++cIdx);
  let d = del ? 40 : 85;
  if (!del && cIdx === role.length) { d = 2400; del = true; }
  else if (del && cIdx === 0) { del = false; rIdx = (rIdx + 1) % ROLES.length; d = 400; }
  setTimeout(typeAnim, d);
}

/* ─── Counter animation ─── */
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();
    const update = now => {
      const p = Math.min((now - start) / 1800, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(update); else el.textContent = target;
    };
    requestAnimationFrame(update);
  });
}

/* ─── Language bars ─── */
function animateLangBars() {
  document.querySelectorAll('.lang-fill').forEach(b => { b.style.width = (b.dataset.width || 0) + '%'; });
}

/* ─── Intersection observers ─── */
function setupObservers() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.classList.contains('about-side')) animateLangBars();
      if (e.target.classList.contains('hero-stats'))  animateCounters();
      io.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  
  const lang = document.querySelector('.about-side');
  const stats = document.querySelector('.hero-stats');
  if (lang) io.observe(lang);
  if (stats) io.observe(stats);
}

/* ─── Navbar ─── */
function setupNavbar() {
  const nav = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 20);
    const prog = document.getElementById('scroll-progress');
    if (prog) { const max = document.documentElement.scrollHeight - innerHeight; prog.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%'; }
    
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', scrollY > 400);
  }, { passive: true });
}

/* ─── Mobile menu ─── */
function setupMenu() {
  const t = document.getElementById('menu-toggle');
  const l = document.getElementById('nav-links');
  if (!t || !l) return;
  
  t.addEventListener('click', () => { const o = l.classList.toggle('open'); t.classList.toggle('open', o); });
  l.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => { l.classList.remove('open'); t.classList.remove('open'); }));
}

/* ─── Filters ─── */
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

/* ─── Contact form (EmailJS) ─── */
function setupContact() {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
  
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;
  
  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();
    
    const fields = [
      { id: 'from_name', msg: 'Name is required.' },
      { id: 'reply_to',  msg: 'Valid email required.', isEmail: true },
      { id: 'message',   msg: 'Message is required.' }
    ];
    
    let valid = true;
    fields.forEach(f => {
      const el = form.querySelector('#' + f.id);
      const val = el?.value.trim();
      if (!val || (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
        el?.classList.add('error');
        const err = el?.nextElementSibling;
        if (err?.classList.contains('form-error')) err.textContent = f.msg;
        valid = false;
      }
    });
    
    if (!valid) return;
    
    const btn = document.getElementById('submit-btn');
    const txt = btn.querySelector('.btn-text'), ld = btn.querySelector('.btn-loading');
    txt.style.display = 'none'; ld.style.display = 'inline-flex'; btn.disabled = true;
    
    if (status) status.innerHTML = '';
    
    if (EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
      await new Promise(r => setTimeout(r, 600));
      if (status) status.innerHTML = `<div class="status-error"><i class="fas fa-info-circle"></i> EmailJS not configured yet. Email me directly: <a href="mailto:ahouzihasnae@gmail.com" style="color:inherit;text-decoration:underline">ahouzihasnae@gmail.com</a></div>`;
    } else {
      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        if (status) status.innerHTML = `<div class="status-success"><i class="fas fa-check-circle"></i> Message sent! I'll get back to you within 24 hours </div>`;
        form.reset();
      } catch {
        if (status) status.innerHTML = `<div class="status-error"><i class="fas fa-exclamation-circle"></i> Failed to send. Please email me at ahouzihasnae@gmail.com</div>`;
      }
    }
    
    txt.style.display = 'inline-flex'; ld.style.display = 'none'; btn.disabled = false;
  });
  
  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  }
}

/* ─── Admin trigger (triple-click the · in footer) ─── */
function setupAdminTrigger() {
  let clicks = 0, t;
  document.getElementById('admin-trigger')?.addEventListener('click', () => {
    clicks++; clearTimeout(t);
    t = setTimeout(() => { clicks = 0; }, 600);
    if (clicks >= 3) { clicks = 0; location.href = 'admin.html'; }
  });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 1600);
  AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  
  setupNavbar();
  setupMenu();
  setupFilters();
  setupContact();
  setupAdminTrigger();
  setupObservers();
  
  typeAnim();
  renderProjects();
  renderCertificates();
  
  document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Animate visual stats
  setTimeout(() => {
    document.querySelectorAll('.v-stat-number').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 50);
    });
  }, 1000);
});