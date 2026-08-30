import fs from 'node:fs';

const route = '/learning/geo-measurement-and-evaluation/';
const url = `https://virtualmase.github.io/ai-mastery${route}`;
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const entry = `<url><loc>${url}</loc><lastmod>2026-08-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
if (!sitemap.includes(entry)) sitemap = sitemap.replace('</urlset>', `  ${entry}\n</urlset>`);
fs.writeFileSync('sitemap.xml', sitemap);

let llms = fs.readFileSync('llms.txt', 'utf8');
const block = `- GEO Measurement & Evaluation: ${url}\n  - Separate structural crawl checks, Search Console observations, answer-system observations, and unknown outcomes. Artifact: four-column evaluation record. Unknown remains unknown.\n`;
if (!llms.includes(url)) llms = llms.replace('## GEO Learning', `## GEO Learning\n${block}`);
fs.writeFileSync('llms.txt', llms);
console.log('GEO measurement discovery patched.');
