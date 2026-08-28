# Reference research — School Farm Network
Done 2026-08-28, before any design work. Method from the two video digests: find the reference by evidence, name it, take its real tokens, then build.

## What I actually did

Swept `styles.refero.design` across ten queries chosen from SFN's business, not from taste:
`agriculture`, `infrastructure`, `food`, `africa`, `farm`, `impact foundation`, `earth warm editorial`, `climate`, `bold condensed type`, `nonprofit charity social`, `water land harvest`.

That produced **603 distinct entries**. I filtered to **80 candidates** whose business or register plausibly overlaps SFN, downloaded every preview, and looked at all of them in labelled contact sheets rather than judging from names. I then opened the strongest live in the browser and pulled their computed tokens off the running page.

Files: `contact sheets + 74 previews` in the session scratchpad, `refero/cand.txt` for the candidate list.

## Why the previous attempts failed

Zipline was never a research result. Matthew named it in his first message and I kept reaching for it because it was the one name I already had. Everything downstream inherited that. The nine rejected iterations were variations on a reference I never earned.

## What the research actually surfaced

### Tier 1 — closest business match

**Ambrook** (ambrook.com) — accounting and payments software for American farms and ranches. The nearest living analogue to SFN: serious money, working land, evidence as the product.
Real tokens pulled off the page:
- canvas white / bone, ink `#211B15` (warm near-black, never pure black)
- accent `#E8B672` (wheat) — used for the announcement bar and every button
- typeface **Lateral** in three cuts (Display / regular / Narrow); H1 700 at 72px, line-height 72px (1.0), tracking -0.8px
- radius 4px. Dark forest-green panels for product sections.
- Custom graphic layer: **hand-drawn engraving illustrations** (tractor, cow, grain elevator) in the manner of 19th-century seed catalogues and agricultural almanacs.
- Proof pattern: a horizontally scrolling customer-logo marquee with "Over 8,000 businesses rely on Ambrook" set inline in the middle of the strip.

**Piet Oudolf** (oudolf.com) — the planting designer. The most transferable idea I found anywhere.
The entire homepage is **a sentence listing every garden he has made**, set large, each name a link, grouped as "Public gardens" and "Private gardens" with rotated labels in the left margin and a superscript country code before each name. Behind the type sits a full-bleed mosaic of 33 garden photographs under a warm-grey veil `rgba(132,129,123,0.95)`; the type is white on top, so the photographs read as ghosts inside and around the letters. Typeface Univers LT Std Light, 400 weight.
Why it matters for SFN: SFN *is* a network. A homepage that enumerates every school, with the land behind the names, is evidence-led by construction and grows as the network grows. No NGO does this.

**Munro Partners** — growth investor. Aerial landscape, colossal wordmark set vertically down the right edge, a cream band beneath carrying plain-spoken text. "Invest in the journey."

### Tier 2 — the boldness register, arrived at independently

**Break Maiden** (breakmaiden.co) — black canvas, white ink. Headline typeface **Martin** at 155px with 96px line-height, so the lines overlap. Arrow glyphs set inline inside the sentence.
Martin is a **Vocal Type Co.** face — Tré Seals's foundry, which draws typefaces from protest movements and underrepresented histories. Martin comes from the placards of the 1968 Memphis sanitation strike.
This opened the most useful thread in the whole search. Vocal Type also publishes:
- **Bayard**, from the 1963 March on Washington
- **Du Bois**, from W.E.B. Du Bois's hand-lettered infographics for the 1900 Paris Exposition

**Du Bois is the find.** In 1900 Du Bois presented evidence about Black American life to a sceptical world using bold, hand-drawn, geometric charts — red, ochre, green, tan and black on cream. That is precisely SFN's rhetorical problem: presenting modest, honest, verifiable evidence about African agriculture to capital allocators who have seen a thousand NGO decks. It is a design language with an argument built into it, and it is the opposite of a template.

**Yinka Ilori Studio** — British-Nigerian designer. A repeating pattern fills the canvas; colossal display caps sit on top. Joy and colour as the medium, no documentary photography at all.

**Datalands** — farmland investment. Ultra-fat wordmark filling the viewport on black.

### Tier 3 — patterns worth taking

- **Ecosia** — live running counters as the proof layer (trees planted, money committed).
- **INVERSA** — conservation with the confidence of a defence brand: aerial land photography, a terse two-line declarative bottom-left, one chartreuse pill.
- **HowManyPlants** — a custom illustrated agrarian layer in cream, olive and mustard, with type interleaved into the illustration.

## Palette convergence

Ambrook's `#211B15` ink and `#E8B672` wheat, Du Bois's cream/red/ochre/green, and Oudolf's warm grey veil all land in the same place as the recorded S2E direction: daylight and earth — cream, kraft, leaf, clay, maize. Never void-black with neon. That agreement across independent sources is the strongest signal in the research.

## Rules carried into the build

1. Typography must be unfamiliar. Not used again: Anton, Archivo, Fraunces, Inter, Schibsted Grotesk, Bebas, Oswald, Anybody, Onest, Martian Mono.
2. Every direction ships a custom authored graphic layer. No stock, no AI photography — dishonest for an evidence-led organisation.
3. Photography is evidence, never wallpaper. It goes inside a frame, inside letters, or inside a filmstrip.
4. Evidence rules from the brief are absolute: one site, one cycle, approximately 4 tonnes of onions harvested and weighed at Seeds2Education in May 2026. The harvest is *being sold*; proceeds *will be* paid to Food for Education. Never state the exchange has happened.
