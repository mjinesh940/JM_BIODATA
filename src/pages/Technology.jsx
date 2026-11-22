import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import { technology } from '../data/technology'

export default function Technology() {
  const [active, setActive] = useState(null)
  return (
    <main>
      <header className="page-hero page-hero--emerald"><span>Curious by nature</span><h1>The Tech Side of Me</h1><p>Technology concepts explained through familiar moments and everyday life.</p></header>
      <section className="section tech-section"><div className="section-shell"><SectionHeading eyebrow="OOPS, but real life" title="How Technology Makes Me Think" />
        <div className="tech-grid">{technology.map(([name, example, meaning], index) => {
          const open = active === index
          return (
            <motion.article className={`tech-card ${open ? 'tech-card--open' : ''}`} key={name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
              <button type="button" aria-expanded={open} onClick={() => setActive(open ? null : index)}><span>0{index + 1}</span><h3>{name}</h3><p>{example}</p><Plus size={20} /></button>
              <AnimatePresence initial={false}>{open && <motion.p className="tech-card__meaning" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{meaning}</motion.p>}</AnimatePresence>
            </motion.article>
          )
        })}</div>
      </div></section>
    </main>
  )
}
