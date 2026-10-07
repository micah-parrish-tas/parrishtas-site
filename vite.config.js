import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const root = fileURLToPath(new URL('.', import.meta.url))

// GitHub Pages project path. `npm run dev` stays at `/` unless BASE_PATH is set.
// Production builds use this path. Set BASE_PATH=/ to publish at https://parrishtas.com/.
const PROJECT_BASE = '/parrishtas-site/'

function normalizeBase(value) {
  const trimmed = String(value).trim()
  if (trimmed === '' || trimmed === '/') return '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

function resolveBase(command, isPreview) {
  if (process.env.BASE_PATH !== undefined) return normalizeBase(process.env.BASE_PATH)
  if (command === 'serve' && !isPreview) return '/'
  return PROJECT_BASE
}

// Vite rewrites bundled assets and public files for `base`, but not page links.
function prefixSiteLinks(base) {
  return {
    name: 'prefix-site-links',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!base || base === '/') return html
        return html.replace(
          /(\s(?:href|src)=["'])(\/(?!\/)[^"']*)(["'])/g,
          (full, pre, url, post) => {
            if (url === base || url.startsWith(base)) return full
            if (url === '/') return `${pre}${base}${post}`
            return `${pre}${base}${url.slice(1)}${post}`
          },
        )
      },
    },
  }
}

export default defineConfig(({ command, isPreview }) => {
  const base = resolveBase(command, isPreview)

  return {
    base,
    plugins: [tailwindcss(), prefixSiteLinks(base)],
    server: {
      host: '127.0.0.1',
      port: 5173,
      allowedHosts: ['parrishtas.com', 'www.parrishtas.com', 'localhost', '127.0.0.1'],
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          howWeWork: resolve(root, 'how-we-work.html'),
          services: resolve(root, 'services.html'),
          executiveDirector: resolve(root, 'executive-director.html'),
          about: resolve(root, 'about.html'),
          contact: resolve(root, 'contact.html'),
        },
      },
    },
  }
})
