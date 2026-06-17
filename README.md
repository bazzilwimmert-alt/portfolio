# Bazzil Wimmert — Portfolio

A fast, responsive, single-page portfolio for **Bazzil Wimmert**, Professional Electrical Engineer (Pr Eng EIT) based in Windhoek, Namibia.

Built with plain HTML, CSS, and JavaScript — no build step, no dependencies. Ready to deploy on GitHub Pages, Netlify, Vercel, or any static host.

## Features
- Hero with animated stat counters
- Dark / light theme toggle (persisted)
- Filterable project gallery
- Career timeline, skills, education & certifications
- Scroll progress bar, active-section nav, reveal-on-scroll animations
- Fully responsive with a mobile menu and reduced-motion support

## Structure
```
index.html   # markup & content
styles.css   # theme tokens & layout
script.js    # interactions + project data
```

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)
Push to `main` and enable Pages (Settings → Pages → Deploy from branch → `main` / root).
The included `.nojekyll` file ensures all assets are served as-is.

## Editing content
- **Projects** live in the `PROJECTS` array in `script.js`.
- **Experience, skills, education** are plain markup in `index.html`.
