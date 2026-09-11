export interface SessionProgressProps {
  results: boolean[]
  total: number
}

export function SessionProgress({ results, total }: SessionProgressProps) {
  const clean = results.filter(Boolean).length

  return (
    <div className="flex items-center gap-3.5">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => {
          const result = results[index]
          const color =
            result === undefined
              ? 'bg-neutral-300'
              : result
                ? 'bg-accent'
                : 'bg-accent-300'
          return <span key={index} className={`size-2 rounded-full ${color}`} />
        })}
      </div>
      <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-text/75">
        {clean} of {results.length || total} clean
      </span>
    </div>
  )
}
