import fs from 'node:fs';

const file = 'guides/technical-seo-geo-playbook/index.html';
const html = fs.readFileSync(file, 'utf8');
const checks = {
  title: /<title>Technical SEO and GEO Playbook:/i.test(html),
  keywordOpeningDescription: /<meta name="description" content="Technical SEO and GEO playbook/i.test(html),
  canonical: /<link rel="canonical" href="https:\/\/virtualmase\.github\.io\/ai-mastery\/guides\/technical-seo-geo-playbook\/">/.test(html),
  articleJsonLd: /"@type":"Article"/.test(html),
  breadcrumbJsonLd: /"@type":"BreadcrumbList"/.test(html),
  webpImage: /src="\.\.\/\.\.\/assets\/guide\/technical-seo-geo-authority-graph\.webp"/.test(html),
  imageAlt: /<img[^>]+alt="[^"]+"[^>]+width="3120"[^>]+height="840"/.test(html),
  sourceSection: /id="sources"/.test(html),
  references: /Google Search Central/.test(html) && /Moz: What Is Link Equity/.test(html),
  internalAnchors: [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)].every((m) => !/^javascript:/i.test(m[1]) && !/rel="[^"]*(nofollow|ugc|sponsored)/i.test(m[0])),
};
console.log(JSON.stringify(checks, null, 2));
if (Object.values(checks).some((value) => !value)) process.exit(1);
