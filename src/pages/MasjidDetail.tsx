import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Calendar,
  Navigation,
  ExternalLink,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { masjids } from '@/data/masjids'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getUserLocation, haversineDistance, formatDistance } from '@/lib/geo'

export function MasjidDetail() {
  const { id } = useParams<{ id: string }>()
  const masjid = masjids.find((m) => m.id === id)

  const [distance, setDistance] = useState<number | null>(null)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  // Auto-fetch distance on mount
  useEffect(() => {
    if (!masjid) return
    setGeoStatus('loading')
    getUserLocation()
      .then((coords) => {
        const d = haversineDistance(coords.latitude, coords.longitude, masjid.lat, masjid.lng)
        setDistance(d)
        setGeoStatus('done')
      })
      .catch(() => {
        setGeoStatus('error')
      })
  }, [masjid])

  if (!masjid) return <Navigate to="/" replace />

  const mapsUrl = masjid.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${masjid.lat},${masjid.lng}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}`
  const embedUrl = `https://maps.google.com/maps?q=${masjid.lat},${masjid.lng}&hl=en&z=16&output=embed`

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              All Masjids
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Title block */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {masjid.name}
            </h1>
            {masjid.nameAr && (
              <p className="font-arabic text-2xl text-amber-600 dark:text-amber-400 mt-1 leading-relaxed">
                {masjid.nameAr}
              </p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">
                {masjid.area}
              </Badge>
              {masjid.established && (
                <Badge variant="outline" className="text-xs">
                  Est. {masjid.established}
                </Badge>
              )}
            </div>
          </div>

          {/* Distance indicator */}
          <div className="shrink-0">
            {geoStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Getting distance…
              </div>
            )}
            {geoStatus === 'done' && distance !== null && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-[0.75rem] border border-amber-200 dark:border-amber-800">
                <Navigation className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-300 leading-none">
                    {formatDistance(distance)}
                  </p>
                  <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-0.5">from you</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {masjid.description && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">{masjid.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact & Location */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="font-display font-semibold text-base text-foreground">Contact & Location</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Address</p>
                    <p className="text-sm text-foreground">{masjid.address}</p>
                  </div>
                </div>

                {masjid.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Phone</p>
                      <a
                        href={`tel:${masjid.phone}`}
                        className="text-sm text-foreground hover:text-amber-600 transition-colors"
                      >
                        {masjid.phone}
                      </a>
                    </div>
                  </div>
                )}

                {masjid.imam && (
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Imam</p>
                      <p className="text-sm text-foreground">{masjid.imam}</p>
                    </div>
                  </div>
                )}

                {masjid.established && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Established</p>
                      <p className="text-sm text-foreground">{masjid.established}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          {masjid.facilities && masjid.facilities.length > 0 && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-display font-semibold text-base text-foreground">Facilities</h2>
                <ul className="space-y-2">
                  {masjid.facilities.map((facility) => (
                    <li key={facility} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                      {facility}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map & Directions */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-display font-semibold text-base text-foreground">Location</h2>

            <div className="rounded-lg overflow-hidden border border-border" style={{ height: '300px' }}>
              <iframe
                src={embedUrl}
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${masjid.name}`}
              />
            </div>

            {/* Map action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 gap-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-900/50 dark:hover:border-amber-700 dark:hover:bg-amber-900/20"
              >
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View on Google Maps
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600"
              >
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="pt-2 pb-6">
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to all masjids
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
