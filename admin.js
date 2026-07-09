/* ═══════════════════════════════════════════════════════
   ADMIN PANEL — Portfolio Manager
   Password stored in localStorage as a simple hash.
   Default password: hasnae2024
   Change it via the "Change Password" option once logged in.
═══════════════════════════════════════════════════════ */

const STORAGE_KEY  = 'hasnae_portfolio_projects';
const SESSION_KEY  = 'hasnae_admin_session';
const PASS_KEY     = 'hasnae_admin_password';
const DEFAULT_PASS = 'hasnae2026';  // ← change after first login

/* ─── Simple hash  ─── */
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h.toString(36);
}

/* ─── Session helpers ─── */
function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
function setAuthenticated() {
  sessionStorage.setItem(SESSION_KEY, 'true');
}
function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/* ─── Projects CRUD ─── */
const DEFAULT_PROJECTS = [
  {
    id: 'trash-detector-robot',
    title: 'Trash Detector Robot',
    subtitle: 'Real-time Waste Detection & Classification',
    description: 'YOLOv8-based intelligent trash detection system trained on the TACO dataset, reduced to 5 waste categories. Features real-time webcam detection for autonomous robot integration.',
    category: 'computer-vision',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'Deep Learning', 'TACO Dataset', 'Ultralytics'],
    github: 'YOUR_GITHUB_URL/Trash-detector-Robot',
    demo: null, image: null, icon: '🤖',
    featured: true, date: '2024', status: 'completed'
  },
  {
    id: 'skinaid-web-app',
    title: 'SkinAid Web App',
    subtitle: 'AI-Based Skin Disease Detection',
    description: 'Web application using Deep Learning and image processing to detect and classify skin diseases from user-uploaded images. Built with Python and trained on Google Colab.',
    category: 'ai-ml',
    tags: ['Python', 'Deep Learning', 'OpenCV', 'Jupyter', 'Google Colab'],
    github: null, demo: null, image: null, icon: '🩺',
    featured: true, date: '2024', status: 'completed'
  },
  {
    id: 'free-fall-detection',
    title: 'Free-Fall Detection System',
    subtitle: 'Model-Based Design in Simulink',
    description: 'Real-time free-fall detection system developed in MATLAB/Simulink following MBD methodology (MIL/SIL testing) with accelerometer signal processing.',
    category: 'embedded',
    tags: ['MATLAB', 'Simulink', 'Model-Based Design', 'MIL/SIL', 'Signal Processing'],
    github: null, demo: null, image: null, icon: '📡',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'fir-filter-fpga',
    title: 'FIR Filter on FPGA',
    subtitle: 'VHDL Implementation on Cyclone V',
    description: 'Digital FIR filter implemented in VHDL for Altera Cyclone V FPGA. Designed, synthesized and verified using Quartus Prime and ModelSim simulation.',
    category: 'embedded',
    tags: ['VHDL', 'FPGA', 'Cyclone V', 'Quartus', 'ModelSim', 'DSP'],
    github: null, demo: null, image: null, icon: '⚡',
    featured: false, date: '2024', status: 'completed'
  },
  {
    id: 'secure-locking-system',
    title: 'Secure Locking System',
    subtitle: 'Embedded Design with PIC Microcontroller',
    description: 'Smart security locking system using PIC16F877A with RFID authentication, keypad input, and LCD feedback. Programmed in MicroC and simulated in Proteus 8.',
    category: 'embedded',
    tags: ['PIC16F877A', 'RFID', 'MicroC', 'Proteus 8', 'LCD'],
    github: null, demo: null, image: null, icon: '🔐',
    featured: false, date: '2023', status: 'completed'
  }
];

function getProjects() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : DEFAULT_PROJECTS;
  } catch { return DEFAULT_PROJECTS; }
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  renderTable();
  updateStats();
}

function generateId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
}

/* ─── Auth ─── */
function getStoredHash() {
  return localStorage.getItem(PASS_KEY) || simpleHash(DEFAULT_PASS);
}

function checkPassword(pw) {
  return simpleHash(pw) === getStoredHash();
}

