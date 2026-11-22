import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Moments from './pages/Moments.jsx'
import Basketball from './pages/Basketball.jsx'
import Technology from './pages/Technology.jsx'
import PrintableBiodata from './pages/PrintableBiodata.jsx'

function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <RouteEffects />
      {location.pathname !== '/biodata' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moments" element={<Moments />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/biodata" element={<PrintableBiodata />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {location.pathname !== '/biodata' && <Footer />}
    </>
  )
}
