# Section 09 source notes

## Audience and decision

Primary audience: technical leads, platform owners, and operators deciding how an AI-enabled workflow should be governed before it can propose or execute consequential work.

Reader decision: what policy envelope, accountable owner, evaluation evidence, and exception path must exist before a workflow is allowed to operate?

## Primary sources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): a voluntary framework for managing AI-associated risks to individuals, organizations, and society. NIST describes the functions as Govern, Map, Measure, and Manage. It is guidance, not a context-specific risk decision or certification.
- [Open Policy Agent documentation](https://openpolicyagent.org/docs): an open-source policy engine that evaluates structured input against declarative policy and separates policy decision-making from policy enforcement. OPA output is a decision result; it does not establish that the input is complete, truthful, or ethically sufficient.
- [ISO/IEC 42001:2023](https://www.iso.org/standard/42001): an international standard specifying requirements and guidance for establishing, implementing, maintaining, and continually improving an AI management system. The standard is not a product safety claim, legal determination, or evidence that an organization conforms.
- [ISO 42001 explained](https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html): ISO's public explanation of organizational context, responsibilities, risk management, transparency, performance evaluation, and continual improvement. ISO does not certify organizations; independent certification bodies may perform certification.

## Suggested four-lesson cluster

01. Governance Roles and Accountability: distinguish system owner, policy owner, operator, approver, reviewer, affected party, and resolver.
02. Policy Envelopes and Decision Points: turn intent into scope, conditions, deny/hold rules, expiry, evidence requirements, and enforcement points.
03. Evaluation, Monitoring, and Change Control: connect risk hypotheses to measures, review cadence, drift signals, release records, and rollback authority.
04. Exceptions, Appeals, and Continual Improvement: design safe holds, human escalation, appeal records, corrective actions, and learning loops without allowing policy to become silent autonomy.

## Non-claims

These lessons must not claim legal compliance, ISO certification, safety, fairness, security, effective governance, risk elimination, or successful autonomous operation. They are educational systems models. Missing evidence is unknown. A policy decision is not itself enforcement; enforcement is not proof that a policy was appropriate; a framework or standard is not a context-specific approval.
