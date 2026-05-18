import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchFilterProps {
  query: string
  onQueryChange: (q: string) => void
  selectedArea: string | null
  onAreaChange: (area: string | null) => void
  areas: string[]
}

export function SearchFilter({
  query,
  onQueryChange,
  selectedArea,
  onAreaChange,
  areas,
}: SearchFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search by name, area..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10 pr-10 h-11 text-base"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAreaChange(null)}
          className={cn(
            'rounded-full border transition-all duration-150 text-sm font-medium h-8 px-4 shrink-0',
            selectedArea === null
              ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-800 hover:border-blue-800 hover:text-white'
              : 'border-border hover:border-blue-900 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300',
          )}
        >
          All Areas
        </Button>
        {areas.map((area) => (
          <Button
            key={area}
            variant="ghost"
            size="sm"
            onClick={() => onAreaChange(selectedArea === area ? null : area)}
            className={cn(
              'rounded-full border transition-all duration-150 text-sm font-medium h-8 px-4 shrink-0',
              selectedArea === area
                ? 'bg-blue-900 text-white border-blue-900 hover:bg-blue-800 hover:border-blue-800 hover:text-white'
                : 'border-border hover:border-blue-900 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300',
            )}
          >
            {area}
          </Button>
        ))}
      </div>
    </div>
  )
}
