import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Navigation, MapPin, ArrowRight } from 'lucide-react'
import { MasjidList } from '@/components/MasjidList'
import { SearchFilter } from '@/components/SearchFilter'
import { NearbyFinder } from '@/components/NearbyFinder'
import { MapView } from '@/components/MapView'
import { masjids, areas } from '@/data/masjids'
import { formatDistance } from '@/lib/geo'
import type { MasjidWithDistance } from '@/types/masjid'

export function Home() {
  const [query, setQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [distances, setDistances] = useState<Map<string, number>>(new Map())
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const masjidsWithDistances: MasjidWithDistance[] = useMemo(
    () => masjids.map((m) => ({ ...m, distance: distances.get(m.id) })),
    [distances],
  )

  const sorted = useMemo(() => {
    const arr = [...masjidsWithDistances]
    if (distances.size > 0) {
      arr.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
    } else {
      arr.sort((a, b) => a.name.localeCompare(b.name))
    }
    return arr
  }, [masjidsWithDistances, distances])

  const nearest = distances.size > 0 ? sorted[0] : null

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return sorted.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.area.toLowerCase().includes(q) ||
        m.address.toLowerCase().includes(q)
      const matchesArea = !selectedArea || m.area === selectedArea
      return matchesQuery && matchesArea
    })
  }, [sorted, query, selectedArea])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <div className="text-right">
            <h1 className="text-lg font-semibold tracking-tight leading-tight">Salafi Masjids · Kasaragod</h1>
            <p className="text-xs text-muted-foreground">
              {masjids.length} masjids across Kasaragod district
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <MapView masjids={masjidsWithDistances} userLocation={userLocation} />

        <NearbyFinder
          onDistancesReady={setDistances}
          onLocationReady={setUserLocation}
        />

        {nearest && (
          <Link
            to={`/masjid/${nearest.id}`}
            className="block rounded-lg border border-border bg-card hover:bg-secondary transition-colors overflow-hidden"
          >
            <div className="flex items-stretch">
              {/* Placeholder thumbnail */}
              <div className="w-28 sm:w-36 shrink-0 bg-muted flex items-center justify-center">
                <MapPin className="h-7 w-7 text-muted-foreground/40" />
              </div>

              {/* Info */}
              <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Nearest Masjid
                  </p>
                  <p className="font-semibold text-foreground leading-tight text-sm sm:text-base truncate">
                    {nearest.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{nearest.area}, Kasaragod</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Navigation className="h-3.5 w-3.5" />
                    {nearest.distance !== undefined ? formatDistance(nearest.distance) : '—'}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-medium bg-foreground text-background px-2.5 py-1 rounded-md hover:opacity-80 transition-opacity"
                    >
                      <Navigation className="h-3 w-3" />
                      Take me there
                    </a>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      View details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
          areas={areas}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} masjid{filtered.length !== 1 ? 's' : ''}
            {distances.size > 0 ? ', sorted by distance' : ', A–Z'}
          </p>
          {(query || selectedArea) && (
            <button
              onClick={() => { setQuery(''); setSelectedArea(null) }}
              className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <MasjidList masjids={filtered} emptyMessage="No masjids match your search." />
      </main>

      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Masjid Kasaragod — Salafi Masjid Directory</p>
          <p className="text-xs mt-1 opacity-60">For corrections, contact the community.</p>
        </div>
      </footer>
    </div>
  )
}
