import fs from 'node:fs';

const sitemapPath = 'sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const entry = '<url><loc>https://virtualmase.github.io/ai-mastery/author/</loc><lastmod>2026-08-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
if (!sitemap.includes(entry)) sitemap = sitemap.replace('</urlset>', `  ${entry}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);

const llmsPath = 'llms.txt';
let llms = fs.readFileSync(llmsPath, 'utf8');
const line = '- Author profile: https://virtualmase.github.io/ai-mastery/author/\n  - Canonical author record for Mason Nguyen and the AI Mastery source-led systems practice. It identifies authorship; it does not claim rankings, authority scores, citations, or outcomes.\n';
if (!llms.includes('https://virtualmase.github.io/ai-mastery/author/')) llms = llms.replace('## Project discovery', `## Author\n${line}\n## Project discovery`);
fs.writeFileSync(llmsPath, llms);
console.log('Author discovery patched.');
