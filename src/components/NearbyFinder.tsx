import { useState, useEffect } from 'react'
import { Navigation, Loader2, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUserLocation, haversineDistance } from '@/lib/geo'
import { masjids } from '@/data/masjids'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface NearbyFinderProps {
  onDistancesReady?: (distances: Map<string, number>) => void
  onLocationReady?: (location: { lat: number; lng: number } | null) => void
}

export function NearbyFinder({ onDistancesReady, onLocationReady }: NearbyFinderProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleFind()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFind = async () => {
    setStatus('loading')
    setError(null)
    try {
      const coords = await getUserLocation()
      const { latitude: userLat, longitude: userLng } = coords

      onLocationReady?.({ lat: userLat, lng: userLng })

      const distMap = new Map<string, number>()
      masjids.forEach((m) => {
        distMap.set(m.id, haversineDistance(userLat, userLng, m.lat, m.lng))
      })
      onDistancesReady?.(distMap)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location')
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setError(null)
    onDistancesReady?.(new Map())
    onLocationReady?.(null)
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Navigation className="h-4 w-4 text-foreground" />
          <span className="font-medium">Sorted by distance from your location</span>
        </div>
        <button onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Reset">
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
        {status === 'error' && (
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
        )}
        {status === 'loading' ? (
          <span>Getting your location…</span>
        ) : status === 'error' ? (
          <span className="truncate">{error ?? 'Location denied'}</span>
        ) : (
          <span>Allow location to sort by distance</span>
        )}
      </div>
      <Button
        onClick={handleFind}
        disabled={status === 'loading'}
        variant="outline"
        size="sm"
        className="gap-2 shrink-0 ml-4"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Locating…
          </>
        ) : (
          <>
            <Navigation className="h-3.5 w-3.5" />
            {status === 'error' ? 'Try again' : 'Use my location'}
          </>
        )}
      </Button>
    </div>
  )
}
