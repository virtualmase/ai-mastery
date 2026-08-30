import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const html = fs.readFileSync(path.join(root, "directory/index.html"), "utf8");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const routeLinks = [...html.matchAll(/<li><a href="\.\.([^"#?]*)"/g)].map(match => match[1]);
const indexedRoutes = routeLinks.filter(route => route === "/" || route.endsWith("/"));

expect(html.includes('href="directory.css"'), "publication index must load its shared stylesheet");
expect(!html.includes("<style>"), "publication index must not carry inline legacy CSS");
expect((html.match(/class="directory-section"/g) || []).length === 5, "publication index must expose five editorial collections");
expect(html.includes("Implementation reference"), "template output must be labeled as an implementation reference");
expect(!html.includes("amp;amp"), "titles must not be double encoded");
expect(html.includes("AURE — The trusted buyer path"), "AURE directory title must be current");
expect(new Set(indexedRoutes).size === indexedRoutes.length, "each route must appear only once in the publication collections");
expect(indexedRoutes.length === 56, `expected 56 indexed destinations, found ${indexedRoutes.length}`);

if (failures.length) {
  console.error(JSON.stringify({ valid: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ valid: true, destinations: indexedRoutes.length, collections: 5, duplicateRoutes: 0, inlineLegacyCss: false }, null, 2));
