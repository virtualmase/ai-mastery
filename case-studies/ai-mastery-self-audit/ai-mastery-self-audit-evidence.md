# AI Mastery Self-Audit: Evidence Ledger

This public mirror supports the self-audit’s linked evidence trail. The version-controlled source is the [canonical ledger in the repository](https://github.com/virtualmase/ai-mastery/blob/main/docs/ai-mastery-self-audit-evidence.md). Both records must be updated together when the case study is rechecked.

**Audit scope:** AI Mastery’s public website and public GitHub repository. This ledger records implementation and publication evidence observed on **2026-08-27**. It does not assess commercial results, search performance, learner outcomes, security posture, or the truth of claims made by linked third parties.

| ID | Observation | Claim class | Direct evidence | Audit status |
| --- | --- | --- | --- | --- |
| AM-01 | AI Mastery is publicly hosted at `https://virtualmase.github.io/ai-mastery/`. | Fact | [Public repository](https://github.com/virtualmase/ai-mastery) and [public site](https://virtualmase.github.io/ai-mastery/) | Observed 2026-08-27 |
| AM-02 | The repository default branch is `main`; the public site is built from the repository through GitHub Pages. | Fact | [Repository](https://github.com/virtualmase/ai-mastery) and [published revision](https://github.com/virtualmase/ai-mastery/commit/488d92e22167f5291e623c3798947a1117ae6c74) | Observed 2026-08-27 |
| AM-03 | The public revision at this checkpoint includes the connected Knowledge Index, ARM pathway, and Trust Infrastructure lessons. | Fact | [Revision `488d92e`](https://github.com/virtualmase/ai-mastery/commit/488d92e22167f5291e623c3798947a1117ae6c74) | Observed 2026-08-27 |
| AM-04 | The site publishes machine-readable route lists in `llms.txt` and `sitemap.xml`. | Fact | [llms.txt](https://virtualmase.github.io/ai-mastery/llms.txt) and [sitemap.xml](https://virtualmase.github.io/ai-mastery/sitemap.xml) | Observed 2026-08-27 |
| AM-05 | The public repository includes local-only structural validation scripts for the Knowledge Index, ARM pathway, and Trust pathway. | Fact | [Validation scripts](https://github.com/virtualmase/ai-mastery/tree/main/scripts) | Observed 2026-08-27 |
| AM-06 | The site frames learning material as educational and contains visible boundaries on the ARM and Trust pathways. | Fact | [ARM pathway](https://virtualmase.github.io/ai-mastery/learning/autonomous-resource-management/) and [Trust learning entry](https://virtualmase.github.io/ai-mastery/#trust) | Observed 2026-08-27 |
| AM-07 | The repository did not report a recognized license in GitHub repository metadata at this checkpoint. | Fact | [Repository metadata](https://github.com/virtualmase/ai-mastery) | Observed 2026-08-27 |

## Explicit Unknowns

| ID | Unknown | Why it remains unknown |
| --- | --- | --- |
| AM-U01 | Organic search impressions, rankings, citations, and referrals. | No Search Console, analytics, or independent crawl measurement was provided or inspected in this audit. |
| AM-U02 | Reader comprehension, learner completion, or practical use. | No consented user-research record, survey, or learning-outcome study was provided. |
| AM-U03 | Revenue, commercial conversion, customer outcomes, or product-market fit. | The audit covers public repository and site records, not financial or customer-evidence records. |
| AM-U04 | Security, accessibility, performance, legal, privacy, or compliance posture. | Static route and structural validation do not constitute a professional assessment in any of those disciplines. |

## Evidence Handling Rule

Facts on the self-audit page must link to a stable repository, deployment, or live-site source. Interpretations must be labelled as interpretations. The case-study framework organizes review work; it does not certify a property or guarantee an outcome. Any performance or outcome statement remains absent until a dated, inspectable source and accountable review owner are available.
