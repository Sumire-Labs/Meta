import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
const root = '.output/public'
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e => e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name)))).flat()
}
const paths = (await walk(root)).filter(p => p.replaceAll('\\', '/').endsWith('/index.html')).map(p => p.replaceAll('\\', '/').slice(root.length).replace(/\/index.html$/, '') || '/')
await writeFile(join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(p => `<url><loc>https://sumirelabs.com${p}</loc></url>`).join('') + '</urlset>\n')
