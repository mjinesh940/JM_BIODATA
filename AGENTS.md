# Project instructions

- Keep the project frontend-only, static, and compatible with GitHub Pages.
- Use React components from `src/components/` and routes from `src/pages/`.
- Keep editable personal, family, lineage, contact, gallery, basketball, technology, and navigation content in `src/data/`.
- Components must consume centralized data; do not duplicate personal information in page shells.
- Use `siteConfig.sections` to enable or disable home sections.
- Preserve original family media and all five basketball videos. Use exact filename case for MOV paths.
- Keep existing photographs and gallery captions unchanged unless explicitly requested.
- Use HashRouter for GitHub Pages routes and the repository base `/JM_BIODATA/` in Vite configuration.
- Use Framer Motion for intentional entrance and reveal effects and CSS for simpler layout effects.
- Respect `prefers-reduced-motion`, keyboard navigation, focus visibility, touch targets, and safe-area spacing.
- Keep print rendering data-driven through `BiodataDocument` and dedicated print styles.
- Do not publish or deploy without explicit approval; the GitHub Actions workflow is manual-only.