function setupLockScreen() {
  const lockScreen = document.getElementById('lock-screen');
  const adminApp   = document.getElementById('admin-app');

  if (isAuthenticated()) {
    lockScreen.style.display = 'none';
    adminApp.style.display = 'block';
    return;
  }

  const form   = document.getElementById('login-form');
  const input  = document.getElementById('lock-password');
  const errEl  = document.getElementById('lock-error');
  const toggleBtn = document.getElementById('toggle-pw');

  toggleBtn.addEventListener('click', () => {
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    toggleBtn.querySelector('i').className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const pw = input.value;
    if (!pw) { errEl.textContent = 'Please enter your password.'; return; }
    if (checkPassword(pw)) {
      setAuthenticated();
      lockScreen.style.display = 'none';
      adminApp.style.display = 'block';
      errEl.textContent = '';
      input.value = '';
    } else {
      errEl.textContent = 'Incorrect password. Try again.';
      input.value = '';
      input.focus();
    }
  });
}

/* ─── Stats ─── */
function updateStats() {
  const projects = getProjects();
  document.getElementById('stat-total').textContent     = projects.length;
  document.getElementById('stat-featured').textContent  = projects.filter(p => p.featured).length;
  document.getElementById('stat-completed').textContent = projects.filter(p => p.status === 'completed').length;
  document.getElementById('stat-categories').textContent = new Set(projects.map(p => p.category)).size;
}

/* ─── Table render ─── */
const CAT_LABELS = {
  'computer-vision': 'Computer Vision',
  'ai-ml': 'AI & ML',
  'embedded': 'Embedded',
  'web': 'Web Dev',
  'robotics': 'Robotics',
  'other': 'Other'
};

let currentSearch = '';
let currentCat    = 'all';

function renderTable() {
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');
  const projects = getProjects();

  const filtered = projects.filter(p => {
    const matchCat    = currentCat === 'all' || p.category === currentCat;
    const matchSearch = !currentSearch ||
      p.title.toLowerCase().includes(currentSearch) ||
      p.subtitle.toLowerCase().includes(currentSearch) ||
      (p.tags || []).some(t => t.toLowerCase().includes(currentSearch));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    document.getElementById('projects-table').style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  document.getElementById('projects-table').style.display = 'table';

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td class="row-icon">${p.icon || '📁'}</td>
      <td>
        <div class="row-title">${escHtml(p.title)}</div>
        <div class="row-subtitle">${escHtml(p.subtitle)}</div>
      </td>
      <td>
        <span class="cat-badge ${p.category}">${CAT_LABELS[p.category] || p.category}</span>
      </td>
      <td>
        <div class="row-tags">
          ${(p.tags || []).slice(0, 4).map(t => `<span>${escHtml(t)}</span>`).join('')}
          ${(p.tags || []).length > 4 ? `<span>+${p.tags.length - 4}</span>` : ''}
        </div>
      </td>
      <td>${escHtml(p.date || '|')}</td>
      <td><span class="status-pill ${p.status || ''}">${(p.status || '').replace('-', ' ')}</span></td>
      <td class="featured-star">${p.featured ? '⭐' : ' - '}</td>
      <td>
        <div class="row-actions">
          <button class="btn-edit" onclick="openEdit('${p.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-del" onclick="openDelete('${p.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── Modal: Add / Edit ─── */
let editingId = null;

function openAdd() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Add Project';
  document.getElementById('project-form').reset();
  document.getElementById('f-id').value = '';
  document.getElementById('f-status').value = 'completed';
  document.getElementById('modal-error').style.display = 'none';
  showModal('project-modal');
}

function openEdit(id) {
  const project = getProjects().find(p => p.id === id);
  if (!project) return;
  editingId = id;

  document.getElementById('modal-title').textContent = 'Edit Project';
  document.getElementById('f-id').value          = project.id;
  document.getElementById('f-title').value       = project.title || '';
  document.getElementById('f-subtitle').value    = project.subtitle || '';
  document.getElementById('f-description').value = project.description || '';
  document.getElementById('f-tags').value        = (project.tags || []).join(', ');
  document.getElementById('f-category').value    = project.category || '';
  document.getElementById('f-date').value        = project.date || '';
  document.getElementById('f-icon').value        = project.icon || '';
  document.getElementById('f-image').value       = project.image || '';
  document.getElementById('f-github').value      = project.github || '';
  document.getElementById('f-demo').value        = project.demo || '';
  document.getElementById('f-status').value      = project.status || 'completed';
  document.getElementById('f-featured').checked  = !!project.featured;
  document.getElementById('modal-error').style.display = 'none';

  showModal('project-modal');
}

function saveProject(e) {
  e.preventDefault();
  clearFormErrors();

  const title       = document.getElementById('f-title').value.trim();
  const subtitle    = document.getElementById('f-subtitle').value.trim();
  const description = document.getElementById('f-description').value.trim();
  const category    = document.getElementById('f-category').value;

  let valid = true;
  if (!title)       { markError('f-title',       'Title is required'); valid = false; }
  if (!subtitle)    { markError('f-subtitle',     'Subtitle is required'); valid = false; }
  if (!description) { markError('f-description',  'Description is required'); valid = false; }
  if (!category)    { markError('f-category',     'Category is required'); valid = false; }
  if (!valid) return;

  const tagsRaw = document.getElementById('f-tags').value;
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  const project = {
    id:          editingId || generateId(title),
    title,
    subtitle,
    description,
    category,
    tags,
    date:        document.getElementById('f-date').value.trim() || new Date().getFullYear().toString(),
    icon:        document.getElementById('f-icon').value.trim() || '📁',
    image:       document.getElementById('f-image').value.trim() || null,
    github:      document.getElementById('f-github').value.trim() || null,
    demo:        document.getElementById('f-demo').value.trim() || null,
    status:      document.getElementById('f-status').value,
    featured:    document.getElementById('f-featured').checked
  };

  const projects = getProjects();
  if (editingId) {
    const idx = projects.findIndex(p => p.id === editingId);
    if (idx !== -1) projects[idx] = project;
  } else {
    projects.unshift(project);
  }

  saveProjects(projects);
  closeModal('project-modal');
  showToast(editingId ? '✅ Project updated!' : '✅ Project added!', 'success');
  editingId = null;
}

function markError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.classList.add('f-error');
  const errBox = document.getElementById('modal-error');
  if (errBox) { errBox.style.display = 'flex'; errBox.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`; }
}

function clearFormErrors() {
  document.querySelectorAll('.f-error').forEach(el => el.classList.remove('f-error'));
  const errBox = document.getElementById('modal-error');
  if (errBox) errBox.style.display = 'none';
}

/* ─── Modal: Delete ─── */
let deleteId = null;

function openDelete(id) {
  const project = getProjects().find(p => p.id === id);
  if (!project) return;
  deleteId = id;
  document.getElementById('confirm-name').textContent = project.title;
  showModal('confirm-modal');
}

function confirmDelete() {
  if (!deleteId) return;
  const projects = getProjects().filter(p => p.id !== deleteId);
  saveProjects(projects);
  closeModal('confirm-modal');
  showToast('🗑️ Project deleted', 'error');
  deleteId = null;
}

/* ─── Modal helpers ─── */
function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

/* ─── Export / Import ─── */
function exportProjects() {
  const projects = getProjects();
  const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `hasnae-portfolio-projects-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📦 Projects exported!', 'success');
}

function importProjects(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');
      saveProjects(data);
      showToast(`✅ Imported ${data.length} projects`, 'success');
    } catch {
      showToast('❌ Invalid JSON file', 'error');
    }
  };
  reader.readAsText(file);
}

