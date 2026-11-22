import { motion } from 'framer-motion'
import SectionHeading from '../components/common/SectionHeading.jsx'
import { basketballVideos } from '../data/basketball'

export default function Basketball() {
  return (
    <main>
      <header className="page-hero page-hero--burgundy"><span>Beyond the software</span><h1>Basketball</h1><p>The rhythm of the court, the joy of teamwork and the discipline of playing the game.</p></header>
      <section className="section basketball-section"><div className="section-shell"><SectionHeading eyebrow="On the court" title="Game Highlights" />
        <div className="video-grid">{basketballVideos.map(([file, title], index) => (
          <motion.article className="video-card" key={file} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
            <h3>{title}</h3>
            <video controls playsInline preload="none" aria-label={title}><source src={`${import.meta.env.BASE_URL}assets/basketball/Videos/${file}`} type="video/quicktime" />Video playback is not supported by this browser.</video>
          </motion.article>
        ))}</div>
      </div></section>
    </main>
  )
}
