# Internal-link policy

## Default

All Coreweaver and AI Mastery internal navigation uses ordinary HTML anchors with descriptive href values. This is the project’s default-follow standard. No `rel="dofollow"` attribute is added because `dofollow` is not a required HTML link value; the absence of restrictive link directives is the normal crawlable state.

```html
<a href="/learning/example/">Read the lesson</a>
```

Internal links should be visible, understandable, keyboard reachable, and connected to a real route. JavaScript-only navigation must not replace an ordinary anchor when a crawlable page destination exists.

## Exceptions

`rel="nofollow"`, `rel="ugc"`, and `rel="sponsored"` may be used only when their semantic reason is documented in the change record. They are not defaults for internal navigation. A `noindex` directive is also not a substitute for link policy and requires an independent indexing decision.

External links may carry attributes appropriate to their context, including `noopener` for a new browsing context and `nofollow`, `ugc`, or `sponsored` when the relationship warrants it. Those external-link decisions must not silently propagate to internal links.

## Release check

Every release should run:

```sh
node scripts/audit-internal-link-policy.mjs
```

The check must report zero restricted internal links, zero JavaScript-only internal links, and zero unintended `noindex` pages. This policy establishes crawlable structure; it does not guarantee PageRank transfer, domain-authority growth, rankings, citations, or search placement.
