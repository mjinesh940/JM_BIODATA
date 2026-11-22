import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onMove }) {
  const closeRef = useRef(null)
  const touchX = useRef(0)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onMove(-1)
      if (event.key === 'ArrowRight') onMove(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onMove])

  if (index < 0) return null
  const [file, caption] = images[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button ref={closeRef} className="lightbox__close" type="button" aria-label="Close photo" onClick={onClose}><X /></button>
      <button className="lightbox__prev" type="button" aria-label="Previous photo" onClick={() => onMove(-1)}><ChevronLeft /></button>
      <figure
        onTouchStart={event => { touchX.current = event.changedTouches[0].screenX }}
        onTouchEnd={event => { const delta = event.changedTouches[0].screenX - touchX.current; if (Math.abs(delta) > 45) onMove(delta < 0 ? 1 : -1) }}
      >
        <img src={`${import.meta.env.BASE_URL}assets/moments/${file}`} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
      <button className="lightbox__next" type="button" aria-label="Next photo" onClick={() => onMove(1)}><ChevronRight /></button>
    </div>
  )
}
