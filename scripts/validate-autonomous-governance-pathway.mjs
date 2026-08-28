import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const lessons = [
  { slug: "governance-roles-and-accountability", name: "Governance Roles and Accountability", next: "policy-envelopes-and-decision-points", previous: null, sources: ["nist.gov", "iso.org"] },
  { slug: "policy-envelopes-and-decision-points", name: "Policy Envelopes and Decision Points", next: "evaluation-monitoring-and-change-control", previous: "governance-roles-and-accountability", sources: ["openpolicyagent.org", "nist.gov"] },
  { slug: "evaluation-monitoring-and-change-control", name: "Evaluation, Monitoring, and Change Control", next: "exceptions-appeals-and-continual-improvement", previous: "policy-envelopes-and-decision-points", sources: ["nist.gov", "iso.org"] },
  { slug: "exceptions-appeals-and-continual-improvement", name: "Exceptions, Appeals, and Continual Improvement", next: null, previous: "evaluation-monitoring-and-change-control", sources: ["nist.gov", "iso.org"] },
];

const failures = [];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => { if (!condition) failures.push(message); };

const home = read("index.html");
const llms = read("llms.txt");
const sitemap = read("sitemap.xml");
const brief = read("docs/autonomous-governance-content-brief.md");
const notes = read("docs/autonomous-governance-source-notes.md");

assert(home.includes('id="autonomous-governance"'), "homepage is missing the section 09 autonomous-governance anchor");
assert(home.includes("AUTONOMOUS GOVERNANCE / POLICY ENVELOPES"), "homepage is missing the section 09 label");
assert(home.includes("Autonomous Governance and Policy Envelopes lessons"), "homepage is missing the section 09 lesson-list label");
assert(llms.includes("## Autonomous Governance and Policy Envelopes Learning"), "llms.txt is missing the section 09 heading");
const briefLower = brief.toLowerCase();
assert(briefLower.includes("legal compliance") && briefLower.includes("safety") && briefLower.includes("iso certification") && briefLower.includes("policy decision is not enforcement"), "section 09 brief must state its governance claim boundaries");
assert(notes.includes("NIST AI Risk Management Framework") && notes.includes("Open Policy Agent") && notes.includes("ISO/IEC 42001"), "section 09 source notes must name its primary sources");

for (const lesson of lessons) {
  const file = `learning/${lesson.slug}/index.html`;
  const html = read(file);
  const canonical = `${base}/learning/${lesson.slug}/`;
  assert(html.includes(`<title>${lesson.name} | AI Mastery</title>`), `${file}: title mismatch`);
  assert(html.includes(`href="${canonical}"`), `${file}: canonical URL missing`);
  assert(html.includes('"@type":"LearningResource"'), `${file}: LearningResource metadata missing`);
  assert(html.includes('class="boundary shell"'), `${file}: learning boundary missing`);
  assert(html.includes("not "), `${file}: bounded non-claim language missing`);
  assert(html.includes("Practice lab"), `${file}: practice lab missing`);
  assert(html.includes("Source shelf"), `${file}: source shelf missing`);
  assert(html.includes("Governance overview"), `${file}: pillar link missing`);
  for (const host of lesson.sources) assert(html.includes(host), `${file}: expected source host ${host} missing`);
  assert(llms.includes(canonical), `llms.txt: ${lesson.slug} missing`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap.xml: ${lesson.slug} missing`);
  if (lesson.previous) assert(html.includes(`../${lesson.previous}/`), `${file}: previous lesson link missing`);
  if (lesson.next) assert(html.includes(`../${lesson.next}/`), `${file}: next lesson link missing`);
  for (const match of html.matchAll(/href="(\.\.?\/[^"#]+)"/g)) {
    const href = match[1];
    const resolved = path.normalize(path.join(root, path.dirname(file), href));
    assert(fs.existsSync(resolved), `${file}: broken relative link ${href}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`PASS: ${lessons.length} section 09 lessons, homepage pathway, reciprocal routes, source shelves, boundaries, llms.txt, sitemap.xml, and local-link checks passed.`);
