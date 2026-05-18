import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { MasjidDetail } from '@/pages/MasjidDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masjid/:id" element={<MasjidDetail />} />
        {/* Fallback → home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
