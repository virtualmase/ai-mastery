/* AI Mastery ARM pathway: local-only structural checks for the five connected lessons; no network or publishing action. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const path = (file) => resolve(root, file);
const lessons = [
  ['autonomous-resource-management', '01'],
  ['autonomous-resource-inventory', '02'],
  ['autonomous-decision-rights', '03'],
  ['autonomous-trace-records', '04'],
  ['autonomous-exception-design', '05'],
];
const [home, llms, sitemap, css, ...pages] = await Promise.all([
  readFile(path('index.html'), 'utf8'), readFile(path('llms.txt'), 'utf8'), readFile(path('sitemap.xml'), 'utf8'),
  readFile(path('learning/arm-foundations.css'), 'utf8'), ...lessons.map(([slug]) => readFile(path(`learning/${slug}/index.html`), 'utf8')),
]);
const failures = [];
if (!home.includes('ARM PATHWAY</span><small>5 FOUNDATIONS</small>')) failures.push('Homepage ARM pathway must name five foundations.');
if (!css.includes('ARM pathway: a portable field-note interface')) failures.push('ARM pathway visual contract is missing.');
for (let index = 0; index < lessons.length; index += 1) {
  const [slug, sequence] = lessons[index];
  const page = pages[index];
  const canonical = `https://virtualmase.github.io/ai-mastery/learning/${slug}/`;
  if (!home.includes(`learning/${slug}/`)) failures.push(`Homepage is missing ${slug}.`);
  if (!llms.includes(canonical)) failures.push(`llms.txt is missing ${slug}.`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`Sitemap is missing ${slug}.`);
  if (!page.includes(`ARM PATHWAY · ${sequence} OF 05`)) failures.push(`${slug} has the wrong pathway sequence.`);
  if (!page.toLowerCase().includes('learning boundary')) failures.push(`${slug} is missing the learning boundary.`);
  if (!page.toLowerCase().includes('practice lab')) failures.push(`${slug} is missing the practice lab.`);
  if (index > 0 && !page.includes('Source shelf')) failures.push(`${slug} is missing the source shelf.`);
  if (index > 0 && !page.includes('isPartOf')) failures.push(`${slug} is missing pathway metadata.`);
}
if (failures.length) { console.error(JSON.stringify({ valid: false, failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ valid: true, lessons: lessons.length, network: false, publishing: false }, null, 2));
