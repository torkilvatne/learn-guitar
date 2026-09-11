export const GROUP_MARKER_HEIGHT_PX = 48

export interface ScaleGroupMarkerProps {
  label: string
}

export function ScaleGroupMarker({ label }: ScaleGroupMarkerProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-6 sm:px-14"
      style={{ height: GROUP_MARKER_HEIGHT_PX }}
    >
      <span className="rounded-full bg-accent-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-accent-800">
        {label}
      </span>
      <span className="h-px flex-1 bg-divider" />
    </div>
  )
}
