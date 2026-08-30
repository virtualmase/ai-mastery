import fs from 'node:fs/promises';
import path from 'node:path';

const base = 'https://virtualmase.github.io/ai-mastery';
const siteBase = `${base}/`;
const root = new URL(`${base}/`);
const localPages = (await import('node:child_process')).execFileSync('find', ['.', '-name', 'index.html', '-not', '-path', './.git/*'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean).map((f) => {
  const rel = path.dirname(f).replace(/^\.\/?/, '');
  return rel ? `/${rel}/` : '/';
}).sort();
const expected = [...new Set(localPages)];
const abs = (href, page) => {
  if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  try {
    const pageUrl = page === '/' ? new URL(siteBase) : new URL(page.replace(/^\//, ''), siteBase);
    const u = new URL(href, pageUrl);
    if (u.origin !== root.origin || !u.pathname.startsWith(root.pathname)) return null;
    return u.pathname.replace(root.pathname, '/').replace(/\/index\.html$/, '/').replace(/\/\/{2,}/g, '/');
  } catch { return null; }
};
const fetchPage = async (route) => {
  const url = `${base}${route}`;
  const r = await fetch(url, { redirect: 'follow' });
  const html = await r.text();
  return { route, url, status: r.status, html };
};
const results = [];
for (const route of expected) results.push(await fetchPage(route));
const routeSet = new Set(expected);
const validResourceTargets = new Set(['/llms.txt', '/sitemap.xml', '/robots.txt', '/case-studies/ai-mastery-self-audit/ai-mastery-self-audit-evidence.md', '/case-studies/ai-mastery-self-audit/claim-register.json', '/case-studies/arctura-network/claim-register.json']);
const audit = results.map(({ route, status, html }) => {
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  const internal = links.map((h) => abs(h, route)).filter(Boolean);
  const brokenTargets = internal.filter((target) => !routeSet.has(target) && !validResourceTargets.has(target));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const has = (re) => re.test(html);
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? '';
  const canonicalOk = canonical === `${base}${route}`;
  return {
    route, status, reachable: status === 200, internalCount: internal.length,
    internalTargets: internal, brokenTargets, title: has(/<title>[^<]+<\/title>/i), description: has(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+[^>]*>/i),
    canonical: canonicalOk, robots: has(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']+[^>]*>/i),
    openGraph: has(/<meta\b[^>]*property=["']og:title["'][^>]*content=["'][^"']+[^>]*>/i),
    jsonLd: has(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/i),
    images: images.length, imageAltGaps: images.filter((tag) => !/\balt=["'][^"']*["']/i.test(tag)).length,
    noindex: /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html),
  };
});
const byRoute = new Map(audit.map((r) => [r.route, r]));
const queue = ['/']; const depth = new Map([['/', 0]]);
while (queue.length) { const current = queue.shift(); const d = depth.get(current); const html = results.find((r) => r.route === current)?.html ?? ''; for (const href of [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) => abs(m[1], current)).filter((x) => x && routeSet.has(x))) { if (!depth.has(href)) { depth.set(href, d + 1); queue.push(href); } } }
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(root.pathname, '/'));
const report = { generatedAt: new Date().toISOString(), base, expectedRoutes: expected.length, liveRoutes: audit.length, statusFailures: audit.filter((r) => !r.reachable).map((r) => ({ route: r.route, status: r.status })), brokenInternalLinks: audit.flatMap((r) => r.brokenTargets.map((target) => ({ from: r.route, target }))), orphanRoutes: expected.filter((r) => !depth.has(r)), beyondTwoClicks: expected.filter((r) => (depth.get(r) ?? Infinity) > 2), depth: Object.fromEntries([...depth.entries()].sort()), seoFailures: audit.filter((r) => !(r.title && r.description && r.canonical && r.robots && r.openGraph && r.jsonLd)), imageAltGaps: audit.filter((r) => r.imageAltGaps > 0).map((r) => ({ route: r.route, count: r.imageAltGaps })), sitemapMissing: expected.filter((r) => !sitemapUrls.includes(r)), sitemapExtra: sitemapUrls.filter((r) => !routeSet.has(r)), pages: audit };
await fs.writeFile('audit-live-site.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ expectedRoutes: report.expectedRoutes, liveRoutes: report.liveRoutes, statusFailures: report.statusFailures.length, brokenInternalLinks: report.brokenInternalLinks.length, orphanRoutes: report.orphanRoutes.length, beyondTwoClicks: report.beyondTwoClicks.length, seoFailures: report.seoFailures.length, imageAltGaps: report.imageAltGaps.length, sitemapMissing: report.sitemapMissing.length, sitemapExtra: report.sitemapExtra.length }, null, 2));
if (report.statusFailures.length || report.brokenInternalLinks.length || report.orphanRoutes.length || report.beyondTwoClicks.length || report.seoFailures.length || report.sitemapMissing.length) process.exitCode = 1;
