import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = new Map();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") pages.set(routeFor(full), full);
  }
}
const routeFor = (file) => {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  return rel === "index.html" ? "/" : `/${rel.replace(/\/index\.html$/, "")}/`;
};
walk(root);
const normalize = (href, from) => {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http:") || href.startsWith("https:") || href.startsWith("javascript:")) return null;
  const clean = href.split("#")[0].split("?")[0];
  const fromFile = pages.get(from);
  if (!fromFile) return null;
  const fromDir = path.dirname(fromFile);
  const target = path.resolve(fromDir, clean);
  let route = routeFor(target);
  if (clean.endsWith("/")) route = `/${path.relative(root, target).replaceAll(path.sep, "/")}`;
  if (route !== "/" && !route.endsWith("/")) route += "/";
  return pages.has(route) ? route : null;
};
const graph = new Map();
for (const [route, file] of pages) {
  const html = fs.readFileSync(file, "utf8");
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => normalize(m[1], route)).filter(Boolean);
  graph.set(route, new Set(links));
  const required = ["<title>", 'name="description"', 'rel="canonical"', 'name="robots"'];
  const missing = required.filter((marker) => !html.includes(marker));
  if (missing.length) throw new Error(`${route}: missing ${missing.join(", ")}`);
  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=/.test(img[0]) || !/\bloading=/.test(img[0]) || !/\bdecoding=/.test(img[0])) throw new Error(`${route}: image missing alt/loading/decoding`);
  }
}
const distance = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const current = queue.shift();
  for (const next of graph.get(current) || []) if (!distance.has(next)) { distance.set(next, distance.get(current) + 1); queue.push(next); }
}
const orphan = [...pages.keys()].filter((route) => !distance.has(route));
const beyondTwo = [...pages.keys()].filter((route) => distance.get(route) > 2);
if (orphan.length || beyondTwo.length) throw new Error(`orphan=${JSON.stringify(orphan)} beyondTwo=${JSON.stringify(beyondTwo)}`);
const aure = [...pages.keys()].filter((r) => r.startsWith("/aure/") && r !== "/aure/");
if (aure.length !== 16) throw new Error(`expected 16 AURE silo pages, found ${aure.length}`);
console.log(JSON.stringify({ pages: pages.size, reachable: distance.size, maxClicks: Math.max(...distance.values()), orphan, beyondTwo, aureSilos: aure.length }, null, 2));
