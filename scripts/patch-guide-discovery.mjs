import fs from 'node:fs';

const indexPath = 'index.html';
let index = fs.readFileSync(indexPath, 'utf8');
const guideLink = '<a href="guides/">GEO + technical SEO guide</a>';
if (!index.includes(guideLink)) {
  index = index.replace('<a href="aure/">AURE / 16 silos</a><a href="directory/">All pages</a>', `<a href="aure/">AURE / 16 silos</a>${guideLink}<a href="directory/">All pages</a>`);
  fs.writeFileSync(indexPath, index);
}

const sitemapPath = 'sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const entries = [
  '<url><loc>https://virtualmase.github.io/ai-mastery/guides/</loc><lastmod>2026-08-30</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>',
  '<url><loc>https://virtualmase.github.io/ai-mastery/guides/technical-seo-geo-playbook/</loc><lastmod>2026-08-30</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>',
];
for (const entry of entries) if (!sitemap.includes(entry)) sitemap = sitemap.replace('</urlset>', `  ${entry}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);

const llmsPath = 'llms.txt';
let llms = fs.readFileSync(llmsPath, 'utf8');
const block = `\n## Field guides\n- Technical SEO and GEO Playbook: https://virtualmase.github.io/ai-mastery/guides/technical-seo-geo-playbook/\n  - Source-backed field record of the crawlable authority graph, internal link policy, technical SEO procedure, GEO implications, reproducible audit, and portability method. Facts are sourced; interpretations are labeled; rankings, citations, and Domain Authority remain unknown.\n- Guides hub: https://virtualmase.github.io/ai-mastery/guides/\n  - Public index of AI Mastery field guides for technical SEO, GEO, AI systems, and trust.\n`;
if (!llms.includes('## Field guides')) llms = llms.replace('## Project discovery', `${block}\n## Project discovery`);
fs.writeFileSync(llmsPath, llms);

console.log('Guide discovery patched: homepage, sitemap, llms.txt');
