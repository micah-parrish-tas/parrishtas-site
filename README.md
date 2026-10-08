# Parrish TAS

Marketing site for **Parrish TAS**, an association management company. Parrish TAS provides full-service and à la carte management and executive director services for associations, societies, certification boards, and foundations.

**Production domain:** [parrishtas.com](https://parrishtas.com)

## Stack

- Vite (multi-page)
- Tailwind CSS v4
- Plain HTML + light JS (mobile nav, forms open a mailto to micah@parrishtas.com)

## Pages

| Path | Purpose |
|------|---------|
| `/` (`index.html`) | Home |
| `/services.html` | Full-service and à la carte association management |
| `/executive-director.html` | Outsourced executive director, or support for a current executive director |
| `/how-it-works.html` | Process, day-to-day management, what an AMC is, and FAQ |
| `/who-we-serve.html` | Trade associations, professional societies, certification boards, and foundations |
| `/about.html` | Story, values, and team |
| `/contact.html` | Contact form |
| `/request-a-proposal.html` | Proposal request form |
| `/how-we-work.html` | Redirects to `/how-it-works.html` |

## Preview locally

From the repo root:

```bash
npm install
npm run dev
```

Then open the URL Vite prints (`http://127.0.0.1:5173`). The dev server stays on port 5173 with `allowedHosts` for `parrishtas.com`, `www.parrishtas.com`, `localhost`, and `127.0.0.1`. Dev uses base `/`, so root-absolute page links work without a project prefix.

## Production build

```bash
npm run build
npm run preview   # optional: serve dist/
```

Output lands in `dist/`. Production builds default to base `/`, the same as local dev, so assets and internal links are root-relative for [https://parrishtas.com/](https://parrishtas.com/). Set `BASE_PATH` only if you need a different public path. The copyright year is stamped at build time.

## GitHub Pages

`.github/workflows/pages.yml` builds the site and deploys `dist/` on every push to `main`, and when the workflow is run manually. It uses the official Pages actions: `configure-pages`, `upload-pages-artifact`, and `deploy-pages`.

The site is served at [https://parrishtas.com/](https://parrishtas.com/). The workflow sets `BASE_PATH: /`, and `vite.config.js` uses that same root default for production builds. Bundled assets, public files, and internal page links stay at the site root.

`public/robots.txt` and `public/sitemap.xml` already use `https://parrishtas.com/` URLs. There is no `CNAME` file. Actions-based Pages uses the custom domain configured in the repository settings.

## Brand notes

- Primary accent: sky blue `#4dabf7` (from logo)
- Logo: `public/logo.jpg`
- No invented testimonials, client names, or metrics
- Primary CTA: **Request a Proposal**
- Membership line, used exactly: **Member, AMC Institute**
