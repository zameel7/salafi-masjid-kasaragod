import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { MasjidWithDistance } from '@/types/masjid'
import { formatDistance } from '@/lib/geo'

const masjidIcon = L.divIcon({
  className: '',
  html: `<div style="width:22px;height:22px;background:#0f172a;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
})

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;background:#2563eb;border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px rgba(37,99,235,0.25),0 2px 5px rgba(0,0,0,0.3);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] })
    }
  }, [map, positions])
  return null
}

interface MapViewProps {
  masjids: MasjidWithDistance[]
  userLocation: { lat: number; lng: number } | null
}

export function MapView({ masjids, userLocation }: MapViewProps) {
  const validMasjids = useMemo(() => masjids.filter((m) => m.lat !== 0 && m.lng !== 0), [masjids])

  const positions = useMemo<[number, number][]>(
    () => validMasjids.map((m) => [m.lat, m.lng]),
    [validMasjids],
  )

  const center: [number, number] = [12.55, 74.97]

  return (
    <div className="rounded-lg border border-border overflow-hidden" style={{ height: '380px' }}>
      <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={positions} />

        {validMasjids.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={masjidIcon}>
            <Popup>
              <div style={{ minWidth: '160px' }}>
                <p style={{ fontWeight: '600', fontSize: '13px', marginBottom: '2px' }}>{m.name}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{m.area}</p>
                {m.distance !== undefined && (
                  <p style={{ fontSize: '12px', marginBottom: '6px', color: '#374151' }}>
                    {formatDistance(m.distance)} away
                  </p>
                )}
                <a
                  href={`/masjid/${m.id}`}
                  style={{ fontSize: '13px', color: '#0f172a', fontWeight: '500', textDecoration: 'underline' }}
                >
                  View details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <p style={{ fontSize: '13px', fontWeight: '500' }}>Your location</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
