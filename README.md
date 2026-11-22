# Royal Jain Heritage Biodata

Static, vanilla HTML/CSS/JavaScript website designed for GitHub Pages. No build, dependencies, backend, analytics, or tracking are used. Shared content is rendered from `data.js` by `main.js`; pages choose a renderer through their `data-page` attribute.

## Files

- `index.html`, `moments.html`, `basketball.html`, `tech.html`: small page shells and metadata.
- `biodata.html`: data-driven A4 print view. Its Print / Save as PDF button uses the browser's native print dialog.
- `data.js`: personal details, family, lineage, contacts, navigation, gallery, videos, technology content, portrait, and section visibility.
- `main.js`: reusable rendering, menu, gallery lightbox, section reveals, and print view.
- `style.css`: Royal Floral Heritage theme tokens, shared components, responsive rules, reduced-motion support, and A4 print styles.
- `assets/moments/`, `assets/basketball/Videos/`, and local floral SVG assets: original media and reusable ornamental elements.

## Updating content

Edit `data.js` for visible content. Change `fullName`, `surname`, `profession`, `location`, or `hero.intro` for personal copy. Update `biodata` with existing information only. Add a family member to the relevant `family[].items` array as `['Relationship','Full name','Optional note']`. Add a photograph to `assets/moments/` and add `['filename.jpg','Caption']` to `moments`. Add a video under `assets/basketball/Videos/` and add its exact case-sensitive filename and caption to `videos`. Update `portrait` to select an existing profile photograph.

Theme colours are CSS custom properties at the top of `style.css` (`--maroon`, `--burgundy`, `--gold`, `--ivory`, `--forest`, `--dusty-rose`, `--charcoal`, `--white`). Replace local SVG ornaments in `assets/` to update the reusable botanical motif system.

Navigation is configured once in `SITE.nav` in `data.js`. Section visibility is centralized in `SITE.sections`: set a key to `false` to hide it or `true` to show it. Keys are `header`, `homeHero`, `biodata`, `heritage`, `family`, `interests`, `contact`, `pageHero`, `gallery`, `videos`, `basketballStats`, `technologyConcepts`, `debugSteps`, `footer`, and `printPortrait`.

## Print / Save as PDF

Open `biodata.html` over HTTP or GitHub Pages, press **Print / Save as PDF**, and choose Save as PDF in the browser print dialog. Enable background graphics for gold and floral accents. The document uses A4 portrait, `210mm × 297mm`, native browser printing, and data from `data.js`; missing fields are omitted rather than invented.

## Local preview

Serve the folder over HTTP for reliable local preview. The site remains dependency-free and GitHub Pages compatible. Keep relative asset paths and exact case for MOV filenames.

## Accessibility and motion

The site uses semantic landmarks, keyboard focus states, accessible lightbox controls and labels, reduced-motion handling, lazy-loaded gallery media, native video controls, responsive navigation, and 44px-plus touch targets.
