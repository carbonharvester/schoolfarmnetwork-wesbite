# School Farm Network public website

Editorial, responsive React + TypeScript homepage, with Tailwind CSS and optional GSAP motion. Vite emits content-hashed assets. The build prerenders readable HTML.

## Commands
- `npm ci`: install locked dependencies (Node 22).
- `npm run dev`: start development.
- `npm run build`: type-check, build, prerender to `dist/`.
- `npm run preview`: inspect that production build.
- `npm run lint` / `npm run typecheck`: TypeScript validation.
- `npm test`: check generated content, navigation, metadata and the deployment allowlist after building.

## Editing
Public wording lives in `src/content.ts` and editorial line breaks in `src/App.tsx`. Colours, typography and breakpoints are in `src/style.css`. Image imports, alternative text and responsive sources are in `src/media.ts`. Replace media only with approved material, keeping subject-specific crops and dimensions.

Motion is always active as requested, with no visitor toggle. All reading and email links work without JavaScript. The hero uses a generated editorial scene with an optional scroll-driven transition.

## Release
Production: https://schoolfarmnetwork.com, hosted on the existing Netlify project `schoolfarmnetwork-website`. Publish only `dist/` from the main branch. The homepage has production canonical and social URLs and allows indexing. Unknown routes return a real 404.

Run a clean build and `npm test` before release. Netlify also enforces the configured Lighthouse performance and accessibility thresholds.

## Selected photographic direction
The selected direction is Joyful school life. Each image appears in one section only: a two-pupil burgundy-uniform hero without food, a blue-uniform coastal school scene, a rice-and-bean-stew nutrition scene, young adult agricultural opportunity, and tan-uniform classroom learning. All scenes are fictional AI-generated imagery depicting hopeful, modest Kenyan public-school settings, not actual SFN beneficiaries or results. Young adults alone undertake agricultural work. Simpler child compositions reduce overlapping faces and hands; food is shown separately in a close-up. The schools are deliberately visually distinct. Visible AI labels were removed at the user’s request; image provenance remains documented here.

The comparison control and illustrated option have been removed. Scroll scenes, responsive layouts and always-on motion remain. Images, descriptive alternative text and responsive sizes live in src/media.ts. No existing repository photos are displayed.

The recreated logo pairs a generated book-and-leaf symbol with a live typographic wordmark. The header, priority sections and PNG favicon use the new mark.
