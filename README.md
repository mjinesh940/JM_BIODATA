# Royal Floral Heritage — React Marriage Biodata

A dependency-managed React/Vite migration of the Jinesh Jitendra Modi marriage biodata website. The application is frontend-only and designed for GitHub Pages using HashRouter.

## Technology

- React 19
- Vite
- React Router HashRouter
- Framer Motion
- Lucide React
- Vanilla CSS

## Install and run

```bash
npm install
npm run dev
```

Local Vite URLs use the `/JM_BIODATA/` base path.

## Production build

```bash
npm run build
npm run preview
```

The generated `dist/` directory is the deployable GitHub Pages artifact.

## Architecture

- `src/pages/` contains Home, Moments, Basketball, Technology, and printable biodata routes.
- `src/components/layout/` contains shared header and footer layout.
- `src/components/common/` contains reusable decorative and section components.
- `src/components/family/` contains the family presentation.
- `src/components/gallery/` contains the accessible lightbox.
- `src/components/biodata/` contains the A4 reusable document.
- `src/data/` contains centralized personal, family, lineage, contact, gallery, video, and technology content.
- `src/styles/` contains global, responsive, and print styles.

## Routes

- `/` — Home
- `/moments` — Moments of Joy
- `/basketball` — Basketball
- `/technology` — Technology
- `/biodata` — Printable biodata

HashRouter URLs look like `#/moments` and remain reliable after refresh on GitHub Pages.

## Updating content

- Personal identity and section visibility: `src/data/siteConfig.js`
- Personal fields: `src/data/biodata.js`
- Lineage: `src/data/lineage.js`
- Family: `src/data/family.js`
- Gallery: `src/data/gallery.js`
- Basketball: `src/data/basketball.js`
- Technology: `src/data/technology.js`
- Contacts and address: `src/data/contact.js`

Add new moments to `gallery.js` and place images in `public/assets/moments/`. Add basketball videos to `public/assets/basketball/Videos/` and add their exact case-sensitive filename to `basketball.js`.

Add family members to the relevant `family[].items` array. Do not add invented relationships or photographs.

## Theme

Palette and typography variables are in `src/styles/global.css`. The reusable Royal Floral motifs are in `public/assets/`.

## Printing

Open `#/biodata`, select **Print / Save as PDF**, and choose Save as PDF in the browser print dialog. Print rules are in `src/styles/print.css`. Enable background graphics for the decorative borders and portrait treatment.

## GitHub Pages

Vite is configured with the repository base `/JM_BIODATA/` in `vite.config.js`. The manual GitHub Actions workflow `.github/workflows/deploy-react.yml` builds and can deploy the project. It does not run automatically on push.
