# AI Mastery

AI Mastery is Mason Nguyen's technical knowledge and systems architecture platform for artificial intelligence, knowledge systems, agentic computing, production infrastructure, and digital trust.

## Local preview

No build step or package installation is required.

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Deployment

The site is a zero-dependency static document and can be served from GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static web server. Canonical discovery files currently target `https://virtualmase.github.io/ai-mastery/`; update them together if a custom domain is connected.

## Discovery surface

- Semantic HTML and responsive CSS
- JSON-LD for Mason Nguyen, AI Mastery, and the website
- LearningResource JSON-LD for the operator and GEO learning pages
- Open Graph and Twitter card metadata
- `robots.txt`, `sitemap.xml`, and `llms.txt`
- Reduced-motion support and keyboard-accessible navigation

## Learning paths

- Operator foundations: mandate, identity and signing, payment policy, settlement versus fulfillment, and exception handling
- GEO foundations: entity clarity, structured data, retrieval surface, source attribution, and currency decay
- Knowledge Index: twelve connected research domains, each organized around a system question, a bounded set of methods, and the next layer a learner should inspect.

Run `node scripts/validate-knowledge-index.mjs` to verify the connected domain anchors, source shelf, styling hooks, and machine-readable handoff before publishing a change to the index.

## Identity source

Mason Nguyen's professional roles and identity links are cross-referenced against his canonical [Coreweaver author profile](https://coreweaver.io/authors/mason-nguyen).
