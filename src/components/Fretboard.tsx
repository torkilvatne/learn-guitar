import { DEFAULT_FRET_COUNT, FRET_MARKERS, STANDARD_TUNING } from '../domain/fretboard'
import { FretboardRow } from './FretboardRow'

const VIEWPORT_WIDTH = 1320
const PAD_X = 40
const PAD_TOP = 72
const PAD_BOTTOM = 72
const ROW_SPACING = 54
const NOTE_RADIUS = 19
const OPEN_X = 70
const NUT_X = 130
const NUT_STROKE_WIDTH = 7
const MARKER_PAD_X = 17
const MARKER_PAD_Y = 12
const MARKER_RADIUS = 12
const TOP_NUMBER_OFFSET = 38
const BOTTOM_NUMBER_OFFSET = 54

export interface FretboardProps {
  tuning?: number[]
  fretCount?: number
  rootSemitone?: number
  highlightedSemitones?: number[]
  preferFlats?: boolean
  visibleSemitones?: Set<number> | null
}

export function Fretboard({
  tuning = STANDARD_TUNING,
  fretCount = DEFAULT_FRET_COUNT,
  rootSemitone,
  highlightedSemitones = [],
  preferFlats = false,
  visibleSemitones = null,
}: FretboardProps) {
  const rows = tuning.length
  const height = PAD_TOP + (rows - 1) * ROW_SPACING + PAD_BOTTOM
  const gridRightX = VIEWPORT_WIDTH - PAD_X
  const segWidth = (gridRightX - NUT_X) / fretCount

  function wireX(fret: number) {
    return NUT_X + fret * segWidth
  }
  function fretCenterX(fret: number) {
    return NUT_X + (fret - 0.5) * segWidth
  }

  const rowY = Array.from({ length: rows }, (_, index) => PAD_TOP + index * ROW_SPACING)
  const topY = PAD_TOP - TOP_NUMBER_OFFSET
  const bottomY = rowY[rows - 1] + BOTTOM_NUMBER_OFFSET
  const markerFrets = FRET_MARKERS.filter((fret) => fret <= fretCount)

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${height}`}
        className="block w-full"
        style={{ minWidth: 720 }}
        role="img"
        aria-label="Guitar fretboard diagram"
      >
        {markerFrets.map((fret) => {
          const fx = fretCenterX(fret)
          return (
            <g key={fret}>
              <rect
                x={fx - MARKER_PAD_X}
                y={topY - MARKER_PAD_Y}
                width={MARKER_PAD_X * 2}
                height={MARKER_PAD_Y * 2}
                rx={MARKER_RADIUS}
                className="fill-neutral-200"
              />
              <rect
                x={fx - MARKER_PAD_X}
                y={bottomY - MARKER_PAD_Y}
                width={MARKER_PAD_X * 2}
                height={MARKER_PAD_Y * 2}
                rx={MARKER_RADIUS}
                className="fill-neutral-200"
              />
            </g>
          )
        })}

        {rowY.map((y) => (
          <line
            key={y}
            x1={OPEN_X}
            y1={y}
            x2={gridRightX}
            y2={y}
            className="stroke-neutral-400"
            strokeWidth={1.5}
          />
        ))}

        {Array.from({ length: fretCount }, (_, index) => {
          const fret = index + 1
          const x = wireX(fret)
          return (
            <line
              key={fret}
              x1={x}
              y1={rowY[0]}
              x2={x}
              y2={rowY[rows - 1]}
              className="stroke-neutral-300"
              strokeWidth={1.5}
            />
          )
        })}

        <line
          x1={NUT_X}
          y1={rowY[0]}
          x2={NUT_X}
          y2={rowY[rows - 1]}
          className="stroke-neutral-800"
          strokeWidth={NUT_STROKE_WIDTH}
          strokeLinecap="round"
        />

        {Array.from({ length: fretCount }, (_, index) => {
          const fret = index + 1
          const fx = fretCenterX(fret)
          return (
            <g key={fret}>
              <text
                x={fx}
                y={topY}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight={700}
                className="fill-neutral-600"
              >
                {fret}
              </text>
              <text
                x={fx}
                y={bottomY}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight={700}
                className="fill-neutral-600"
              >
                {fret}
              </text>
            </g>
          )
        })}

        {tuning.map((openSemitone, row) => (
          <FretboardRow
            key={row}
            openStringSemitone={openSemitone}
            y={rowY[row]}
            r={NOTE_RADIUS}
            openX={OPEN_X}
            fretCenterX={fretCenterX}
            fretCount={fretCount}
            rootSemitone={rootSemitone}
            highlightedSemitones={highlightedSemitones}
            preferFlats={preferFlats}
            visibleSemitones={visibleSemitones}
          />
        ))}
      </svg>
    </div>
  )
}
