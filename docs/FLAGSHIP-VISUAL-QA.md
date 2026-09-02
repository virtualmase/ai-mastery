# Flagship visual QA

**Review date:** 2026-08-30  
**Branch:** `feat/flagship-homepage-field-studies`  
**Runtime:** Local static server at `127.0.0.1:4173`; Playwright 1.55.0 with headless Chromium  
**Publication action:** None

## Surfaces reviewed

- Homepage hero at 1440 × 1000 and 390 × 844
- Homepage Learning Paths at 1440 × 1000 and 390 × 844
- Homepage New Field Work at 1440 × 1000 and 390 × 844
- Train Your Agent Playbook at 1440 × 1000 and 390 × 844
- Arctura Network field study at 390 × 844

Screenshots were generated as temporary QA artifacts and visually inspected during the review. They are not published assets or documentary evidence.

## Findings and corrections

### Palette and hierarchy

The carbon, field-ivory, mineral-green, and ochre system is coherent across the flagship hero, editorial cards, guide, and field study. Legacy lime and cyan highlight values were removed from the redesigned surfaces. Ochre now marks current actions and selected states rather than decorating every component.

### Homepage

The hero establishes the publication job before the technical architecture. The New Field Work section reads as one editorial system at desktop and a deliberate single-column sequence on mobile. Learning-path labels, titles, and lesson links remain legible at both reviewed widths.

The full-page screenshot tool does not scroll through IntersectionObserver targets, so its blank offscreen sections were not treated as a rendering defect. Section-level renders and the scripted scroll check confirmed that targets reveal when they enter the viewport.

### Train Your Agent Playbook

The guide maintains a readable long-form measure, clear comparison blocks, and restrained status color. At 390px, the secondary Knowledge Index and Learning Paths header links were removed from the compact header; the Guides hub remains visible and the breadcrumb preserves context.

### Arctura field study

The editorial serif treatment distinguishes the field study from the systems guide without breaking the shared palette. At 390px, the middle record label was removed from the header and the external Arctura link was kept on one line, preventing the arrow from wrapping into a separate row.

## Scripted interaction evidence

The temporary Playwright interaction check reported:

- mobile menu initially collapsed;
- menu opens and sets `aria-expanded="true"`;
- menu closes after selecting the Field Work link;
- Field Work reveal target becomes visible after navigation;
- reduced-motion context renders reveal targets at full opacity;
- no horizontal overflow on the homepage, agent guide, or Arctura field study at 390px;
- no browser console errors or uncaught page errors.

## Remaining boundaries

- This is a browser-render and interaction review, not an accessibility certification or cross-browser compatibility guarantee.
- Chromium was reviewed; Safari/WebKit and Firefox were not available in the local runtime.
- Live performance, third-party font delivery, analytics, indexing, search visibility, and reader outcomes remain unmeasured until publication and observation.
- Repeat this review after material homepage, navigation, typography, or editorial-card changes.
