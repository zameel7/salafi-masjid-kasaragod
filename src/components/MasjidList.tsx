import { MasjidCard } from '@/components/MasjidCard'
import type { MasjidWithDistance } from '@/types/masjid'
import { Building2 } from 'lucide-react'

interface MasjidListProps {
  masjids: MasjidWithDistance[]
  emptyMessage?: string
}

export function MasjidList({ masjids, emptyMessage = 'No masjids found.' }: MasjidListProps) {
  if (masjids.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Building2 className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <div>
          <p className="text-base font-medium text-foreground">{emptyMessage}</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {masjids.map((masjid) => (
        <MasjidCard key={masjid.id} masjid={masjid} />
      ))}
    </div>
  )
}
