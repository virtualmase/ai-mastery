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
  const hasDeliberateFooter = html.includes("site-footer-links") || html.includes('aria-label="Site directory"') || /<footer\b/i.test(html);
  if (!hasDeliberateFooter) html = html.replace("</body>", `${footerLinks(route)}\n</body>`);
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
const decodeTitle = (value) => value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
const escapeText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const entryFor = (route) => {
  const file = path.join(root, route.replace(/^\//, ""), "index.html");
  const title = escapeText(decodeTitle(titleFrom(fs.readFileSync(file, "utf8"))));
  return `<li><a href="..${route}"><strong>${title}</strong><small>${route}<span class="directory-arrow" aria-hidden="true">↗</span></small></a></li>`;
};
const collections = [
  { id: "publication", label: "Publication", title: "Start and orient", description: "The flagship, author record, and curated guide index.", routes: routes.filter((route) => ["/", "/author/", "/guides/"].includes(route)) },
  { id: "field-work", label: "Guides and records", title: "Use the work", description: "Decision guides and dated field records with explicit evidence boundaries.", routes: routes.filter((route) => (route.startsWith("/guides/") && route !== "/guides/") || route.startsWith("/case-studies/")) },
  { id: "aure", label: "AURE curriculum", title: "Follow the buyer path", description: "Sixteen progressive artifacts from buyer truth and evidence to handoff and maintenance.", routes: routes.filter((route) => route === "/aure/" || route.startsWith("/aure/")) },
  { id: "learning", label: "Learning library", title: "Study the system", description: "Focused technical lessons across autonomy, trust, machine-readable knowledge, interoperability, and commerce.", routes: routes.filter((route) => route.startsWith("/learning/")) },
  { id: "implementation", label: "Implementation reference", title: "Inspect the machinery", description: "Public template output retained for portability and implementation review.", routes: routes.filter((route) => route === "/aure-template-demo/") }
];
const collectionMarkup = collections.map((collection) => `<section class="directory-section" id="${collection.id}"><div class="directory-section-head"><p class="directory-kicker">${collection.label} · ${String(collection.routes.length).padStart(2, "0")} routes</p><h2>${collection.title}</h2><p>${collection.description}</p>${collection.id === "implementation" ? '<div class="directory-note">Reference output is separated from the editorial curriculum so readers do not mistake a template demonstration for an additional AURE lesson.</div>' : ""}</div><ol class="directory-list" aria-label="${collection.label}">${collection.routes.map(entryFor).join("")}</ol></section>`).join("");
const directory = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Publication Index — AI Mastery</title><meta name="description" content="The complete, curated index of AI Mastery guides, field records, AURE curriculum, and technical learning routes."><link rel="canonical" href="${base}/directory/"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="directory.css"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="theme-color" content="#20221f"><meta property="og:type" content="website"><meta property="og:site_name" content="AI Mastery"><meta property="og:title" content="Publication Index — AI Mastery"><meta property="og:description" content="The complete, curated index of guides, field records, learning paths, and technical lessons."><meta property="og:url" content="${base}/directory/"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":"Publication Index — AI Mastery","description":"The complete, curated index of AI Mastery guides, field records, AURE curriculum, and technical learning routes.","url":`${base}/directory/`,"isPartOf":{"@type":"WebSite","name":"AI Mastery","url":`${base}/`}})}</script></head><body><header class="directory-topbar"><div class="directory-shell"><a class="directory-brand" href="../">AI MASTERY <span>/ INDEX</span></a><nav class="directory-nav" aria-label="Primary navigation"><a href="../guides/">Guides</a><a href="../aure/">AURE</a><a href="../">Return home</a></nav></div></header><main><section class="directory-hero"><div class="directory-shell directory-hero-grid"><div><p class="directory-kicker">Complete publication graph</p><h1>Every page has a purpose.</h1><p>A human-readable map of the guides, evidence records, curricula, and technical lessons that make up AI Mastery.</p></div><aside class="directory-stat"><div><strong>${routes.length}</strong><span>Published routes</span></div><div><strong>${collections.length}</strong><span>Editorial collections</span></div></aside></div></section><div class="directory-shell directory-index">${collectionMarkup}</div></main><footer class="directory-footer"><div class="directory-shell"><span>AI MASTERY · Complete publication index</span><nav aria-label="Site directory"><a href="../">Home</a><a href="../guides/">Guides</a><a href="../aure/">AURE</a><a href="../llms.txt">Machine-readable index</a><a href="../sitemap.xml">Sitemap</a></nav></div></footer></body></html>`;
fs.mkdirSync(path.join(root, "directory"), { recursive: true });
fs.writeFileSync(path.join(root, "directory/index.html"), directory);
const rootPath = path.join(root, "index.html");
let rootHtml = fs.readFileSync(rootPath, "utf8");
if (!rootHtml.includes('href="directory/"')) rootHtml = rootHtml.replace(/(<nav aria-label="Footer navigation">)/, '$1<a href="directory/">All pages</a>');
fs.writeFileSync(rootPath, rootHtml);
console.log(`Hardened ${htmlFiles.length} HTML pages and generated directory with ${routes.length} entries.`);
