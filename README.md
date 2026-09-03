# ai-mastery

**Learn the system. Build the model. Test the judgment.**

`ai-mastery` is the flagship learning repository from [virtualmase](https://github.com/virtualmase).

It is a public technical curriculum for developing engineering judgment across software, AI systems, architecture, knowledge systems, evaluation, operating boundaries, and maintenance.

The goal is not to collect more information about AI.

The goal is to become better at deciding:

- what should be built
- what should not be built
- which assumptions matter
- where a system can fail
- what evidence is good enough to act on
- what must remain under human judgment
- which tradeoffs are worth accepting
- how to make a change reversible
- what will still be understandable five years from now
- what the simplest useful implementation actually is

That is the standard for this repository.

**Public site:** https://virtualmase.github.io/ai-mastery/

## Start here

- Browse the [public site](https://virtualmase.github.io/ai-mastery/) for the main learning surface.
- Use the [guides](https://virtualmase.github.io/ai-mastery/guides/) when you have a specific technical decision to make.
- Follow the [AURE curriculum](https://virtualmase.github.io/ai-mastery/aure/) when you want a structured applied path.
- Inspect the [publication directory](https://virtualmase.github.io/ai-mastery/directory/) when you want the complete route map.
- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a source correction, case record, guide, or learning-path improvement.

## What mastery means here

Knowing how to call a model is not mastery.

Knowing the name of a framework is not mastery.

Shipping a complicated system is not mastery.

Mastery means being able to look at a technical problem and answer a harder set of questions:

> What is the system actually doing?
>
> What does it depend on?
>
> Which part is uncertain?
>
> What would prove or disprove the assumption?
>
> What happens when the normal path fails?
>
> Who is responsible for the consequential decision?
>
> What can be removed?
>
> What will another engineer need to understand later?

The material in `ai-mastery` is built to practice those questions repeatedly.

## The learning loop

Most material in this repository follows the same basic loop:

```text
question
   ↓
understand the system
   ↓
build a useful mental model
   ↓
inspect the evidence
   ↓
make or study something concrete
   ↓
test assumptions and failure paths
   ↓
record what happened
   ↓
revise the model
```

Reading is only the beginning.

A useful lesson should change how you inspect, design, build, test, or maintain a real system.

## Start with the work in front of you

There is no required front-to-back reading order.

### [Guides](https://virtualmase.github.io/ai-mastery/guides/)

Use these when you have a specific technical decision to make.

Current guides include:

- **How to Train Your Agent**: distinguish model choice, prompting, retrieval, fine-tuning, infrastructure, and the different things people call “training.”
- **Technical SEO and GEO Playbook**: build crawlable, attributable, machine-readable technical publications from the source layer up.

A guide should leave you with a clearer decision, not another list of tools.

### Learning paths

Use a learning path when one concept depends on several others and the order matters.

Current pathways include:

| Path | Questions it develops |
|---|---|
| **Operator foundations** | mandate, identity, signing, payment policy, settlement, fulfillment, exceptions |
| **Autonomous Resource Management** | resource scope, decision rights, trace records, accountable exception design |
| **Trust infrastructure** | evidence, claim boundaries, provenance, verification, correction |
| **Machine-readable internet** | canonical records, structured relationships, discovery files, crawl boundaries |
| **Agent interoperability** | protocol roles, message envelopes, capabilities, task state, human handoffs |
| **Economic models and agent commerce** | value, payment, fulfillment, reconciliation, disputes, incentives, risk allocation |
| **GEO** | entity clarity, structured data, retrieval surfaces, attribution, measurement, information decay |

These pathways teach mechanisms and decision models. They do not promise rankings, safety, interoperability, revenue, adoption, or any other outcome that has not been measured.

### [AURE](https://virtualmase.github.io/ai-mastery/aure/)

AURE is the largest applied curriculum in the repository.

It contains sixteen connected working silos organized into four phases:

1. **Ground truth**
2. **Trust and coordination**
3. **Buyer systems**
4. **Operation and maintenance**

Each silo asks one bounded question and produces one inspectable artifact.

Examples include:

- buyer question
- claim register
- canonical entity record
- resource map
- trust packet
- discovery surface
- interaction contract
- commercial state map
- policy envelope
- offer brief
- discovery record
- proof packet
- conversation brief
- handoff packet
- maintenance record
- final operating packet

The operating rule is simple:

> **When evidence is absent, the answer remains unknown.**

AURE is useful because it forces the learner to build a record while learning, rather than confusing familiarity with competence.

### Field studies

Case studies and public audits connect the learning material to bounded real-world work.

A field study should make four things easy to separate:

- what was observed
- what was interpreted
- what was proposed
- what remains unknown

A case study is not allowed to become a success story merely because work occurred.

If an outcome was not measured, it is not presented as an outcome.

### [Publication directory](https://virtualmase.github.io/ai-mastery/directory/)

Use the directory when you want to inspect the complete public surface rather than follow a curated path.

Machine-readable discovery is also available through [`llms.txt`](llms.txt) and [`sitemap.xml`](sitemap.xml).

## The standard for a lesson

A strong `ai-mastery` lesson should do more than explain terminology.

Where appropriate, it should contain:

### 1. A direct definition

Explain the idea in language a technically curious person can understand without first learning the vocabulary of the page.

### 2. A system model

Show the components, relationships, state transitions, or boundaries that make the concept work.

### 3. A reason to care

Connect the concept to a real engineering decision.

### 4. A practical artifact

Give the learner something to inspect, build, fill out, test, compare, or run.

### 5. Failure modes

Explain what breaks, where assumptions stop holding, and which shortcuts create hidden cost.

### 6. Evidence

Prefer primary sources, standards, official documentation, reproducible observations, and inspectable records.

### 7. Boundaries

State what the lesson, example, test, record, or benchmark does **not** establish.

### 8. The next layer

Point to the concept that becomes important once the current one is understood.

This is how separate pages become a learning system instead of a pile of articles.

## Engineering judgment over tool memorization

Tools change quickly.

Good questions age more slowly.

For example:

```text
weak question:
Which vector database should I use?

stronger question:
What retrieval behavior does this system require,
what data shape produces it,
and how will I know when retrieval is wrong?
```

```text
weak question:
Which agent framework is best?

stronger question:
What state must survive between steps,
which actions require permission,
and where should execution stop?
```

```text
weak question:
How do I make this more scalable?

stronger question:
What is the measured bottleneck,
and what is the smallest change that removes it?
```

The second question in each pair is closer to the work.

That is the habit this repository is trying to build.

## What belongs here

Good additions usually make the repository more accurate, reproducible, inspectable, or useful.

Examples:

- implementation patterns
- small working demonstrations
- technical field guides
- architecture explanations
- benchmark records with methods and limits
- source corrections
- system diagrams
- failure analysis
- evaluation methods
- decision records
- case evidence
- reusable checklists when a checklist is actually the right tool
- improvements to the public knowledge graph

## What does not belong here

This repository should resist material that creates the appearance of expertise without helping someone reason or build better.

That includes:

- promotional listicles
- vague trend commentary
- fabricated citations
- copied documentation with no added reasoning
- benchmarks with no method
- architecture diagrams that explain nothing
- unverified performance claims
- product claims disguised as education
- generated summaries published without technical review
- complexity added only to make a project look sophisticated

The bar is usefulness under inspection.

## Repository structure

The project is intentionally published as portable static files.

```text
.
├── learning/        connected technical lessons
├── guides/          decision guides and field guides
├── aure/            sixteen-part applied curriculum
├── case-studies/    bounded field records and self-audits
├── directory/       complete public route directory
├── author/          author and identity record
├── docs/            operating procedures and publication policies
├── scripts/         validation and audit tools
├── assets/          shared visual and publication assets
├── index.html       public home
├── sitemap.xml      canonical route inventory
└── llms.txt         machine-readable publication index
```

There is no application framework required to understand or serve the publication.

That constraint is deliberate. The source should remain readable even if the current frontend fashion changes.

## Run it locally

No package installation or build step is required.

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

## Validate before publishing

The repository uses small validation scripts to keep the public graph, metadata, links, and curriculum structure from drifting silently.

Core checks include:

```bash
node scripts/validate-site-graph.mjs
node scripts/audit-internal-link-policy.mjs
node scripts/validate-editorial-expansion.mjs
node scripts/validate-publication-index.mjs
git diff --check
```

Pathway-specific validators should also be run when their material changes.

The repository includes checks for areas such as:

- route coverage
- reciprocal learning links
- sitemap parity
- canonical URLs
- source shelves
- claim boundaries
- structured data
- internal-link policy
- publication discovery files
- local relative links

A passing validator means the thing it checks passed.

It does not mean the material is true simply because a script returned zero errors. Technical judgment still belongs to the reviewer.

## Source and evidence discipline

Every meaningful factual claim should be traceable to one of the following:

1. a primary or authoritative source
2. a reproducible observation
3. a clearly labeled derivation
4. an explicitly identified proposal or interpretation

Unknowns should remain unknowns until evidence changes them.

This matters especially in material about AI, where a plausible explanation can easily sound more certain than the underlying evidence warrants.

## Machine-readable publication

`ai-mastery` is written for human readers first, but the publication also maintains explicit machine-readable surfaces.

These include:

- canonical URLs
- structured data
- entity relationships
- sitemap coverage
- `llms.txt`
- descriptive internal links
- source attribution
- correction paths

These mechanisms make the publication easier to inspect and retrieve.

They do not guarantee crawling, indexing, ranking, citation, retrieval, or model behavior.

## Technical SEO as engineering work

The repository includes its own reproducible publication checks rather than treating technical SEO as a collection of marketing settings.

The operating procedure lives in [`docs/TECHNICAL-SEO-OPERATING-PROCEDURE.md`](docs/TECHNICAL-SEO-OPERATING-PROCEDURE.md).

The internal-link policy lives in [`docs/internal-link-policy.md`](docs/internal-link-policy.md).

Useful release checks include:

```bash
node scripts/audit-live-site.mjs
node scripts/audit-internal-link-policy.mjs
```

These checks establish technical conditions such as route availability, crawlable links, canonical agreement, sitemap coverage, metadata completeness, and graph depth.

They do not establish search rankings, domain authority, citations, conversions, revenue, or learner outcomes.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

A strong contribution should answer:

- What technical question does this solve?
- What claim is being made?
- What supports that claim?
- What can another person reproduce or inspect?
- What are the important failure modes or limits?
- What existing concept does this connect to?
- What changed in the public knowledge graph?

Keep pull requests centered on one coherent outcome.

For technical content, include enough evidence and context that a reviewer can challenge the reasoning rather than merely approve the prose.

## The long-term goal

The long-term value of `ai-mastery` is not the number of lessons it contains.

It is whether the material helps someone become the kind of engineer who can enter an unfamiliar system, understand what matters, ask better questions, make a sound decision under uncertainty, build the smallest useful solution, and leave the work easier for the next person to understand.

That is mastery worth pursuing.

---

**virtualmase**

*build quietly.*
