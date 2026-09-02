# Contributing to AI Mastery

AI Mastery accepts contributions that make its technical knowledge more accurate, reproducible, inspectable, or useful. Strong contributions include implementation patterns, benchmark records, source corrections, case evidence, and improvements to the public knowledge graph.

## Before opening a change

Open an issue or focused pull request that states:

- the technical question or reader problem;
- the proposed claim and the evidence supporting it;
- what a reader can reproduce or inspect;
- important limits, unknowns, and dependencies;
- which existing guide, learning path, or entity the work connects to.

Do not submit promotional listicles, unverified performance claims, fabricated citations, undisclosed sponsored links, secrets, private data, or code copied without compatible permission.

## Content standards

Write for both people and machine retrieval:

1. Begin each key concept with a direct, self-contained definition.
2. Organize the page with one `h1` and descriptive `h2`/`h3` sections.
3. Use specific anchor text that names the destination concept.
4. Prefer primary sources, standards, official documentation, and reproducible evidence.
5. Separate observed facts, derived conclusions, proposals, and unknowns.
6. Include prerequisites, implementation steps, expected outputs, failure modes, and a verification method when publishing a blueprint.
7. Add or update the relevant JSON-LD entity relationships, sitemap entry, and `llms.txt` record for a new public route.

Code examples must use placeholders for credentials and identify the runtime or dependency versions needed to reproduce them.

## Evidence and corrections

A case study or benchmark should include a dated observation window, method, inputs, outputs, and explicit claim boundaries. If a result cannot be independently verified, describe it as reported or proposed rather than established.

For a small factual correction, open a pull request with the replacement source. For a disputed or larger correction, open an issue describing the affected URL, statement, supporting evidence, and requested change. Corrections should preserve an inspectable history rather than silently expanding a claim.

## Local validation

No package installation or build step is required. Preview the site from the repository root:

```bash
python3 -m http.server 4173
```

Before submitting a pull request, run the same core checks used by CI:

```bash
node scripts/validate-site-graph.mjs
node scripts/audit-internal-link-policy.mjs
node scripts/validate-editorial-expansion.mjs
node scripts/validate-publication-index.mjs
git diff --check
```

Run the pathway-specific validator for any collection you change. A pull request should explain the checks run and any validation that remains external or manual.

## Pull request scope

Keep each pull request centered on one coherent outcome. Include:

- a concise summary of the reader-facing change;
- routes, schemas, or scripts affected;
- evidence and source links;
- screenshots for meaningful visual changes;
- validation results;
- unresolved risks or follow-up work.

By contributing, you confirm that you have the right to submit the material and that it does not expose confidential information.
