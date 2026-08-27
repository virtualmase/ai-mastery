# ARM Pathway Content Brief

## Audience and moment

This pathway serves technical operators, product leaders, and systems designers who are deciding whether an AI-enabled workflow should only analyze information, recommend an action, execute a bounded task, or pause for a human decision.

## Page job and primary question

The public ARM overview is the pathway pillar. Foundations 02 through 05 are supporting lessons. Together they answer one practical question: **how can a team make an autonomous workflow’s resource scope, decision rights, trace record, and exception path inspectable before it acts?**

## Unique contribution and claim boundary

The contribution is a reusable inspection method, not a product claim. Each lesson converts a broad autonomy concept into a bounded review exercise: resource inventory, decision rights, trace records, or exception design. The lessons must not imply that following the method makes a system safe, compliant, secure, certified, legally authorized, or appropriate for a specific use.

## Evidence plan

The lessons label their own process guidance as an **operating framework**. Factual context is limited to current primary references: NIST AI RMF, the Model Context Protocol specification, OpenTelemetry GenAI Semantic Conventions, C2PA’s AI/ML guidance, and OWASP’s Agentic AI threats-and-mitigations reference. References are starting points for local evaluation; none supports a guarantee about a particular system.

## Information architecture and reciprocal links

| Page | Narrow reader job | Primary internal links |
| --- | --- | --- |
| ARM overview / Foundation 01 | Orient the reader to the resource-to-exception lifecycle. | Foundations 02–05. |
| Resource inventory / Foundation 02 | Identify direct and indirect resources before assigning any right. | Foundation 01, Foundation 03, Knowledge Index. |
| Decision rights / Foundation 03 | Separate analysis, recommendation, bounded execution, and escalation. | Foundation 02, Foundation 04, Foundation 01. |
| Trace records / Foundation 04 | Preserve the minimum evidence, context, action, outcome, and uncertainty needed for review. | Foundation 03, Foundation 05, Foundation 01. |
| Exception design / Foundation 05 | Turn a boundary breach or uncertainty into a named hold and accountable handoff. | Foundation 04, Foundation 01, Learning Paths. |

## Release and maintenance

The pathway is published only when every lesson has a canonical URL, `LearningResource` metadata, a visible learning boundary, one practice lab, source shelf, reciprocal navigation, a sitemap entry, and a matching `llms.txt` record. Run `node scripts/validate-arm-pathway.mjs` before release. Recheck source links, scope claims, and examples when a framework changes or a real workflow is proposed as evidence.
