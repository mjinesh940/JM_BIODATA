import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Lightbox from '../components/gallery/Lightbox.jsx'
import { gallery } from '../data/gallery'

export default function Moments() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const openerRef = useRef(null)
  const close = () => { setLightboxIndex(-1); requestAnimationFrame(() => openerRef.current?.focus()) }
  const move = delta => setLightboxIndex(index => (index + delta + gallery.length) % gallery.length)

  return (
    <main>
      <header className="page-hero"><span>The family album</span><h1>Moments of Joy</h1><p>A gentle collection of smiles, celebrations and the people who make every moment meaningful.</p></header>
      <section className="section gallery-section"><div className="section-shell"><SectionHeading eyebrow="Captured memories" title="The Family Album" /><div className="masonry-gallery">
        {gallery.map(([file, caption], index) => (
          <motion.button className="gallery-card" type="button" key={file} aria-label={`Open photo: ${caption}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 5) * 0.06 }} onClick={event => { openerRef.current = event.currentTarget; setLightboxIndex(index) }}>
            <img src={`${import.meta.env.BASE_URL}assets/moments/${file}`} alt={caption} loading="lazy" /><span>{caption}</span>
          </motion.button>
        ))}
      </div></div></section>
      {lightboxIndex >= 0 && <Lightbox images={gallery} index={lightboxIndex} onClose={close} onMove={move} />}
    </main>
  )
}
