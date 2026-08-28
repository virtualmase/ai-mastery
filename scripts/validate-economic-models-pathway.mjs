import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const lessons = [
  { slug: "value-payment-and-fulfillment", name: "Value, Payment, and Fulfillment", next: "mandates-spend-limits-and-policy", previous: null, sources: ["iso20022.org", "bis.org"] },
  { slug: "mandates-spend-limits-and-policy", name: "Mandates, Spend Limits, and Policy", next: "reconciliation-disputes-and-exceptions", previous: "value-payment-and-fulfillment", sources: ["pcisecuritystandards.org", "modelcontextprotocol.io", "a2a-protocol.org"] },
  { slug: "reconciliation-disputes-and-exceptions", name: "Reconciliation, Disputes, and Exceptions", next: "incentives-fees-and-risk-allocation", previous: "mandates-spend-limits-and-policy", sources: ["iso20022.org", "jsonrpc.org", "pcisecuritystandards.org"] },
  { slug: "incentives-fees-and-risk-allocation", name: "Incentives, Fees, and Risk Allocation", next: null, previous: "reconciliation-disputes-and-exceptions", sources: ["bis.org", "iso20022.org", "nist.gov"] },
];

const failures = [];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => { if (!condition) failures.push(message); };

const home = read("index.html");
const llms = read("llms.txt");
const sitemap = read("sitemap.xml");
const brief = read("docs/economic-models-content-brief.md");

assert(home.includes('id="economic-models"'), "homepage is missing the section 08 economic-models anchor");
assert(home.includes("ECONOMIC MODELS / AGENTIC COMMERCE"), "homepage is missing the section 08 label");
assert(home.includes("Economic Models and Agentic Commerce lessons"), "homepage is missing the section 08 lesson-list label");
assert(llms.includes("## Economic Models and Agentic Commerce Learning"), "llms.txt is missing the section 08 heading");
assert(brief.includes("consumer-finance advice") && brief.includes("investment"), "section 08 brief must state its financial-advice boundary");
assert(brief.includes("ISO 20022"), "section 08 brief must name ISO 20022");
assert(brief.includes("BIS"), "section 08 brief must name BIS");

for (const lesson of lessons) {
  const file = `learning/${lesson.slug}/index.html`;
  const html = read(file);
  const canonical = `${base}/learning/${lesson.slug}/`;
  assert(html.includes(`<title>${lesson.name} | AI Mastery</title>`), `${file}: title mismatch`);
  assert(html.includes(`href="${canonical}"`), `${file}: canonical URL missing`);
  assert(html.includes('"@type":"LearningResource"'), `${file}: LearningResource metadata missing`);
  assert(html.includes('class="boundary shell"'), `${file}: learning boundary missing`);
  assert(html.includes("not "), `${file}: bounded non-advice language missing`);
  assert(html.includes("Practice lab"), `${file}: practice lab missing`);
  assert(html.includes("Source shelf"), `${file}: source shelf missing`);
  assert(html.includes("Economic Models overview"), `${file}: pillar link missing`);
  for (const host of lesson.sources) assert(html.includes(host), `${file}: expected source host ${host} missing`);
  assert(llms.includes(canonical), `llms.txt: ${lesson.slug} missing`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap.xml: ${lesson.slug} missing`);
  if (lesson.previous) assert(html.includes(`../${lesson.previous}/`), `${file}: previous lesson link missing`);
  if (lesson.next) assert(html.includes(`../${lesson.next}/`), `${file}: next lesson link missing`);
  for (const match of html.matchAll(/href="(\.\.?\/[^"#]+)"/g)) {
    const href = match[1];
    if (href.startsWith("../")) {
      const resolved = path.normalize(path.join(root, path.dirname(file), href));
      assert(fs.existsSync(resolved), `${file}: broken relative link ${href}`);
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`PASS: ${lessons.length} section 08 lessons, homepage pathway, reciprocal routes, source shelves, boundaries, llms.txt, sitemap.xml, and local-link checks passed.`);
