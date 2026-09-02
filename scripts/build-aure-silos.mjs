import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://virtualmase.github.io/ai-mastery";
const silos = [
  ["01", "purpose-and-buyer-truth", "Purpose and Buyer Truth", "Start with the buyer’s real question and define what a trustworthy answer must contain.", "buyer question", "AURE-01 produces a one-page buyer-question brief: audience, decision, evidence boundary, unknowns, and one honest next action."],
  ["02", "evidence-and-claim-boundaries", "Evidence and Claim Boundaries", "Separate fact, interpretation, framework, and promise before a claim enters a public system.", "claim register", "AURE-02 produces a claim register with sources, observation dates, confidence, non-claims, and a correction route."],
  ["03", "canonical-entity-records", "Canonical Entity Records", "Give people and machines one inspectable record for who an organization is and what it actually does.", "entity record", "AURE-03 produces a canonical entity record with identity, ownership, scope, relationships, and provenance fields."],
  ["04", "autonomous-resource-management", "Autonomous Resource Management", "Map resources, authority, trace records, and exceptions before an agent acts.", "resource map", "AURE-04 produces a bounded resource map that names owners, decision rights, limits, evidence, and escalation routes."],
  ["05", "trust-infrastructure", "Trust Infrastructure", "Make provenance, verification, reliance, and correction visible without pretending a record proves truth.", "trust packet", "AURE-05 produces a trust packet that distinguishes source provenance, verifier policy, local reliance, and unresolved risk."],
  ["06", "machine-readable-internet", "Machine-Readable Internet", "Publish structured relationships and discovery files that help systems find the right record without promising ranking or retrieval.", "discovery surface", "AURE-06 produces a portable discovery surface: canonical URLs, structured relationships, sitemap entries, and crawl boundaries."],
  ["07", "agentic-interoperability", "Agentic Interoperability", "Represent protocol roles, capabilities, messages, task state, and human handoffs without assuming interoperability guarantees safety.", "interaction contract", "AURE-07 produces an interaction contract with roles, envelopes, capabilities, task states, permissions, and failure paths."],
  ["08", "economic-models-agentic-commerce", "Economic Models and Agentic Commerce", "Keep value, payment, fulfillment, dispute, incentives, and risk allocation as separate states.", "commercial state map", "AURE-08 produces a commercial state map that identifies evidence, authority, settlement boundaries, and dispute ownership."],
  ["09", "autonomous-governance", "Autonomous Governance and Policy Envelopes", "Bound decisions with policy, evaluation, change control, exceptions, appeals, and accountable human roles.", "policy envelope", "AURE-09 produces a policy envelope with allowed actions, holds, review triggers, owners, and change records."],
  ["10", "offer-design-and-qualification", "Offer Design and Qualification", "Turn a real buyer problem into a specific, inspectable offer with eligibility and no invented guarantee.", "offer brief", "AURE-10 produces an offer brief covering audience, painful decision, deliverables, method, eligibility, price basis, unknowns, and next step."],
  ["11", "discovery-and-buyer-research", "Discovery and Buyer Research", "Find what a buyer is deciding, what evidence they trust, and where the current answer fails them.", "discovery record", "AURE-11 produces a discovery record with questions asked, sources inspected, decision context, objections, and unresolved assumptions."],
  ["12", "proof-packets-and-case-evidence", "Proof Packets and Case Evidence", "Assemble evidence that a buyer can inspect without turning an example into a promise or a testimonial.", "proof packet", "AURE-12 produces a proof packet with artifacts, dates, scope, source links, exclusions, and a clear unknowns section."],
  ["13", "agent-sales-conversations", "Agent Sales Conversations", "Train agents to make the useful next step clear while staying inside authorization, evidence, and truth boundaries.", "conversation brief", "AURE-13 produces a conversation brief with opening context, verified facts, questions, objections, handoff triggers, and forbidden claims."],
  ["14", "human-handoffs-and-close", "Human Handoffs and Close", "Close the loop by routing the right evidence and decision to the right accountable person at the right time.", "handoff packet", "AURE-14 produces a handoff packet that names the decision, owner, evidence, options, deadline, and required approval."],
  ["15", "measurement-correction-and-maintenance", "Measurement, Correction, and Maintenance", "Measure what actually happened, correct the record, and recheck it before stale truth becomes sales friction.", "maintenance record", "AURE-15 produces a maintenance record with metrics, observation windows, correction events, owner, and next review date."],
  ["16", "aure-capstone", "AURE Capstone: The Trusted Buyer Path", "Connect all sixteen artifacts into one reviewable path from buyer question to evidence, decision, handoff, and maintained truth.", "operating packet", "AURE-16 produces the integrative operating packet. It is a reviewable implementation, not a certification or guarantee of business results."]
];

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const phases = [
  ["Ground truth", "Define the buyer question, evidence boundary, canonical record, and authority map."],
  ["Trust and coordination", "Make provenance, discovery, interoperability, and commercial state inspectable."],
  ["Buyer systems", "Translate governance and research into qualified offers and reviewable proof."],
  ["Operation and maintenance", "Carry truthful conversations through handoff, measurement, and correction."]
];
const phaseFor = (number) => Math.floor((Number(number) - 1) / 4);
const page = (silo, previous, next) => {
  const [number, slug, title, dek, artifact, outcome] = silo;
  const phase = phases[phaseFor(number)][0];
  const progress = (Number(number) / silos.length) * 100;
  const previousLink = previous ? `<a href="../${previous[1]}/"><small>Previous · ${previous[0]} of 16</small><strong>← ${previous[2]}</strong></a>` : `<a href="../"><small>Pathway overview</small><strong>← All 16 silos</strong></a>`;
  const nextLink = next ? `<a href="../${next[1]}/"><small>Next · ${next[0]} of 16</small><strong>${next[2]} →</strong></a>` : `<a href="../"><small>Pathway complete</small><strong>Review all 16 silos →</strong></a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — AURE · AI Mastery</title>
<meta name="description" content="${esc(dek)}">
<link rel="canonical" href="${base}/aure/${slug}/">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#20221f">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)} — AURE · AI Mastery">
<meta property="og:description" content="${esc(dek)}">
<meta property="og:url" content="${base}/aure/${slug}/">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="../../styles.css">
<link rel="stylesheet" href="../aure.css">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"LearningResource","name":title,"description":dek,"learningResourceType":"lesson","educationalLevel":"advanced","isPartOf":{"@type":"Course","name":"AURE — Autonomous Resource Management and Evidence-led Buyer Trust","url":`${base}/`},"url":`${base}/aure/${slug}/`})}</script>
</head><body><header class="aure-topbar"><div class="aure-shell"><a class="aure-brand" href="../">AURE <span>/ AI MASTERY</span></a><a class="aure-home" href="../../">Return to AI Mastery</a></div><div class="aure-progress" aria-label="Silo ${number} of 16"><span style="width:${progress}%"></span></div></header>
<main><nav class="aure-shell aure-breadcrumbs" aria-label="Breadcrumb"><a href="../">AURE pathway</a> / <span>${esc(title)}</span></nav><section class="aure-silo-hero"><div class="aure-shell aure-silo-layout"><div class="aure-silo-marker">${number}<small>of 16 · ${phase}</small></div><div><p class="aure-kicker">Learning silo</p><h1>${esc(title)}</h1><p class="aure-lede">${esc(dek)}</p></div></div></section>
<section class="aure-shell aure-content"><article class="aure-panel"><p class="aure-kicker">Working artifact</p><h2>${esc(artifact)}</h2><p class="aure-outcome">${esc(outcome)}</p><ol class="aure-practice"><li>Name the actor and the decision.</li><li>Record the evidence source and observation date.</li><li>Set the authority boundary and unresolved question.</li><li>Choose the next review event. Missing evidence stays <em>unknown</em>.</li></ol></article><aside class="aure-panel aure-boundary"><p class="aure-kicker">Evidence boundary</p><h2>Proof, not promises.</h2><p>This silo teaches a method. It does not certify a system, prove a company is trustworthy, guarantee AI retrieval, or promise revenue, rankings, safety, interoperability, or conversion.</p></aside></section>
<section class="aure-shell aure-soul"><div><p class="aure-kicker">Pre-action review</p><h2>The SOUL check</h2></div><div class="aure-soul-grid"><div><strong>S / SCOPE</strong>Who authorized the action?</div><div><strong>O / OBSERVE</strong>What actually happened?</div><div><strong>U / USE</strong>What information may be used?</div><div><strong>L / LIABILITY</strong>Who owns the edge case?</div></div></section>
<nav class="aure-path-nav" aria-label="AURE pathway navigation">${previousLink}${nextLink}</nav></main>${footer("../")}</body></html>`;
};

