# Project instructions

- Keep this project static, dependency-free, and compatible with GitHub Pages.
- `data.js` is the source of truth for visible personal, family, contact, navigation, and media content. Do not duplicate these values in page shells.
- Use `SITE.sections` in `data.js` to enable or disable rendered sections; keep visibility decisions out of duplicated page configuration.
- `main.js` owns shared rendering; `style.css` owns shared design tokens and responsive styling.
- `biodata.html` uses the print renderer in `main.js`; keep printable fields sourced from `SITE`, not duplicated markup.
- Preserve original family media and captions, including all five basketball videos. Use exact filename case for video paths.
- Retain Royal Jain Heritage colors and check keyboard access, reduced motion, and mobile layouts when changing UI.
