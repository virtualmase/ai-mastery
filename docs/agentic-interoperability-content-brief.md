# Section 07 — Agentic Interoperability and Workflow Primitives

## Audience and moment

This pathway is for engineers, technical operators, and system designers deciding whether two agentic components should communicate, what they may exchange, and how a long-running workflow should be represented. The reader arrives when a local prototype has crossed a boundary: another agent, tool server, client, or human approval step must participate without sharing hidden state by assumption.

## Page job and primary question

The pathway explains how to decompose an interoperable workflow into protocol roles, message envelopes, capability discovery, task state, and explicit authorization. The reader should be able to sketch a bounded interaction contract and identify what a protocol specification does not guarantee.

## Unique contribution

The lessons connect MCP, A2A, and JSON-RPC as different layers of an interoperability problem. They do not present one protocol as a universal answer. They use a small workflow worksheet: identify the peer, declare capabilities, exchange a typed message, correlate work, preserve state and artifacts, request authority, and record the result.

## Lesson sequence

1. **Protocol Roles and Boundaries** — distinguish host, client, server, agent, user, tool, resource, and workflow authority.
2. **Message Envelopes and Correlation** — use request IDs, notifications, responses, errors, messages, parts, artifacts, and task identifiers without confusing transport with business state.
3. **Capability Discovery and Negotiation** — inspect declared capabilities, modalities, extensions, authentication requirements, and unsupported operations before handoff.
4. **Task State and Human Handoffs** — model synchronous and asynchronous work, terminal states, progress, artifacts, cancellation, escalation, and human-in-the-loop boundaries.

## Evidence boundary

Facts about protocol structures and normative requirements must link to the current primary specifications. Interpretations must be labelled as interpretations. The pathway may teach a design framework, but it must not claim that MCP, A2A, JSON-RPC, or any workflow primitive guarantees safety, truth, identity, authorization, successful execution, interoperability in every environment, or business outcomes.

The lessons must not imply that protocol compliance establishes trust, that capability metadata proves implementation quality, that a signed or correlated message proves the underlying claim, or that a human handoff has occurred merely because a field exists in a message.

## Source shelf

- Model Context Protocol specification, 2025-06-18: https://modelcontextprotocol.io/specification/2025-06-18
- Agent2Agent Protocol specification, latest released version and source repository: https://a2a-protocol.org/latest/specification/ and https://github.com/a2aproject/A2A/blob/main/docs/specification.md
- JSON-RPC 2.0 specification: https://www.jsonrpc.org/specification
- RFC 2119 / RFC 8174 requirements language: https://www.rfc-editor.org/rfc/rfc2119 and https://www.rfc-editor.org/rfc/rfc8174

## Information architecture

The section 07 home entry must link to all four foundations. Every supporting page links back to the section 07 pillar in its first third, links to the next lesson where the reader’s question continues, and links to the relevant section 06 Machine-Readable Internet or section 05 Trust Infrastructure lesson when the concept crosses those boundaries.

## Asset and interaction plan

No documentary or generated visual is required. A semantic HTML learning surface with a typed interaction strip, a compact workflow worksheet, and accessible relationship labels is sufficient. Any diagrams must be deterministic and must not be presented as evidence of a real deployment.

## Owner and review

Owner: AI Mastery maintainers. Release mode: separate review branch and explicit merge decision. Recheck after a protocol revision, route change, new source, or change to the site’s machine-readable discovery records.
