# Graph Report - K-wadi.github.io  (2026-08-26)

## Corpus Check
- 23 files · ~226,153 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 391 nodes · 835 edges · 21 communities (8 shown, 13 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.82)
- Token cost: 96,191 input · 0 output

## Community Hubs (Navigation)
- Bootstrap Modal/Alert Internals
- Bootstrap Bundle Core Utilities
- Bootstrap Popover/Tooltip Internals
- Bootstrap Config Merge Utilities
- Bootstrap Base Component Class
- Bootstrap Carousel Internals
- Bootstrap Collapse/Toast Internals
- Khaled Wadi Portfolio & Career
- AOS Animation Library
- Bootstrap ScrollSpy Internals
- Bootstrap Collapse Component
- Bootstrap Swipe/Touch Handling
- Portfolio Branding Images
- Bootstrap Scrollbar/Overflow Utils
- Bootstrap Offcanvas Internals
- CV Professional Qualities
- B Brand Logo
- Git/GitHub Skill
- HTML5 & CSS3 Skill
- JavaScript Skill

## God Nodes (most connected - your core abstractions)
1. `on()` - 39 edges
2. `rt` - 28 edges
3. `remove()` - 23 edges
4. `ri` - 22 edges
5. `Li` - 20 edges
6. `Tn` - 18 edges
7. `pn` - 17 edges
8. `ft` - 16 edges
9. `I()` - 15 edges
10. `Qi` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Khaled Wadi` --references--> `Khaled Wadi CV`  [EXTRACTED]
  index.html → cv/Khaled_Wadi_CV.pdf
- `Khaled (Portfolio Owner)` --semantically_similar_to--> `Apple Touch Icon`  [INFERRED] [semantically similar]
  img/Khaled.webp → img/favicon/apple-touch-icon.png
- `Khaled (Portfolio Owner)` --semantically_similar_to--> `Site Favicon (32x32)`  [INFERRED] [semantically similar]
  img/Khaled.webp → img/favicon/favicon-32x32.png
- `Khaled (Portfolio Owner)` --semantically_similar_to--> `Khaled (Thumbnail)`  [INFERRED] [semantically similar]
  img/Khaled.webp → img/Khaled-sm.webp
- `Cenya Project Logo` --semantically_similar_to--> `Naqsha Project Logo`  [INFERRED] [semantically similar]
  img/Cenya.webp → img/Logo_naqsha.webp

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Khaled Wadi's Full-Stack Project Ecosystem** — index_bariq_autocare, index_wadigrow, index_cenya, index_naqsha, index_mix_magic, index_yaqeen, index_luchtleven, index_tuliptale [INFERRED 0.85]
- **Portfolio Project Logos** — img_cenya, img_logo_naqsha, img_luchtleven, img_magic_mix, img_tuliptale, img_yaqeen, img_b_logo_bg [INFERRED 0.85]
- **Site Branding Assets** — img_khaled, img_wg_logo, img_favicon_favicon_32x32, img_favicon_apple_touch_icon [INFERRED 0.80]

## Communities (21 total, 13 thin omitted)

### Community 0 - "Bootstrap Modal/Alert Internals"
Cohesion: 0.07
Nodes (5): Dn, d(), I(), Li, remove()

### Community 1 - "Bootstrap Bundle Core Utilities"
Cohesion: 0.10
Nodes (40): Ae(), be(), Bt(), Ce(), D(), _e(), ee(), getDataAttributes() (+32 more)

### Community 2 - "Bootstrap Popover/Tooltip Internals"
Cohesion: 0.09
Nodes (3): ln, on(), V

### Community 3 - "Bootstrap Config Merge Utilities"
Cohesion: 0.07
Nodes (3): B, Qi, wi

### Community 7 - "Khaled Wadi Portfolio & Career"
Cohesion: 0.20
Nodes (23): 360Fabriek, Khaled Wadi CV, Rijkswaterstaat, ROC Mondriaan, Techniek College Rotterdam, External API Integration, Bariq Autocare, Cenya (+15 more)

### Community 8 - "AOS Animation Library"
Cohesion: 0.38
Nodes (14): c(), e(), f(), i(), n(), o(), a(), f() (+6 more)

### Community 12 - "Portfolio Branding Images"
Cohesion: 0.29
Nodes (11): Cenya Project Logo, Apple Touch Icon, Site Favicon (32x32), Khaled (Portfolio Owner), Khaled (Thumbnail), Naqsha Project Logo, Luchtleven Project Logo, Magic Mix Project Logo (+3 more)

## Knowledge Gaps
- **10 isolated node(s):** `360Fabriek`, `Rijkswaterstaat`, `ROC Mondriaan`, `Techniek College Rotterdam`, `HTML5 & CSS3` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `on()` connect `Bootstrap Popover/Tooltip Internals` to `Bootstrap Modal/Alert Internals`, `Bootstrap Bundle Core Utilities`, `Bootstrap Config Merge Utilities`, `Bootstrap Base Component Class`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `rt` connect `Bootstrap Carousel Internals` to `Bootstrap Modal/Alert Internals`, `Bootstrap Bundle Core Utilities`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `ri` connect `Bootstrap Base Component Class` to `Bootstrap Modal/Alert Internals`, `Bootstrap Bundle Core Utilities`, `Bootstrap Popover/Tooltip Internals`, `Bootstrap Config Merge Utilities`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `360Fabriek`, `Rijkswaterstaat`, `ROC Mondriaan` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Bootstrap Modal/Alert Internals` be split into smaller, more focused modules?**
  _Cohesion score 0.06568832983927324 - nodes in this community are weakly interconnected._
- **Should `Bootstrap Bundle Core Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.0996078431372549 - nodes in this community are weakly interconnected._
- **Should `Bootstrap Popover/Tooltip Internals` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._