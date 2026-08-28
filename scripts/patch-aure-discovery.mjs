import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const silos = JSON.parse(fs.readFileSync(path.join(root, "scripts/aure-silos.json"), "utf8"));
const cards = silos.map((s) => `<li><a href="aure/${s.slug}/"><span>${s.number} / 16</span><strong>${s.title}</strong><b>BUILD THE ARTIFACT →</b></a></li>`).join("\n");
const section = `    <section class="aure-directory section-shell" id="aure" aria-labelledby="aure-title">\n      <div class="section-heading" data-reveal>\n        <div class="section-marker"><span>AURE</span><p>16 SILOS / ONE TRUSTED BUYER PATH</p></div>\n        <div><h2 id="aure-title">Make good work<br><em>get picked.</em></h2><p>AURE is the Coreweaver operating school for evidence-led buyer trust, autonomous resource management, and accountable agentic work. Each silo ends in an artifact, a bounded decision, and a clear unknowns record.</p><p><a href="aure/">Open the full 16-silo directory →</a></p></div>\n      </div>\n      <ol class="aure-directory-grid" aria-label="Sixteen AURE learning silos">\n${cards}\n      </ol>\n    </section>\n`;
const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
if (!index.includes('id="aure"')) {
  index = index.replace('    <section class="principles section-shell"', section + '    <section class="principles section-shell"');
  fs.writeFileSync(indexPath, index);
}
const cssPath = path.join(root, "styles.css");
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".aure-directory-grid")) {
  css += `\n/* AURE directory: editorial, light, portable. */\n.aure-directory{padding-top:6rem;padding-bottom:6rem}.aure-directory-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;list-style:none;margin:2rem 0 0;padding:0}.aure-directory-grid li{border:1px solid var(--line,#cfc8ba);background:var(--paper,#fbfaf6)}.aure-directory-grid a{display:block;padding:1.25rem;color:inherit;text-decoration:none}.aure-directory-grid a:hover,.aure-directory-grid a:focus{background:#e8e1d5}.aure-directory-grid span,.aure-directory-grid b{display:block;color:#7d4b32;font-size:.72rem;letter-spacing:.08em}.aure-directory-grid strong{display:block;font-size:1.25rem;margin:.35rem 0}.aure-directory-grid b{margin-top:.8rem}@media(max-width:700px){.aure-directory-grid{grid-template-columns:1fr}}\n`;
  fs.writeFileSync(cssPath, css);
}
const llmsPath = path.join(root, "llms.txt");
let llms = fs.readFileSync(llmsPath, "utf8");
if (!llms.includes("## AURE — 16 Learning Silos")) {
  llms += `\n## AURE — 16 Learning Silos\n- Directory: ${base}/aure/\n  - Coreweaver's sixteen-silo operating school. Each silo produces an inspectable artifact and bounded decision. Educational material only; it does not guarantee rankings, retrieval, revenue, safety, interoperability, or conversion.\n`;
  for (const s of silos) llms += `- ${s.title}: ${s.url}\n  - ${s.description} Artifact: ${s.artifact}. Unknown remains unknown.\n`;
  fs.writeFileSync(llmsPath, llms);
}
const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
if (!sitemap.includes(`${base}/aure/`)) {
  const entries = [`  <url><loc>${base}/aure/</loc><lastmod>2026-08-28</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`, ...silos.map((s) => `  <url><loc>${s.url}</loc><lastmod>2026-08-28</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`)].join("\n");
  sitemap = sitemap.replace("</urlset>", entries + "\n</urlset>");
  fs.writeFileSync(sitemapPath, sitemap);
}
console.log("Patched homepage, llms.txt, and sitemap.xml for AURE.");
