# SFN typography

Method step 6: real investment in type, licence checked before shipping.

## Recommendation

**Display: Reckless Neue (Displaay Type Foundry)** — the exact serif Arva's design
system is built on. This is the single biggest lever for making the SFN build feel like
the chosen reference rather than an imitation of it.

- Price: **€55 per style** (basic tier; commercial tiers scale with company size).
  Realistic SFN need: Regular + Medium, with one italic optional, so roughly
  **€110–165 one-off**.
- Family: 9 sub-families, 72 weights; we use Reckless Neue (the Standard-width cut).
- **Free full trial fonts are offered** — so we build and iterate on trials now and buy
  the licence at ship time. Legal and free during design.
- Source: displaay.net/typeface/reckless

**Body and UI: Inter (free, Google Fonts).** Not a compromise: Inter is what Arva's
system itself pairs with Reckless, and it is also Zipline's body face. Reference and
gold standard agree, so the money goes where it shows: the display serif.

**Fallback stacks:** Reckless Neue → Georgia/serif; Inter → system-ui/sans-serif.

## Considered and not chosen

- **Söhne (Klim)** as a paid body upgrade: beautiful, roughly the same one-off per-style
  pricing model (klim.co.nz; exact price only shown at checkout), but it buys almost
  nothing over Inter at body sizes here, and it departs from both reference and gold
  standard. Not worth the spend.
- **Free lookalikes for Reckless** (Fraunces etc.): rejected. Using the reference's real
  face is the point of licensing; Fraunces is also on the banned list from earlier
  rejected rounds.

## Rules carried into the build

- Reckless Neue for display only, 24px and up, weights per Arva's system (300/500/600).
- Inter for everything else, 12–18px body, weight 400/500/600.
- Tracking per Arva's tokens: about -0.037em at display sizes, -0.012em on the serif,
  positive tracking (+0.025em) only on small uppercase labels.
- Licence purchase (~€110–165) is a launch-blocking checklist item, recorded here so it
  cannot be forgotten: trials may not ship to production.
