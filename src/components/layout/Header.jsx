import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'

const links = [
  ['Home', '/'], ['Biodata', '/#biodata'], ['Heritage', '/#heritage'], ['Family', '/#family'],
  ['Moments', '/moments'], ['Basketball', '/basketball'], ['Technology', '/technology'], ['Contact', '/#contact']
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const close = () => setOpen(false)
  const navigateHomeSection = (event, href) => {
    event.preventDefault()
    close()
    const id = href.split('#')[1]
    if (location.pathname === '/') {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate({ pathname: '/', hash: `#${id}` })
    }
  }
  return (
    <header className="topbar">
      <div className="nav-shell">
        <NavLink className="brand" to="/" aria-label="Jinesh Modi home" onClick={close}>{siteConfig.brand}</NavLink>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}<span>{open ? 'Close' : 'Menu'}</span>
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => href.includes('#') ? (
            <a key={label} href={`#${href.split('#')[1]}`} onClick={event => navigateHomeSection(event, href)}>{label}</a>
          ) : (
            <NavLink key={label} to={href} onClick={close}>{label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
