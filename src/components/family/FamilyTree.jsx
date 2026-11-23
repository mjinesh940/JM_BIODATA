import { motion } from 'framer-motion'
import { family } from '../../data/family'

export default function FamilyTree() {
  return (
    <div className="family-tree">
      {family.map((group, groupIndex) => (
        <motion.section
          className="family-group"
          key={group.group}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: groupIndex * 0.08, duration: 0.6 }}
        >
          <h3>{group.group}</h3>
          <div className="family-card-grid">
            {group.items.map(([relationship, name, note]) => (
              <article className="family-card" key={`${relationship}-${name}`}>
                <span>{relationship}</span>
                <h4>{name}</h4>
                {note && <p>{note}</p>}
              </article>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}
