import { motion } from 'framer-motion'
import { ArrowDown, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/common/SectionHeading.jsx'
import FamilyTree from '../components/family/FamilyTree.jsx'
import { siteConfig } from '../data/siteConfig'
import { biodata } from '../data/biodata'
import { lineage } from '../data/lineage'
import { contacts, address, addressUrl } from '../data/contact'

export default function Home() {
  return (
    <main>
      {siteConfig.sections.homeHero && <section className="royal-hero">
        <div className="hero-ornament hero-ornament--left" aria-hidden="true">✦</div>
        <div className="hero-ornament hero-ornament--right" aria-hidden="true">✦</div>
        <div className="royal-hero__inner">
          <motion.div className="portrait-frame" initial={{ opacity: 0, scale: 0.94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>
            <img src={`${import.meta.env.BASE_URL}${siteConfig.portrait}`} alt={`Portrait of ${siteConfig.fullName}`} fetchPriority="high" />
            <span>{siteConfig.fullName} · {siteConfig.surname}</span>
          </motion.div>
          <motion.div className="hero-copy" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.85 }}>
            <span className="eyebrow">{siteConfig.hero.kicker}</span>
            <h1>Er. Jinesh Jitendra <em>Modi</em></h1>
            <p className="hero-surname">({siteConfig.surname})</p>
            <div className="gold-rule" />
            <p className="hero-profession">{siteConfig.profession} <b>·</b> {siteConfig.location}</p>
            <p className="hero-intro">{siteConfig.hero.intro}</p>
            <div className="hero-actions">
              <a className="button button--gold" href="#biodata">Explore Biodata</a>
              <Link className="button button--outline" to="/biodata"><Printer size={18} /> Print Biodata / PDF</Link>
            </div>
            <a className="scroll-cue" href="#biodata"><ArrowDown size={16} /> Scroll to discover</a>
          </motion.div>
        </div>
      </section>}

      {siteConfig.sections.biodata && <section id="biodata" className="section biodata-section">
        <div className="section-shell"><SectionHeading eyebrow="Personal chapter" title="Personal Information" />
          <div className="biodata-grid">{biodata.map(([label, value], index) => (
            <motion.article className="biodata-card" key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 5) * 0.06 }}><small>{label}</small><h3>{value}</h3></motion.article>
          ))}</div>
        </div>
      </section>}

      {siteConfig.sections.heritage && <section id="heritage" className="section heritage-section">
        <div className="heritage-mandala" aria-hidden="true" />
        <div className="section-shell"><SectionHeading eyebrow="Roots & lineage" title="Sacred Lineage" light />
          <div className="lineage-timeline">{lineage.map(([label, value, note], index) => (
            <motion.article key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }}><span>0{index + 1}</span><div><small>{label}</small><h3>{value}</h3>{note && <p>{note}</p>}</div></motion.article>
          ))}</div>
        </div>
      </section>}

      {siteConfig.sections.family && <section id="family" className="section family-section">
        <div className="section-shell"><SectionHeading eyebrow="The people closest" title="Family · Our Roots" /><FamilyTree /></div>
      </section>}

      {siteConfig.sections.interests && <section className="section interests-section">
        <div className="section-shell"><SectionHeading eyebrow="Beyond the profile" title="Interests & Hobbies" />
          <div className="interest-grid">
            <Link className="interest-card interest-card--plum" to="/basketball"><span>01</span><h3>Basketball</h3><p>The joy of the game, teamwork and a competitive spirit.</p><b>Explore →</b></Link>
            <Link className="interest-card interest-card--emerald" to="/technology"><span>02</span><h3>Technology</h3><p>Curiosity for ideas, engineering and emerging tools.</p><b>Explore →</b></Link>
            <Link className="interest-card interest-card--ivory" to="/moments"><img src={`${import.meta.env.BASE_URL}beach.jpg`} alt="Jinesh enjoying a quiet moment" loading="lazy" /><h3>Moments of Joy</h3><b>View memories →</b></Link>
          </div>
        </div>
      </section>}

      {siteConfig.sections.contact && <section id="contact" className="section contact-section">
        <div className="section-shell"><SectionHeading eyebrow="Stay in touch" title="Contact & Family" light />
          <div className="contact-grid">{contacts.map((contact, index) => (
            <motion.a className="contact-card" href={contact.href} key={contact.label} target={contact.kind === 'instagram' ? '_blank' : undefined} rel="noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><small>{contact.label}</small><strong>{contact.value}</strong></motion.a>
          ))}</div>
          <div className="address-card"><div><small>Sweet Home</small><p>{address}</p></div><a href={addressUrl} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div>
        </div>
      </section>}
    </main>
  )
}
