/* Local-only release gate for the flagship field-work expansion. No network or publishing actions. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const file = (name) => readFile(resolve(root, name), 'utf8');
const guideRoute = 'https://virtualmase.github.io/ai-mastery/guides/train-your-agent-playbook/';
const studyRoute = 'https://virtualmase.github.io/ai-mastery/case-studies/arctura-network/';

const [home, guide, study, claimsText, guideBrief, studyBrief, strategy, guideHub, studyHub, directory, sitemap, llms] = await Promise.all([
  file('index.html'),
  file('guides/train-your-agent-playbook/index.html'),
  file('case-studies/arctura-network/index.html'),
  file('case-studies/arctura-network/claim-register.json'),
  file('docs/train-your-agent-playbook-content-brief.md'),
  file('docs/arctura-network-field-study-content-brief.md'),
  file('docs/CONTENT-CURATION-STRATEGY.md'),
  file('guides/index.html'),
  file('case-studies/index.html'),
  file('directory/index.html'),
  file('sitemap.xml'),
  file('llms.txt'),
]);

const claims = JSON.parse(claimsText);
const failures = [];
const requireText = (source, text, label) => { if (!source.includes(text)) failures.push(`${label} is missing: ${text}`); };
const requirePattern = (source, pattern, label) => { if (!pattern.test(source)) failures.push(`${label} failed: ${pattern}`); };

for (const [route, source, label] of [[guideRoute, guide, 'guide'], [studyRoute, study, 'field study']]) {
  requireText(source, `<link rel="canonical" href="${route}`, label);
  requirePattern(source, /<meta name="robots" content="index, ?follow/i, `${label} robots`);
  requirePattern(source, /<meta property="og:title" content="[^"]+/i, `${label} Open Graph title`);
  requireText(sitemap, `<loc>${route}</loc>`, `${label} sitemap entry`);
  requireText(llms, route, `${label} llms entry`);
}

for (const route of ['guides/train-your-agent-playbook/', 'case-studies/arctura-network/']) {
  requireText(home, `href="${route}"`, `homepage contextual link for ${route}`);
  requireText(directory, `href="../${route}"`, `directory link for ${route}`);
}

requireText(guideHub, 'href="train-your-agent-playbook/"', 'guides hub');
for (const route of ['arctura-network/', 'ai-mastery-self-audit/']) requireText(studyHub, `href="${route}"`, `field-studies hub link ${route}`);
for (const claimClass of ['Fact', 'Interpretation', 'Framework', 'Unknown']) requireText(studyHub, claimClass, `field-studies claim class ${claimClass}`);
for (const boundary of ['Working records, not endorsements.', 'do not certify a client, product, system, strategy, or result', 'Inspect. Record. Correct. Recheck.']) requireText(studyHub, boundary, `field-studies boundary ${boundary}`);
requireText(home, 'href="case-studies/"', 'homepage field-studies hub link');
requireText(sitemap, 'https://virtualmase.github.io/ai-mastery/case-studies/</loc>', 'field-studies sitemap entry');
requireText(llms, 'https://virtualmase.github.io/ai-mastery/case-studies/', 'field-studies llms entry');
for (const type of ['WebPage', 'BreadcrumbList', 'TechArticle', 'FAQPage']) requireText(guide, `"@type": "${type}"`, `guide JSON-LD ${type}`);
for (const text of ['Published 2026-08-30', 'not a hosting or vendor recommendation', 'Recheck due ~90 days']) requireText(guide, text, 'guide boundary');
for (const source of ['github.com/ollama/ollama', 'lmstudio.ai', 'github.com/ggml-org/llama.cpp', 'github.com/vllm-project/vllm']) requireText(guide, source, `guide primary source ${source}`);

const requiredClasses = ['fact', 'interpretation', 'framework', 'unknown'];
for (const type of requiredClasses) if (!claims.claims.some((claim) => claim.class === type)) failures.push(`Claim register is missing ${type}.`);
for (const claim of claims.claims.filter((item) => item.class === 'fact')) if (!claim.evidence?.length) failures.push(`${claim.id} needs direct evidence.`);
for (const claim of claims.claims.filter((item) => item.class === 'unknown')) if (claim.status !== 'held') failures.push(`${claim.id} must remain held.`);
for (const text of ['Direction recorded', 'Not a launch claim', 'does not measure comprehension, participation, search, or commercial outcomes', 'drafted with AI assistance', 'claim-register.json', 'issues/new']) requireText(study, text, 'field-study boundary');
for (const source of ['documentation/netuid-505/', 'evidence/netuid-505/', 'authority/']) requireText(study, source, `field-study evidence link ${source}`);

for (const [brief, label] of [[guideBrief, 'guide brief'], [studyBrief, 'field-study brief']]) {
  for (const heading of ['Audience and moment', 'Page job', 'Claim boundary', 'Evidence plan', 'Metadata and discovery', 'Owner and review']) requireText(brief, heading, `${label} section`);
}
for (const form of ['Guide', 'Learning path', 'Field study', 'Public record']) requireText(strategy, `**${form}:**`, `curation form ${form}`);
for (const rule of ['Question:', 'Evidence:', 'Use:']) requireText(strategy, rule, `curation editorial test ${rule}`);
requireText(llms, `${studyRoute}claim-register.json`, 'field-study claim-register discovery');

if (failures.length) {
  console.error(JSON.stringify({ valid: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ valid: true, routes: 2, claimClasses: requiredClasses.length, claims: claims.claims.length, network: false, publishing: false }, null, 2));
