import printBackground from '../../../assets/Background.jpg'
import { biodata } from '../../data/biodata'
import { family } from '../../data/family'
import { lineage } from '../../data/lineage'
import { contacts, address } from '../../data/contact'
import { siteConfig } from '../../data/siteConfig'

export default function BiodataDocument({ printButton = false }) {
  const portrait = `${import.meta.env.BASE_URL}${siteConfig.portrait}`
  return (
    <main className="print-sheet">
      {printButton && (
        <div className="print-actions">
          <button type="button" className="print-button" onClick={() => window.print()}>Print / Save as PDF</button>
          <a className="print-button print-button--ghost" href={`${import.meta.env.BASE_URL}`}>Back to Website</a>
        </div>
      )}
      <article className="biodata-document">
        <img className="document-frame-background" src={printBackground} alt="" aria-hidden="true" />
        <div className="document-content">
          <header className="document-header">
            <span className="document-mark">✦ &nbsp; JAIN · SHWETAMBAR &nbsp; ✦</span>
            <div className="document-profile">
              <img src={portrait} alt={`Portrait of ${siteConfig.fullName}`} />
              <div>
                <p className="document-kicker">Marriage Biodata</p>
                <h1>{siteConfig.fullName}</h1>
                <p className="document-surname">({siteConfig.surname})</p>
                <p className="document-profession-location">{siteConfig.profession} · {siteConfig.location}</p>
              </div>
            </div>
          </header>

          <section className="document-section">
            <h2>Personal Information</h2>
            <dl>{biodata.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </section>

          <section className="document-section">
            <h2>Family Lineage</h2>
            <dl>{lineage.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </section>

          <section className="document-section">
            <h2>Family Members</h2>
            <div className="document-family-grid">{family.map(group => (
              <div className="document-family" key={group.group}><h3>{group.group}</h3>
                {group.items.map(([relationship, name, note]) => <p key={relationship}><b>{relationship}:</b> {name}{note ? ` · ${note}` : ''}</p>)}
              </div>
            ))}</div>
          </section>

          <section className="document-section">
            <h2>Contact & Address</h2>
            <div className="document-contacts">
              {contacts.map(contact => <p key={contact.label}><b>{contact.label}:</b> {contact.value}</p>)}
              <p><b>Address:</b> {address}</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
