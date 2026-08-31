# SFN homepage build spec

Target in one sentence: **Zipline's confidence and mechanics, in Arva's language, for
SFN's content.**

## Inputs (all researched live)

**Arva (reference language), computed off arva.com:**
- Canvas bone #f1efdf; forest ink #07503f fills nav/dividers/footer; charcoal #212529
  text; vivid lime #e8fe85 scarce (ticker + one chip max); pastels sky #b2cee7, peach
  #fceace, sage #e6ecd5 as a quilted card series; pure white never a page canvas.
- Display: Reckless (live site uses Reckless Light w100/300 at 65px/1.06). Body Inter.
- Pill buttons (hero CTAs); 8px radius small controls; inset rounded hero media frame;
  lime news ticker above nav; line-drawn map with lit location marker in forest footer;
  serif belief statement; photography credit line in small caps.

**Zipline (gold standard bar), computed off zipline.com:**
- fkScreamer 700 at 150px/0.85 uppercase on cream #f7f4e8; two-word declaratives.
- Mechanics: sentence assembles on scroll (lines resolve grey→ink); media at word
  scale that grows on scroll; object descending on a wire; thin 1px outline pills;
  one canvas colour, zero clutter; nav transparent over media.

**SFN content:** research/copy.md (headline + sub are Matthew's, final).

## Resolution of the type tension
Display voice = **Reckless at Zipline scale**: the serif from Arva pushed to
clamp(56px→128px) with tight leading (0.95–1.02), weights 300–600. A colossal
editorial serif is the distinctive move; nobody in the slop space sets serif this big.
Body/UI = Inter. Build uses @font-face family "Reckless" with Cormorant Garamond
(Google, Reckless's documented fallback) standing in until Displaay trial files are
downloaded (requires account — Matthew action); swap is one @font-face line.

## Page structure, exact

0. **Ticker** (lime #e8fe85, ~32px): our real milestone, Arva's pattern:
   "First harvest weighed at Seeds2Education, Kenya · May 2026 · Read the record →"
   marquee-repeated, links to #record. Pauses on hover and under reduced motion.
1. **Nav** on bone: wordmark left (rows mark + "School Farm Network", Reckless 600),
   right links "How it works / The record / Partners", forest pill "Partner with us".
   Sticky; gains hairline on scroll.
2. **Hero** (bone, no photo behind text): Reckless headline in two beats —
   line 1 "The land is already there." (forest ink), line 2 "The system isn't."
   (italic, same size). Between the beats sits the **film at word scale**: the drone
   loop in a rounded (24px) frame ~200px wide that grows on scroll to full container
   width (Zipline's grow mechanic, vertical-safe). Sub = Matthew's sentence, Inter
   18px/1.6, max 58ch. CTAs: forest pill "Partner with us" + 1px outline pill
   "See how it works". Under video: caption "Seeds2Education, Kenya. Our original
   pilot." Reduced-motion/no-JS: film renders full width, no growth.
3. **Problem beat** (forest #07503f full-bleed, cream text): one emotional line only,
   Reckless 48–72px: "Hungry students sit beside empty fields." Two Inter sentences:
   the failure of programmes (no operators, no buyers, no records) → tension that the
   system resolves. No stats here.
4. **The system** (bone): eyebrow "HOW IT WORKS". Four beats resolve on scroll from
   #b9c4b1 (drift) to forest as each enters (Zipline line-resolve):
   "We assess. / We build. / We farm. / We account." Reckless 56–88px stacked.
   Each beat has one Inter line beneath. Then one plain sentence naming the system's
   components verbatim from Matthew's rationale: "operators, infrastructure, agronomy,
   offtake, data, training, financing" set as small-caps inline list, forest.
5. **Stat band** (bone, hairline-topped, Arva's stat shape): lime chip "THE RECORD SO
   FAR" (lime use #2 of 2). Three columns, hairline-separated: Reckless-light numerals
   ~96px with Inter serif labels above:
   "≈4 t — first harvest, weighed, May 2026" / "2 — schools in the current pilot" /
   "1 — system every farm runs on". Sources under each in 13px. NO fourth number.
6. **The record** (white card on bone, 24px radius): honesty ledger, 4 rows
   (Verified / Under way / Ongoing / Not yet measured) with copy per craft page,
   F4E future tense. Right column: the two photographs stacked with captions.
7. **Audience quilt** (bone): three pastel cards (sky/peach/sage, 24px radius, quilt
   order fixed): "I run a school" (contribute land, agreed benefit, no operating risk),
   "I fund infrastructure" (catalytic capital, invest verb), "I buy produce" (offtake
   shapes planting). Each: Reckless 28px head, one Inter line, arrow text-link CTA.
   No pills inside cards.
8. **Close** (forest full-bleed): Reckless 64–96px "Feed every generation." + white
   outline pill "Partner with us" (mailto). Beneath: line-drawn Africa outline (SVG,
   1px cream stroke) with one lit lime marker on Kenya labelled "SEEDS2EDUCATION —
   OPERATING", others absent (honest map). Footer columns (The work / Contact), then
   credit line: "PHOTOGRAPHY FROM SEEDS2EDUCATION, KENYA, OUR ORIGINAL PILOT." and
   small print. This is lime use inside forest — allowed as marker only.

## Copy rules in force
Everything from research/copy.md: banned list, front-loading, one primary action per
view, invest verb for funders, no em dashes, no ownership claims, tonnage never a
headline (stat-band numeral "≈4 t" with label is supporting, not a headline), F4E
future tense.

## Judge rubric (each 1–5; ship gate = all ≥4)
1. Zipline bar: first-impression confidence; nothing template-shaped.
2. Type: Reckless-scale display discipline, tracking, no slop faces.
3. Arva fidelity: bone canvas, forest ink, lime ≤2 uses, pill geometry, quilt.
4. Copy: Matthew's four tests (tension / infrastructure-not-charity / real components
   named / school-garden-charity could not say it).
5. Truth: verified-only, tenses right, no invented figures.
6. Craft: ticker, hairlines, captions, credit line, map, favicon-level details.
7. Motion: the two signature mechanics work, everything else restrained;
   reduced-motion and no-JS complete.
8. Mobile 390: no overflow, hierarchy survives, CTAs reachable.
9. Scanning: front-loaded headings, one primary action per view.
10. Performance/access: no libraries, poster on video, alt text, focus states,
    contrast AA (forest #07503f on bone = 8.1:1; charcoal on bone = 12+:1).
