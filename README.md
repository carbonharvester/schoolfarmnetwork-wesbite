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

The motion control follows the device setting until explicitly changed, then saves the visitor's preference where storage is available. All reading and email links work without JavaScript. The hero uses a generated editorial scene with an optional scroll-driven transition.

## Release
This branch is a review version. Publish only `dist/`. Preview indexing is disabled through metadata, robots.txt and Netlify response headers. No canonical production URL is set. Use preview deployment only until this version is approved.

Before an approved production release: reconfirm the public contact address; verify media permissions; remove preview-only indexing exclusions; add the production canonical URL; inspect all old routes by direct URL. The clean deployment excludes old folders and pages and returns a real 404 for unknown paths. Do not merge or promote automatically.

## Two complete visual directions
Use ?direction=photo for Joyful school life or ?direction=illustrated for A world of possibility. A persistent comparison control links between them. Both retain the purpose, vision, priorities and contact sections, responsive layouts, optional GSAP scroll scenes and motion controls. Photography uses a full-bleed opening; illustration uses a split composition, bolder section colours and rounded panels. All scene images are AI-generated fictional illustrations of the vision, not records of actual SFN beneficiaries or results. No existing repository photography is displayed.

Images were generated through Higgsfield. Photo job: b2e28ed6-e835-4b45-a04b-3c89c33248b9. Illustration job: c9d73aa3-2c7c-41f7-a6d5-0338eb9ee80f. Preserve the visible AI disclosure. Scene assets are configured in src/media.ts.