const footer = (prefix = "") => `<footer class="aure-footer"><div class="aure-shell"><span>AURE · Evidence-led buyer systems</span><nav class="aure-footer-links" aria-label="Site directory"><a href="${prefix || "./"}">AURE pathway</a><a href="${prefix}../">AI Mastery</a><a href="${prefix}../directory/">All pages</a><a href="${prefix}../llms.txt">Machine-readable index</a></nav></div></footer>`;

const aureDir = path.join(root, "aure");
for (let i = 0; i < silos.length; i++) {
  const current = silos[i];
  const previous = silos[i - 1] || null;
  const next = silos[i + 1] || null;
  const dir = path.join(aureDir, current[1]);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(current, previous, next));
}
const phaseMarkup = phases.map(([name, description], phaseIndex) => { const group = silos.slice(phaseIndex * 4, phaseIndex * 4 + 4); return `<section class="aure-phase"><div class="aure-phase-head"><p class="aure-kicker">Phase ${phaseIndex + 1} · ${group[0][0]}–${group[3][0]}</p><h2>${name}</h2><p>${description}</p></div><ol class="aure-list" start="${phaseIndex * 4 + 1}">${group.map(([number, slug, title, dek, artifact]) => `<li><a href="${slug}/"><span class="aure-number">${number}</span><span><strong>${esc(title)}</strong><em>${esc(dek)}</em></span><span class="aure-artifact">${esc(artifact)} <span class="aure-arrow">↗</span></span></a></li>`).join("")}</ol></section>`; }).join("");
fs.writeFileSync(path.join(aureDir, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AURE — The trusted buyer path · AI Mastery</title><meta name="description" content="AURE is a sixteen-silo field curriculum for evidence-led buyer trust, autonomous resource management, and accountable agentic work."><link rel="canonical" href="${base}/aure/"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="aure.css"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#20221f"><meta property="og:type" content="website"><meta property="og:title" content="AURE — The trusted buyer path"><meta property="og:description" content="A sixteen-silo field curriculum for evidence-led buyer systems and accountable agentic work."><meta property="og:url" content="${base}/aure/"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Course","name":"AURE — The trusted buyer path","description":"A sixteen-silo field curriculum for evidence-led buyer trust, autonomous resource management, and accountable agentic work.","url":`${base}/aure/`,"provider":{"@type":"Organization","name":"AI Mastery","url":`${base}/`},"hasCourseInstance":{"@type":"CourseInstance","courseMode":"online","courseWorkload":"Self-paced"}})}</script></head><body><header class="aure-topbar"><div class="aure-shell"><a class="aure-brand" href="./">AURE <span>/ AI MASTERY</span></a><a class="aure-home" href="../">Return to AI Mastery</a></div></header><main><section class="aure-index-hero"><div class="aure-shell aure-hero-grid"><div><p class="aure-kicker">A field curriculum · 16 working silos</p><h1>The trusted buyer path.</h1><p class="aure-lede">Make good work legible to buyers and machines—without letting an agent outrun its evidence, authority, or accountability.</p></div><aside class="aure-compass"><p class="aure-kicker">Operating principle</p><strong>Plain. Direct. True.</strong><p>Every silo ends in an inspectable artifact. When evidence is absent, the answer remains unknown.</p></aside></div></section><section class="aure-shell aure-intro"><div><p class="aure-kicker">How to use AURE</p><h2>Build the record as you learn.</h2></div><div class="aure-intro-copy"><p>Move in order when building a system from scratch, or enter at the artifact your current decision requires. Each silo narrows one question, creates one working record, and names the boundary around what that record can prove.</p><div class="aure-method"><div><strong>01 / Inspect</strong><span>Start with the decision and available evidence.</span></div><div><strong>02 / Produce</strong><span>Create the named artifact, with unknowns intact.</span></div><div><strong>03 / Review</strong><span>Assign ownership and the next correction event.</span></div></div></div></section><div class="aure-shell aure-path">${phaseMarkup}</div></main>${footer()}</body></html>`);
fs.writeFileSync(path.join(root, "scripts", "aure-silos.json"), JSON.stringify(silos.map(([number, slug, title, dek, artifact]) => ({ number, slug, title, description: dek, artifact, url: `${base}/aure/${slug}/` })), null, 2) + "\n");
console.log(`Built ${silos.length} AURE silos under /aure/`);
