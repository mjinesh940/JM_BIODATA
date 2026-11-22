# Royal Jain Heritage Biodata

Static, vanilla HTML/CSS/JavaScript website designed for GitHub Pages. No build, dependencies, backend, analytics, or tracking are used. Shared content is rendered from `data.js` by `main.js`; pages choose a renderer through their `data-page` attribute.

## Files

- `index.html`, `moments.html`, `basketball.html`, `tech.html`: small page shells and metadata.
- `data.js`: personal details, family, lineage, contacts, navigation, gallery, videos, and technology content.
- `main.js`: reusable rendering, menu, and photo lightbox behavior.
- `style.css`: theme tokens, shared components, responsive rules, reduced-motion support.
- `assets/moments/` and `assets/basketball/Videos/`: original media. Root JPGs are preserved.

## Updating content

Edit the matching entry in `data.js`. For example, change `['Height','5 ft 9 in / 175 cm']` to update height; edit the profession field to change the role. Add a family member to the relevant `family[].items` array as `['Relationship','Full name','Optional note']`. Add a photo file to `assets/moments/` and add `['filename.jpg','Caption']` to `moments`. Add a video under `assets/basketball/Videos/` and add its exact case-sensitive filename and caption to `videos`.

Theme colours are CSS custom properties at the top of `style.css` (`--maroon`, `--gold`, `--ivory`, `--forest`, `--beige`, `--charcoal`, `--white`). Navigation is configured once in `SITE.nav` in `data.js`. Section visibility is centralized in `SITE.sections` in `data.js`: set a key to `false` to hide it or `true` to show it. Keys are `header`, `homeHero`, `biodata`, `heritage`, `family`, `interests`, `contact`, `pageHero`, `gallery`, `videos`, `basketballStats`, `technologyConcepts`, `debugSteps`, and `footer`. The related page renderer checks the same map, so content is hidden consistently without editing HTML. Page-specific flags apply wherever that section occurs; `pageHero` applies to subpage introductions.

## Local preview and deployment

Serve the folder over HTTP for reliable local preview (for example, VS Code Live Server). The site also uses classic local scripts and does not require ES modules or fetch, though browser restrictions may affect media when opened through `file://`. To deploy, publish the repository root with GitHub Pages. Keep relative asset paths so project-site URLs work.

## Notes

Basketball stats are explicitly presented as unverified personal snapshot entries. The original basketball photo list was empty and has not been populated with invented images. Actual video files are `.MOV` numbered 1–5; configured paths match those exact names and retain their existing captions. Cormorant Garamond, Inter, and Noto Sans Devanagari are requested from Google Fonts; system fallbacks remain available offline.
