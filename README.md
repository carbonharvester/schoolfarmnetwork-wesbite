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

The motion control follows the device setting until explicitly changed, then saves the visitor's preference where storage is available. All reading and email links work without JavaScript. Landscape imagery is the finished alternative to video.

## Release
This branch is a review version. Publish only `dist/`. Preview indexing is disabled through metadata, robots.txt and Netlify response headers. No canonical production URL is set. Use preview deployment only until this version is approved.

Before an approved production release: reconfirm the public contact address; verify media permissions; remove preview-only indexing exclusions; add the production canonical URL; inspect all old routes by direct URL. The clean deployment excludes old folders and pages and returns a real 404 for unknown paths. Do not merge or promote automatically.
