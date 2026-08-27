/* AI Mastery Trust Infrastructure: local-only structural validation for the three connected lessons; no network or publishing action. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const path = (file) => resolve(root, file);
const lessons = [
  ['evidence-and-claim-boundaries', '01'],
  ['provenance-records-and-content-credentials', '02'],
  ['verifier-policy-and-correction-paths', '03'],
];
const [home, llms, sitemap, css, brief, ...pages] = await Promise.all([
  readFile(path('index.html'), 'utf8'), readFile(path('llms.txt'), 'utf8'), readFile(path('sitemap.xml'), 'utf8'),
  readFile(path('learning/trust-foundations.css'), 'utf8'), readFile(path('docs/trust-infrastructure-content-brief.md'), 'utf8'),
  ...lessons.map(([slug]) => readFile(path(`learning/${slug}/index.html`), 'utf8')),
]);
const failures = [];
if (!home.includes('TRUST LEARNING LAYER') || !home.includes('Three foundations')) failures.push('Homepage must name the three Trust foundations.');
if (!css.includes('Trust Infrastructure: a portable verification-notebook interface')) failures.push('Trust pathway visual contract is missing.');
if (!brief.includes('Trust Infrastructure Lesson Cluster')) failures.push('Trust pathway content brief is missing.');
for (let index = 0; index < lessons.length; index += 1) {
  const [slug, sequence] = lessons[index];
  const page = pages[index];
  const canonical = `https://virtualmase.github.io/ai-mastery/learning/${slug}/`;
  if (!home.includes(`learning/${slug}/`)) failures.push(`Homepage is missing ${slug}.`);
  if (!llms.includes(canonical)) failures.push(`llms.txt is missing ${slug}.`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`Sitemap is missing ${slug}.`);
  if (!page.includes(`TRUST PATHWAY · ${sequence} OF 03`)) failures.push(`${slug} has the wrong pathway sequence.`);
  if (!page.toLowerCase().includes('learning boundary')) failures.push(`${slug} is missing the learning boundary.`);
  if (!page.toLowerCase().includes('practice lab')) failures.push(`${slug} is missing the practice lab.`);
  if (!page.includes('Source shelf')) failures.push(`${slug} is missing the source shelf.`);
  if (!page.includes('isPartOf')) failures.push(`${slug} is missing pathway metadata.`);
}
if (failures.length) { console.error(JSON.stringify({ valid: false, failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ valid: true, lessons: lessons.length, network: false, publishing: false }, null, 2));
