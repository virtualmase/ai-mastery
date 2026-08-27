/* AI Mastery Knowledge Index: deterministic content contract for the connected lesson map; no network or publishing action. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const [index, styles, llms] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
  readFile(resolve(root, 'llms.txt'), 'utf8'),
]);

const domains = [
  'models', 'retrieval', 'context', 'agents', 'orchestration', 'inference',
  'machine-web', 'observability', 'verification', 'scale', 'predictive', 'security',
];
const sourceLinks = [
  'arxiv.org/abs/2005.11401',
  'www.nist.gov/itl/ai-risk-management-framework',
  'modelcontextprotocol.io/specification/2025-06-18',
  'github.com/open-telemetry/semantic-conventions-genai',
  'genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
  'spec.c2pa.org/specifications/specifications/2.4/ai-ml/ai_ml.html',
];

const failures = [];
if (!index.includes('12<br><small>CONNECTED DOMAINS</small>')) failures.push('Knowledge Index count must name 12 connected domains.');
if (!index.includes('These are learning routes, not claims')) failures.push('Knowledge Index must state its learning and evidence boundary.');
for (const domain of domains) {
  if (!index.includes(`id="domain-${domain}"`)) failures.push(`Missing domain anchor: ${domain}.`);
}
for (const link of sourceLinks) {
  if (!index.includes(link)) failures.push(`Missing primary source shelf entry: ${link}.`);
  if (!llms.includes(link)) failures.push(`Machine-readable index missing source shelf entry: ${link}.`);
}
for (const selector of ['.knowledge-flow', '.domain-card', '.knowledge-sources', '.knowledge-index-intro']) {
  if (!styles.includes(selector)) failures.push(`Missing connected-map stylesheet selector: ${selector}.`);
}
for (const target of [...index.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])) {
  if (!index.includes(`id="${target}"`)) failures.push(`Broken in-page learning route: #${target}.`);
}
for (const phrase of ['aria-label="Knowledge Index system flow"', 'PRIMARY SOURCE SHELF', 'These are learning routes, not claims']) {
  if (!index.includes(phrase)) failures.push(`Missing required knowledge-map access or boundary marker: ${phrase}.`);
}

if (failures.length) {
  console.error(JSON.stringify({ valid: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ valid: true, domains: domains.length, primarySources: sourceLinks.length, network: false, publishing: false }, null, 2));
