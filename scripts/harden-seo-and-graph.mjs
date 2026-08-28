import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") htmlFiles.push(full);
  }
}
walk(root);
const routeFor = (file) => {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  return `/${rel.replace(/\/index\.html$/, "")}/`;
};
const titleFrom = (html) => html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "AI Mastery";
const descriptionFrom = (html) => html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] || "Evidence-led learning for accountable agentic systems and trusted buyer paths.";
const injectMeta = (html, route) => {
  const title = titleFrom(html).replaceAll('"', "&quot;");
  const description = descriptionFrom(html).replaceAll('"', "&quot;");
  const url = `${base}${route}`;
  let out = html;
  if (!/<meta\s+name=["']robots["']/i.test(out)) out = out.replace("</head>", '<meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#f4f1ea">\n</head>');
  if (!/<meta\s+property=["']og:title["']/i.test(out)) out = out.replace("</head>", `<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}">\n</head>`);
  if (!/<link\s+rel=["']canonical["']/i.test(out)) out = out.replace("</head>", `<link rel="canonical" href="${url}">\n</head>`);
  out = out.replace(/<img\b(?![^>]*\balt=)/gi, '<img alt=""');
  out = out.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');
  out = out.replace(/<img\b(?![^>]*\bdecoding=)/gi, '<img decoding="async"');
  return out;
};
const footerLinks = (route) => {
  const depth = route.split("/").filter(Boolean).length;
  const prefix = "../".repeat(depth);
  return `<nav class="site-footer-links" aria-label="Site directory"><a href="${prefix}">Home</a><a href="${prefix}aure/">AURE / 16 silos</a><a href="${prefix}directory/">All pages</a><a href="${prefix}llms.txt">Machine-readable index</a><a href="${prefix}sitemap.xml">Sitemap</a></nav>`;
};
for (const file of htmlFiles) {
  const route = routeFor(file);
  let html = injectMeta(fs.readFileSync(file, "utf8"), route);
  if (!html.includes("site-footer-links")) html = html.replace("</body>", `${footerLinks(route)}\n</body>`);
  if (route.startsWith("/aure/") && route !== "/aure/") {
    html = html.replace(/<header class="shell" style="padding:1\.2rem 0">/, '<header class="shell aure-sticky" style="padding:1.2rem 0">');
    if (!html.includes('aria-label="Breadcrumb"')) html = html.replace("</header>", `<nav class="aure-breadcrumb" aria-label="Breadcrumb"><a href="../../">Home</a><span aria-hidden="true">/</span><a href="../">AURE</a><span aria-hidden="true">/</span><span>Current silo</span></nav></header>`);
  }
  fs.writeFileSync(file, html);
}
let cssPath = path.join(root, "styles.css");
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".site-footer-links")) css += `\n/* Technical SEO support: crawlable footer and accessible persistent pathway navigation. */\n.site-footer-links{display:flex;flex-wrap:wrap;gap:.8rem 1.2rem;max-width:1100px;margin:2rem auto 0;padding:1rem 1.5rem;border-top:1px solid rgba(120,120,110,.35);font-size:.82rem}.site-footer-links a{color:inherit;text-underline-offset:.2em}.aure-sticky{position:sticky!important;top:0;z-index:20;background:rgba(244,241,234,.94);backdrop-filter:blur(10px);border-bottom:1px solid rgba(120,120,110,.25)}.aure-breadcrumb{display:flex;gap:.55rem;align-items:center;margin-top:.65rem;font-size:.78rem}.aure-breadcrumb a{color:inherit}.aure-breadcrumb span:last-child{opacity:.65}@media(max-width:700px){.site-footer-links{gap:.6rem .9rem}}\n`;
fs.writeFileSync(cssPath, css);
const routes = htmlFiles.map(routeFor).filter((route) => route !== "/directory/").sort();
const entries = routes.map((route) => {
  const file = path.join(root, route.replace(/^\//, ""), "index.html");
  const title = titleFrom(fs.readFileSync(file, "utf8"));
  return `<li><a href="${route}">${title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</a><small>${route}</small></li>`;
}).join("\n");
const directory = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>All pages — AI Mastery</title><meta name="description" content="A crawlable directory of the AI Mastery and AURE learning system."><link rel="canonical" href="${base}/directory/"><link rel="stylesheet" href="../styles.css"><meta name="robots" content="index,follow"><style>body{background:#f4f1ea;color:#1e2924}.shell{max-width:980px;margin:auto;padding:0 1.5rem}.directory-hero{padding:6rem 0 3rem;border-bottom:1px solid #cfc8ba}.directory-hero h1{font-size:clamp(3rem,7vw,6rem);line-height:.9;letter-spacing:-.06em}.directory-list{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;padding:3rem 0 6rem;margin:0}.directory-list li{border:1px solid #cfc8ba;background:#fbfaf6;padding:1rem}.directory-list a{display:block;color:inherit;font-weight:800;text-decoration:none}.directory-list small{display:block;color:#6d756f;margin-top:.3rem;overflow-wrap:anywhere}@media(max-width:700px){.directory-list{grid-template-columns:1fr}}</style></head><body><header class="shell aure-sticky" style="padding:1.2rem 0"><a href="../" style="color:inherit;text-decoration:none;font-weight:800">AI MASTERY</a></header><main><section class="directory-hero"><div class="shell"><div style="text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:700;color:#7d4b32">Crawlable directory</div><h1>Every page has a path.</h1><p>Home → directory → page. This index keeps the system navigable for people, crawlers, and agents without relying on hidden state.</p></div></section><section class="shell"><ol class="directory-list" aria-label="All published pages">${entries}</ol></section></main>${footerLinks("/directory/")}</body></html>`;
fs.mkdirSync(path.join(root, "directory"), { recursive: true });
fs.writeFileSync(path.join(root, "directory/index.html"), directory);
const rootPath = path.join(root, "index.html");
let rootHtml = fs.readFileSync(rootPath, "utf8");
if (!rootHtml.includes('href="directory/"')) rootHtml = rootHtml.replace(/(<nav aria-label="Footer navigation">)/, '$1<a href="directory/">All pages</a>');
fs.writeFileSync(rootPath, rootHtml);
console.log(`Hardened ${htmlFiles.length} HTML pages and generated directory with ${routes.length} entries.`);