/* ─── Toast ─── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.style.display = 'flex';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  setupLockScreen();

  /* Logout */
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    clearSession();
    location.reload();
  });

  /* Add button */
  document.getElementById('btn-add')?.addEventListener('click', openAdd);

  /* Project form submit */
  document.getElementById('project-form')?.addEventListener('submit', saveProject);

  /* Modal close buttons */
  document.getElementById('modal-close')?.addEventListener('click',   () => closeModal('project-modal'));
  document.getElementById('btn-cancel')?.addEventListener('click',    () => closeModal('project-modal'));
  document.getElementById('confirm-close')?.addEventListener('click', () => closeModal('confirm-modal'));
  document.getElementById('confirm-cancel')?.addEventListener('click',() => closeModal('confirm-modal'));
  document.getElementById('confirm-delete')?.addEventListener('click', confirmDelete);

  /* Close on overlay click */
  document.getElementById('project-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal('project-modal');
  });
  document.getElementById('confirm-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal('confirm-modal');
  });

  /* Search & filter */
  document.getElementById('search-input')?.addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase();
    renderTable();
  });
  document.getElementById('filter-category')?.addEventListener('change', e => {
    currentCat = e.target.value;
    renderTable();
  });

  /* Export */
  document.getElementById('btn-export')?.addEventListener('click', exportProjects);

  /* Import */
  document.getElementById('import-file')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) { importProjects(file); e.target.value = ''; }
  });

  /* ESC key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal('project-modal');
      closeModal('confirm-modal');
    }
  });

  /* Initial render (only when authenticated) */
  if (isAuthenticated()) {
    renderTable();
    updateStats();
  }
});
