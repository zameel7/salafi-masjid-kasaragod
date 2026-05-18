import { Link } from 'react-router-dom'
import { MapPin, Phone, User, Calendar, Navigation } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDistance } from '@/lib/geo'
import type { MasjidWithDistance } from '@/types/masjid'

interface MasjidCardProps {
  masjid: MasjidWithDistance
}

export function MasjidCard({ masjid }: MasjidCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-card border-border/60">
      {/* Map thumbnail */}
      <div className="relative h-36 overflow-hidden bg-muted">
        <img
          src={
            masjid.imageUrl ??
            `https://maps.wikimedia.org/img/osm-intl,15,${masjid.lat},${masjid.lng},600x300.png`
          }
          alt={masjid.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Distance badge */}
        {masjid.distance !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge className="gap-1 text-xs bg-background/90 text-foreground border border-border backdrop-blur-sm shadow-sm">
              <Navigation className="h-2.5 w-2.5" />
              {formatDistance(masjid.distance)}
            </Badge>
          </div>
        )}

        {/* Area tag */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="text-xs bg-background/90 text-foreground border border-border backdrop-blur-sm">
            {masjid.area}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-1 pt-5 pb-3">
        {/* Name */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-muted-foreground transition-colors">
            {masjid.name}
          </h3>
          {masjid.nameAr && (
            <p className="font-arabic text-base text-muted-foreground mt-0.5 text-right leading-relaxed">
              {masjid.nameAr}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
            <span className="leading-snug">{masjid.address}</span>
          </div>

          {masjid.imam && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-500" />
              <span>{masjid.imam}</span>
            </div>
          )}

          {masjid.established && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-500" />
              <span>Est. {masjid.established}</span>
            </div>
          )}

          {masjid.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-500" />
              <a href={`tel:${masjid.phone}`} className="hover:text-foreground transition-colors">
                {masjid.phone}
              </a>
            </div>
          )}
        </div>

        {/* Facilities */}
        {masjid.facilities && masjid.facilities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {masjid.facilities.slice(0, 3).map((f) => (
              <Badge key={f} variant="outline" className="text-xs font-normal">
                {f}
              </Badge>
            ))}
            {masjid.facilities.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                +{masjid.facilities.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/50">
        <Button asChild variant="ghost" size="sm" className="w-full font-medium">
          <Link to={`/masjid/${masjid.id}`}>
            View Details →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
