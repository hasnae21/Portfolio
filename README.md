# 🤖 Hasnae Ahouzi — Portfolio

Personal portfolio website for **Hasnae Ahouzi**, Digital Engineering & AI student specialized in Robotics & Cobotics at UEMF Fes.

**Live demo:** `https://hasnae21.github.io/Portfolio/`

---

## 🚀 Deployment on GitHub Pages

```bash
# 1. Create a new repo named "portfolio" on GitHub
# 2. Push this folder:
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Go to Settings → Pages → Source: main branch / root
# 4. Your site is live at https://hasnae21.github.io/Portfolio/
```

---

## ⚙️ Configuration checklist

### 1 — Social links (index.html)
Search for `https://www.linkedin.com/in/hasnaeahouzi` and `https://hasnae21.github.io/` in `index.html` and replace with your real URLs.

### 2 — EmailJS (contact form)
The contact form uses [EmailJS](https://www.emailjs.com) (free tier, 200 emails/month).

1. Create a free account at emailjs.com
2. Add a **Gmail** email service
3. Create an **email template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{reply_to}}` — sender's email
   - `{{subject}}` — message subject
   - `{{message}}` — message body
4. Open `script.js` and replace at the top:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_EMAILJS_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
   ```

### 3 — Admin panel password
Default password: **`hasnae2024`**

To change it, open `admin.js` and update:
```js
const DEFAULT_PASS = 'hasnae2024';  // ← change this
```
Then clear your browser's localStorage once so the new hash is stored.

### 4 — Profile photo
Place your photo at `assets/img/profile.jpg`.
The avatar will automatically display it; if missing, it falls back to the "HA" initials.

### 5 — Project GitHub links
In `script.js`, update the `github` field of the Trash Detector Robot project:
```js
github: 'https://github.com/YOUR_USERNAME/Trash-detector-Robot',
```

---

## 📁 File structure

```
portfolio/
├── index.html        ← Main portfolio (single page)
├── style.css         ← All styles (dark theme)
├── script.js         ← Animations, projects CRUD, EmailJS
├── admin.html        ← Admin panel (add/edit/delete projects)
├── admin.css         ← Admin styles
├── admin.js          ← Admin logic + auth
├── README.md
└── assets/
    └── img/
        ├── profile.jpg          ← Your photo (add manually)
        └── projects/            ← Project screenshots (optional)
```

---

## 🛠️ Admin panel

Access: `https://YOUR_SITE/admin.html`  
Or triple-click the small dot `·` in the footer.

**Features:**
- Password-protected login
- Add / Edit / Delete projects
- Filter & search
- Export projects as JSON
- Import projects from JSON backup
- Changes persist in browser localStorage

---

## 🎨 Customization

| What | Where |
|------|-------|
| Color accent | `style.css` → `--primary: #E8621A` |
| Typing animation roles | `script.js` → `const ROLES = [...]` |
| Coming soon topics | `index.html` → `.cs-topics` section |
| Default projects | `script.js` → `DEFAULT_PROJECTS` array |
| Fonts | Google Fonts link in `index.html` |

---

## 📬 Contact

- Email: ahouzihasnae@gmail.com
- University: hasnae.ahouzi@eidia.ueuromed.org
