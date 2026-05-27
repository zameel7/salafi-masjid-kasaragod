import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { MasjidDetail } from '@/pages/MasjidDetail'
import { Eid } from '@/pages/Eid'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eid" element={<Eid />} />
        <Route path="/masjid/:id" element={<MasjidDetail />} />
        {/* Fallback → home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
