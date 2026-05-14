# Rishav Parasar — Portfolio

Static personal portfolio built with HTML, CSS and vanilla JavaScript.

**Quick links**

- Live site: GitHub Pages (deployed via `.github/workflows/deploy.yml`)
- Resume: Hosted via Google Drive (link updated in `index.html`)
- Favicon/logo: `images/logo.svg`

**Repository structure**

- `index.html` — Main markup (hero, timeline, projects, contact)
- `style.css` — Design tokens and component styles
- `script.js` — Typing effect, timeline date logic, role visibility
- `images/` — Avatar, logo and project images
- `.github/workflows/deploy.yml` — GitHub Actions workflow to deploy to Pages

**Preview locally**

From the project root run:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

**Editing notes**

- Timeline: the Work Experience section in `index.html` contains a combined CDK Global card with `role-progression` entries. Each role includes a `role-period` and list of responsibilities.
- Future roles: to hide a future role until it becomes active, add `data-show-from="YYYY-MM"` to the role container. The included script will hide entries whose show date is in the future.
- Resume button: the nav Resume link was updated to use a Google Drive direct-download URL. To change hosting, replace that href in `index.html`.

**Deployment**

This repo uses GitHub Actions Pages. The workflow `.github/workflows/deploy.yml` uploads the repository root and deploys to Pages on pushes to the `main` branch. To deploy a specific folder, change the `path` in the `actions/upload-pages-artifact@v1` step.

**Useful links & tips**

- Swap resume host: Google Drive, OneDrive, Dropbox, Netlify Drop, or S3 are all supported options.
- Favicon fallbacks: add PNG/ICO files in `images/` and reference them from `index.html` if you need broader compatibility.

License: MIT — see `LICENSE`.

Last updated: May 15, 2026
