import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "scripts/aure-silos.json"), "utf8"));
const directory = fs.readFileSync(path.join(root, "aure/index.html"), "utf8");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(manifest.length === 16, `expected 16 silos, found ${manifest.length}`);
expect((directory.match(/class="aure-phase"/g) || []).length === 4, "directory must expose four curriculum phases");
expect((directory.match(/class="aure-artifact"/g) || []).length === 16, "directory must label all sixteen artifacts");
expect(directory.includes('href="aure.css"'), "directory must load the shared AURE stylesheet");
expect(!directory.includes("<style>"), "directory must not carry inline legacy CSS");

for (const silo of manifest) {
  const route = path.join(root, "aure", silo.slug, "index.html");
  const html = fs.readFileSync(route, "utf8");
  const label = `AURE ${silo.number}`;
  expect(html.includes('href="../aure.css"'), `${label} must load shared AURE CSS`);
  expect(!html.includes("<style>"), `${label} must not carry inline legacy CSS`);
  expect(html.includes('aria-label="Breadcrumb"') && html.includes(silo.title), `${label} needs a titled breadcrumb`);
  for (const marker of ["aure-progress", "Working artifact", "Evidence boundary", "The SOUL check", "AURE pathway navigation"]) {
    expect(html.includes(marker), `${label} is missing ${marker}`);
  }
}

if (failures.length) {
  console.error(JSON.stringify({ valid: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ valid: true, silos: manifest.length, phases: 4, sharedStylesheet: true, inlineLegacyCss: false }, null, 2));
