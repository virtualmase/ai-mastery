# Machine-Readable Internet Lesson Cluster: Content Brief

## Audience and moment

This cluster serves builders, publishers, and technical writers who need to make public knowledge easier to identify, connect, and update without treating metadata as a shortcut to ranking, citation, retrieval, or trust.

## Page job and reader question

The **Machine-Readable Internet** section is the pillar. Three supporting lessons answer three practical questions: how does a public entity receive an inspectable canonical record; how does structured data express relationships without manufacturing facts; and how do sitemap and crawler-discovery files describe a public route without controlling another system’s behavior?

## Unique contribution and claim boundary

The cluster contributes a modest **name → describe → discover → recheck** framework. It must not claim that JSON-LD produces a knowledge-graph entry, schema markup produces a rich result, a sitemap produces indexing, `robots.txt` authorizes access, or `llms.txt` requires a model or crawler to retrieve, cite, rank, or follow a page.

## Evidence plan

JSON-LD 1.1 specifies a JSON-based serialization for Linked Data and introduces identifiers, contexts, and relationship graphs [1]. The Sitemap protocol describes a UTF-8 XML format in which each listed URL has a `loc` entry; optional fields are hints rather than crawl commands [2]. RFC 9309 specifies crawler-requested robots exclusion rules and states that those rules are not access authorization [3].

## Information architecture and reciprocal links

| Page | Reader job | Supporting links |
| --- | --- | --- |
| Machine-Readable Internet section | Orient a reader to legible public records, connected data, and discovery boundaries. | All three supporting lessons; Knowledge Index; self-audit. |
| Canonical Entity Records | Define an unambiguous subject, canonical URL, stable fields, and maintenance owner. | Machine-Readable Internet pillar; Structured Relationship Data. |
| Structured Relationship Data | Express documented relationships and claim boundaries in JSON-LD without adding unsupported facts. | Canonical records; Discovery Files and Crawl Boundaries. |
| Discovery Files and Crawl Boundaries | Publish accurate route listings and access preferences without promising index or retrieval outcomes. | Structured data; Machine-Readable Internet pillar; self-audit. |

## Release and maintenance

Every page needs a visible learning boundary, primary source shelf, canonical URL, `LearningResource` metadata, practice lab, reciprocal navigation, sitemap entry, and `llms.txt` listing. Run `node scripts/validate-machine-readable-pathway.mjs` before review. Recheck when a cited specification changes, a new public source type is adopted, or a reader-facing example could be misread as an indexing, ranking, access-control, or model-behavior promise.

## References

[1] [W3C, JSON-LD 1.1](https://www.w3.org/TR/json-ld11/)

[2] [sitemaps.org, Sitemap XML format](https://www.sitemaps.org/protocol.html)

[3] [IETF RFC 9309, Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)
