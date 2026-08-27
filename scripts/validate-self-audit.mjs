/* AI Mastery self-audit: local-only validation of public evidence, claim classes, discovery files, and correction route. It performs no network or publishing action. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const path = (file) => resolve(root, file);
const route = 'https://virtualmase.github.io/ai-mastery/case-studies/ai-mastery-self-audit/';
const [page, css, ledger, brief, claimsText, home, llms, sitemap] = await Promise.all([
  readFile(path('case-studies/ai-mastery-self-audit/index.html'), 'utf8'),
  readFile(path('case-studies/ai-mastery-self-audit/case-study.css'), 'utf8'),
  readFile(path('docs/ai-mastery-self-audit-evidence.md'), 'utf8'),
  readFile(path('docs/ai-mastery-self-audit-content-brief.md'), 'utf8'),
  readFile(path('case-studies/ai-mastery-self-audit/claim-register.json'), 'utf8'),
  readFile(path('index.html'), 'utf8'), readFile(path('llms.txt'), 'utf8'), readFile(path('sitemap.xml'), 'utf8'),
]);
const claims = JSON.parse(claimsText);
const failures = [];
const requiredClasses = ['fact', 'interpretation', 'framework', 'unknown'];
for (const type of requiredClasses) if (!claims.claims.some((claim) => claim.class === type)) failures.push(`Claim register is missing ${type}.`);
for (const claim of claims.claims.filter((item) => item.class === 'fact')) if (!claim.evidence?.length) failures.push(`${claim.id} needs direct evidence.`);
for (const claim of claims.claims.filter((item) => item.class === 'unknown')) if (claim.status !== 'held') failures.push(`${claim.id} must remain held.`);
for (const text of ['What remains unknown', 'Self-audit method', 'PUBLIC CORRECTION ROUTE', 'drafted with AI assistance', 'Publishing boundary:']) if (!page.includes(text)) failures.push(`Case study is missing required boundary text: ${text}`);
if (!page.includes('https://github.com/virtualmase/ai-mastery/issues/new')) failures.push('Case study is missing its correction route.');
if (!css.includes('self-audit: a portable audit-desk interface')) failures.push('Case-study visual contract is missing.');
if (!ledger.includes('Explicit Unknowns') || !brief.includes('AI Mastery Self-Audit')) failures.push('Self-audit documentation is incomplete.');
if (!home.includes('case-studies/ai-mastery-self-audit/')) failures.push('Homepage needs a case-study link.');
if (!llms.includes(route)) failures.push('llms.txt is missing the case-study route.');
for (const resource of [
  'https://virtualmase.github.io/ai-mastery/case-studies/ai-mastery-self-audit/ai-mastery-self-audit-evidence.md',
  'https://virtualmase.github.io/ai-mastery/case-studies/ai-mastery-self-audit/claim-register.json',
  'https://github.com/virtualmase/ai-mastery/issues/new',
  'https://github.com/virtualmase/ai-mastery/blob/main/docs/ai-mastery-self-audit-content-brief.md',
]) if (!llms.includes(resource)) failures.push(`llms.txt is missing the self-audit resource: ${resource}`);
if (!sitemap.includes(`<loc>${route}</loc>`)) failures.push('Sitemap is missing the case-study route.');
if (failures.length) { console.error(JSON.stringify({ valid: false, failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ valid: true, claimClasses: requiredClasses.length, claims: claims.claims.length, network: false, publishing: false }, null, 2));
