import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const content = JSON.parse(fs.readFileSync(path.join(root, "content/aure-template-demo.json"), "utf8"));
const template = fs.readFileSync(path.join(root, "templates/aure-silo.html"), "utf8");
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const practice = content.practice.map((item) => `<li>${esc(item)}</li>`).join("");
const canonical = `https://virtualmase.github.io/ai-mastery/aure-template-demo/`;
const jsonld = JSON.stringify({ "@context": "https://schema.org", "@type": "LearningResource", name: content.title, description: content.dek, url: canonical, isPartOf: { "@type": "Course", name: "AURE — Autonomous Resource Management and Evidence-led Buyer Trust" } }).replaceAll("<", "\\u003c");
const replacements = { title: esc(content.title), dek: esc(content.dek), number: esc(content.number), artifact: esc(content.artifact), objective: esc(content.objective), boundary: esc(content.boundary), practice, canonical, jsonld, nextUrl: esc(content.next.url), nextLabel: esc(content.next.label) };
let output = template;
for (const [key, value] of Object.entries(replacements)) output = output.replaceAll(`{{${key}}}`, value);
const outDir = path.join(root, "aure-template-demo");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), output);
console.log(`Rendered ${outDir}/index.html from structured content.`);
