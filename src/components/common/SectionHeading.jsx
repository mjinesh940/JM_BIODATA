import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <motion.header
      className={`section-heading ${light ? 'section-heading--light' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
    >
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <span className="floral-divider" aria-hidden="true"><i /><b>✦</b><i /></span>
    </motion.header>
  )
}
