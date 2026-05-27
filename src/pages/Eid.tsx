import { Link } from 'react-router-dom'
import { ArrowLeft, Moon, FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react'
import { eidPrayers, eidInfo, type EidPrayerEntry } from '@/data/eidPrayers'

function parseTimeMinutes(time: string): number {
  const [hm, period] = time.split(' ')
  const [h, m] = hm.split(':').map(Number)
  return ((period === 'PM' && h !== 12) ? h + 12 : h) * 60 + m
}

const sorted = [...eidPrayers].sort((a, b) => {
  if (a.time && b.time) return parseTimeMinutes(a.time) - parseTimeMinutes(b.time)
  if (a.time) return -1
  if (b.time) return 1
  return a.area.localeCompare(b.area)
})

const confirmed = sorted.filter((e) => e.time)
const tbd = sorted.filter((e) => !e.time)

function EidCard({ entry }: { entry: EidPrayerEntry }) {
  const inner = (
    <>
      <div className={`text-xl font-bold tabular-nums leading-none mb-2 ${entry.time ? 'text-green-600' : 'text-muted-foreground'}`}>
        {entry.time ?? 'TBD'}
      </div>
      <div className="font-semibold text-sm leading-tight mb-0.5">{entry.areaLocal}</div>
      <div className="text-xs text-muted-foreground mb-auto">{entry.area}</div>
      <div className="text-xs text-muted-foreground/60 pt-2 truncate">{entry.khateeb}</div>
    </>
  )

  const base = 'rounded-lg border border-border bg-card p-3 flex flex-col h-full'

  if (entry.masjidId) {
    return (
      <Link to={`/masjid/${entry.masjidId}`} className={`${base} hover:bg-secondary transition-colors`}>
        {inner}
      </Link>
    )
  }
  return <div className={base}>{inner}</div>
}

export function Eid() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <h1 className="text-lg font-semibold tracking-tight leading-tight">Salafi Masjids · Kasaragod</h1>
            <p className="text-xs text-muted-foreground">Eid Prayer Timings</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to directory
        </Link>

        {/* Banner */}
        <div className="rounded-xl border border-border bg-card px-6 py-8 text-center mb-8">
          <Moon className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h2 className="text-4xl font-bold tracking-tight mb-1">{eidInfo.nameLocal}</h2>
          <p className="text-base text-muted-foreground mb-1">{eidInfo.subLocal}</p>
          <p className="text-lg font-medium">{eidInfo.name}</p>
          <p className="text-sm text-muted-foreground mt-3">
            {eidPrayers.length} locations &middot; {confirmed.length} times confirmed
          </p>
        </div>

        {/* Confirmed */}
        {confirmed.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Confirmed Times
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {confirmed.map((entry) => (
                <EidCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {/* TBD */}
        {tbd.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Time Not Yet Announced
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {tbd.map((entry) => (
                <EidCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Masjid Kasaragod — Salafi Masjid Directory</p>
          <p className="text-xs mt-1 opacity-60">For corrections, contact the community.</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a
              href="https://www.facebook.com/WisdomKasaragodDist/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-90 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/wisdom_kasaragod/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCTOHC_slC8EZdZLBlSWODKw"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-90 transition-opacity"
              aria-label="YouTube"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs mt-3 opacity-50">
            Map data ©{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              OpenStreetMap
            </a>{' '}
            contributors
          </p>
        </div>
      </footer>
    </div>
  )
}
