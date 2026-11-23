import { siteConfig } from '../../data/siteConfig'

export default function Footer() {
  return (
    <footer className="footer">
      <span aria-hidden="true">✦</span>
      <strong>{siteConfig.fullName}</strong>
      <small>({siteConfig.surname})</small>
      <p>{siteConfig.profession} · {siteConfig.location}</p>
    </footer>
  )
}
