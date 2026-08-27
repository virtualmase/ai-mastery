/* AI Mastery Machine-Readable Internet: local-only structural validation for the connected lesson cluster; no network or publishing action. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const path = (file) => resolve(root, file);
const lessons = [['canonical-entity-records', '01'], ['structured-relationship-data', '02'], ['discovery-files-and-crawl-boundaries', '03']];
const [home, llms, sitemap, css, brief, ...pages] = await Promise.all([
  readFile(path('index.html'), 'utf8'), readFile(path('llms.txt'), 'utf8'), readFile(path('sitemap.xml'), 'utf8'),
  readFile(path('learning/machine-readable-foundations.css'), 'utf8'), readFile(path('docs/machine-readable-internet-content-brief.md'), 'utf8'),
  ...lessons.map(([slug]) => readFile(path(`learning/${slug}/index.html`), 'utf8')),
]);
const failures = [];
if (!home.toUpperCase().includes('MACHINE-WEB LEARNING LAYER') || !home.includes('Three foundations')) failures.push('Homepage must name three Machine-Readable Internet foundations.');
if (!css.includes('Machine-Readable Internet: a portable field-record interface')) failures.push('Machine-Readable Internet visual contract is missing.');
if (!brief.includes('Machine-Readable Internet Lesson Cluster')) failures.push('Machine-Readable Internet content brief is missing.');
for (let index = 0; index < lessons.length; index += 1) {
  const [slug, sequence] = lessons[index];
  const page = pages[index];
  const canonical = `https://virtualmase.github.io/ai-mastery/learning/${slug}/`;
  if (!home.includes(`learning/${slug}/`)) failures.push(`Homepage is missing ${slug}.`);
  if (!llms.includes(canonical)) failures.push(`llms.txt is missing ${slug}.`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`Sitemap is missing ${slug}.`);
  if (!page.includes(`MACHINE-WEB PATHWAY · ${sequence} OF 03`)) failures.push(`${slug} has the wrong pathway sequence.`);
  for (const required of ['Learning boundary', 'Practice lab', 'Source shelf', 'isPartOf']) if (!page.includes(required)) failures.push(`${slug} is missing ${required}.`);
}
if (failures.length) { console.error(JSON.stringify({ valid: false, failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ valid: true, lessons: lessons.length, network: false, publishing: false }, null, 2));
