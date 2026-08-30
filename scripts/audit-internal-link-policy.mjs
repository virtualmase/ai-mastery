import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const files = execFileSync('find', ['.', '-name', 'index.html', '-not', '-path', './.git/*'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const findings = [];
let totalAnchors = 0;
let internalAnchors = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    totalAnchors++;
    const tag = match[0];
    const href = match[1];
    const internal = href.startsWith('/') || href.startsWith('.') || href.startsWith('https://virtualmase.github.io/ai-mastery');
    if (!internal) continue;
    internalAnchors++;
    const rel = tag.match(/\brel=["']([^"']*)["']/i)?.[1] ?? '';
    if (/\b(nofollow|ugc|sponsored)\b/i.test(rel) || /^javascript:/i.test(href)) findings.push({ file, href, rel, reason: 'internal link is explicitly restricted or JavaScript-only' });
  }
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) findings.push({ file, reason: 'page has noindex robots directive' });
}
const out = { pages: files.length, totalAnchors, internalAnchors, restrictedInternalLinks: findings.filter((x) => x.href).length, crawlControlFindings: findings.filter((x) => !x.href).length, findings };
fs.writeFileSync('audit-internal-link-policy.json', JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out, null, 2));
if (out.restrictedInternalLinks || out.crawlControlFindings) process.exitCode = 1;
