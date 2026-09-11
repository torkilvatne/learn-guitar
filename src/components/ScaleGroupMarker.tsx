export const GROUP_MARKER_HEIGHT_PX = 40

export interface ScaleGroupMarkerProps {
  label: string
}

export function ScaleGroupMarker({ label }: ScaleGroupMarkerProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-8 text-xs font-semibold uppercase tracking-wide text-text-muted"
      style={{ height: GROUP_MARKER_HEIGHT_PX }}
    >
      <span className="h-px flex-1 bg-border" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
