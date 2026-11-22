# Royal Jain Heritage Biodata

Static, vanilla HTML/CSS/JavaScript website designed for GitHub Pages. No build, dependencies, backend, analytics, or tracking are used. Shared content is rendered from `data.js` by `main.js`; pages choose a renderer through their `data-page` attribute.

## Files

- `index.html`, `moments.html`, `basketball.html`, `tech.html`: small page shells and metadata.
- `biodata.html`: data-driven A4 print view. Its Print / Save as PDF button uses the browser's native print dialog.
- `data.js`: personal details, family, lineage, contacts, navigation, gallery, videos, technology content, portrait, and section visibility.
- `main.js`: reusable rendering, menu, gallery lightbox, section reveals, and print view.
- `style.css`: theme tokens, shared components, responsive rules, reduced-motion support, and A4 print styles.
- `assets/moments/` and `assets/basketball/Videos/`: original media. Root JPGs are preserved.

## Updating content

Edit the matching entry in `data.js`. For example, change the height row in `biodata` to update height; edit `profession` to change the role. Add a family member to the relevant `family[].items` array as `['Relationship','Full name','Optional note']`. Add a photo file to `assets/moments/` and add `['filename.jpg','Caption']` to `moments`. Add a video under `assets/basketball/Videos/` and add its exact case-sensitive filename and caption to `videos`. Update `portrait` to select another existing profile photograph. The print page consumes the same biodata, family, lineage, contacts, address, and portrait values; education is omitted because no education data is currently provided.

Theme colours are CSS custom properties at the top of `style.css` (`--maroon`, `--burgundy`, `--gold`, `--ivory`, `--forest`, `--beige`, `--charcoal`, `--white`). Navigation is configured once in `SITE.nav` in `data.js`. Section visibility is centralized in `SITE.sections` in `data.js`: set a key to `false` to hide it or `true` to show it. Keys are `header`, `homeHero`, `biodata`, `heritage`, `family`, `interests`, `contact`, `pageHero`, `gallery`, `videos`, `basketballStats`, `technologyConcepts`, `debugSteps`, `footer`, and `printPortrait`. The related page renderer checks the same map. The print page is separate; use `printPortrait` to omit its portrait. `pageHero` applies to subpage introductions.

To make a PDF, open `biodata.html` through the local HTTP server or deployed GitHub Pages URL, press **Print / Save as PDF**, and select Save as PDF in the browser dialog. The print stylesheet requests A4 portrait and uses native browser printing; enable background graphics in print settings for the maroon and gold accents. Check the resulting page count because printer/browser font metrics can vary.

## Local preview and deployment

Serve the folder over HTTP for reliable local preview (for example, VS Code Live Server). The site also uses classic local scripts and does not require ES modules or fetch, though browser restrictions may affect media when opened through `file://`. To deploy, publish the repository root with GitHub Pages. Keep relative asset paths so project-site URLs work.

## Notes

Basketball stats are explicitly presented as unverified personal snapshot entries. The original basketball photo list was empty and has not been populated with invented images. Actual video files are `.MOV` numbered 1–5; configured paths match those exact names and retain their existing captions. Cormorant Garamond, Inter, and Noto Sans Devanagari are requested from Google Fonts; system fallbacks remain available offline.
