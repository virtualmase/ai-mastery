import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const lessons = [
  {
    slug: "protocol-roles-and-boundaries",
    name: "Protocol Roles and Boundaries",
    previous: null,
    next: "message-envelopes-and-correlation",
    sources: ["modelcontextprotocol.io", "a2a-protocol.org"],
  },
  {
    slug: "message-envelopes-and-correlation",
    name: "Message Envelopes and Correlation",
    previous: "protocol-roles-and-boundaries",
    next: "capability-discovery-and-negotiation",
    sources: ["jsonrpc.org", "a2a-protocol.org"],
  },
  {
    slug: "capability-discovery-and-negotiation",
    name: "Capability Discovery and Negotiation",
    previous: "message-envelopes-and-correlation",
    next: "task-state-and-human-handoffs",
    sources: ["modelcontextprotocol.io", "a2a-protocol.org"],
  },
  {
    slug: "task-state-and-human-handoffs",
    name: "Task State and Human Handoffs",
    previous: "capability-discovery-and-negotiation",
    next: null,
    sources: ["a2a-protocol.org", "modelcontextprotocol.io"],
  },
];

const failures = [];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const home = read("index.html");
const llms = read("llms.txt");
const sitemap = read("sitemap.xml");
const brief = read("docs/agentic-interoperability-content-brief.md");
const css = read("learning/agentic-interoperability-foundations.css");

assert(home.includes('id="interoperability"'), "homepage is missing the section 07 interoperability anchor");
assert(home.includes("INTEROPERABILITY PATHWAY"), "homepage is missing the section 07 pathway label");
assert(home.includes("Agentic interoperability lessons"), "homepage is missing the section 07 lesson-list label");
assert(llms.includes("## Agentic Interoperability and Workflow Primitives Learning"), "llms.txt is missing the section 07 heading");
assert(brief.includes("MCP"), "section 07 brief must name MCP");
assert(brief.includes("A2A"), "section 07 brief must name A2A");
assert(brief.includes("JSON-RPC"), "section 07 brief must name JSON-RPC");
assert(css.includes("prefers-reduced-motion"), "section 07 stylesheet is missing reduced-motion handling");

for (const lesson of lessons) {
  const file = `learning/${lesson.slug}/index.html`;
  const html = read(file);
  const canonical = `${base}/learning/${lesson.slug}/`;
  assert(html.includes(`<title>${lesson.name} | AI Mastery</title>`), `${file}: title mismatch`);
  assert(html.includes(`href="${canonical}"`), `${file}: canonical URL missing`);
  assert(html.includes('"@type":"LearningResource"'), `${file}: LearningResource metadata missing`);
  assert(html.includes('class="boundary shell"'), `${file}: learning boundary missing`);
  assert(html.includes("does not"), `${file}: bounded non-guarantee language missing`);
  assert(html.includes("Practice lab"), `${file}: practice lab missing`);
  assert(html.includes("Source shelf"), `${file}: source shelf missing`);
  assert(html.includes("Agentic Interoperability overview"), `${file}: pillar link missing`);
  for (const sourceHost of lesson.sources) {
    assert(html.includes(sourceHost), `${file}: expected source host ${sourceHost} missing`);
  }
  assert(llms.includes(canonical), `llms.txt: ${lesson.slug} missing`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap.xml: ${lesson.slug} missing`);
  if (lesson.previous) assert(html.includes(`../${lesson.previous}/`), `${file}: previous lesson link missing`);
  if (lesson.next) assert(html.includes(`../${lesson.next}/`), `${file}: next lesson link missing`);
}

const files = lessons.map(({ slug }) => `learning/${slug}/index.html`);
for (const file of files) {
  const html = read(file);
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

console.log(`PASS: ${lessons.length} section 07 lessons, reciprocal routes, source shelves, claim boundaries, llms.txt, sitemap.xml, and responsive stylesheet checks passed.`);
