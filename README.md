# Parrish TAS Marketing Site

Mobile-first marketing site for **Parrish TAS**, an outsourced Association Manager / AMC and executive director services partner. Parrish TAS is the association’s professional home office so volunteer boards focus on mission.

**Production domain:** [parrishtas.com](https://parrishtas.com)

## Stack

- Vite (multi-page)
- Tailwind CSS v4
- Plain HTML + light JS (mobile nav, contact form → mailto)

## Pages

| Path | Purpose |
|------|---------|
| `/` (`index.html`) | Home: Association Manager value prop, staffing model, TPC proof, capabilities, CTA |
| `/how-we-work.html` | What is an AMC / full management vs à la carte vs embedded ED |
| `/services.html` | JD-mapped Association Manager lanes; full management and à la carte |
| `/executive-director.html` | ED services: embedded ED vs supporting a sitting ED |
| `/about.html` | Team + credibility |
| `/contact.html` | Contact / RFP (mailto micah@parrishtas.com); 2-business-day response note |

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

Output lands in `dist/`. A production build with `BASE_PATH` unset uses `/parrishtas-site/` so assets and internal links match the GitHub Pages project URL. Set `BASE_PATH=/` to build for the site root.

## GitHub Pages

`.github/workflows/pages.yml` builds the site and deploys `dist/` on every push to `main`, and when the workflow is run manually. It uses the official Pages actions: `configure-pages`, `upload-pages-artifact`, and `deploy-pages`.

The first public URL is [https://micah-parrish-tas.github.io/parrishtas-site/](https://micah-parrish-tas.github.io/parrishtas-site/). Vite `base` comes from the `BASE_PATH` environment variable in that workflow (`vite.config.js`). That value is applied to bundled assets, public files, and internal page links.

**Switch to [https://parrishtas.com/](https://parrishtas.com/) (site root):** in `.github/workflows/pages.yml`, change

```yaml
BASE_PATH: /parrishtas-site/
```

to

```yaml
BASE_PATH: /
```

There is no `CNAME` file in this repo. Turn on Pages (source: GitHub Actions) and add the custom domain in the repository settings after board approval. Do not change DNS from this repository.

## Domain / DNS (later)

`parrishtas.com` is wired in the site as:

- Canonical URLs and Open Graph tags (`https://parrishtas.com/...`)
- Footer link + `mailto:micah@parrishtas.com` (RFP / public contact)
- `public/robots.txt` + `public/sitemap.xml`

When you publish:

1. Deploy `dist/` to your host.
2. Point `parrishtas.com` (and ideally `www`) DNS to that host (A/AAAA or CNAME per provider docs).
3. Enable HTTPS on the host.

## Brand notes

- Primary accent: sky blue `#4dabf7` (from logo)
- Logo: `public/logo.jpg`
- No invented testimonials, client names, or metrics
- Primary CTA: **Request a proposal**
- Positioning: Association Manager / AMC / ED professional home office for trade associations
- Copy style: ASE STE100 (short sentences, consistent terms, positive framing)
