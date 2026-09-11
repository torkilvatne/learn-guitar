import { useEffect, useRef, useState } from 'react'
import { getScaleIntervalArcs, type IntervalArcDirection } from '../domain/intervals'
import type { Scale } from '../domain/types'

const DEFAULT_COLUMN_COUNT = 13
const RANK_HEIGHT_PX = 20
const ARROW_LENGTH_PX = 8
const ARROW_WIDTH_PX = 9
const LABEL_FONT_SIZE_PX = 13
const LABEL_CHAR_WIDTH_PX = 8
const LABEL_PADDING_PX = 4
const EXTRA_MARGIN_PX = 6

const COMPACT_WIDTH_THRESHOLD_PX = 640
const COMPACT_LABEL_FONT_SIZE_PX = 9
const COMPACT_LABEL_CHAR_WIDTH_PX = 5.5
const COMPACT_LABEL_PADDING_PX = 2

export interface IntervalArcsProps {
  scale: Scale
  direction: IntervalArcDirection
  columnCount?: number
  visible?: boolean
  showLabels?: boolean
}

function columnCenterX(semitone: number, width: number, columnCount: number): number {
  return ((semitone + 0.5) / columnCount) * width
}

export function IntervalArcs({
  scale,
  direction,
  columnCount = DEFAULT_COLUMN_COUNT,
  visible = true,
  showLabels = true,
}: IntervalArcsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(() => {
      setWidth(container.offsetWidth)
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const isCompact = width > 0 && width < COMPACT_WIDTH_THRESHOLD_PX
  const labelFontSize = isCompact ? COMPACT_LABEL_FONT_SIZE_PX : LABEL_FONT_SIZE_PX
  const labelCharWidth = isCompact ? COMPACT_LABEL_CHAR_WIDTH_PX : LABEL_CHAR_WIDTH_PX
  const labelPadding = isCompact ? COMPACT_LABEL_PADDING_PX : LABEL_PADDING_PX

  const arcs = getScaleIntervalArcs(scale, direction)
  const rankBySpan = new Map(
    [...arcs]
      .map((arc) => arc.span)
      .sort((a, b) => a - b)
      .map((span, index) => [span, index + 1]),
  )
  const height = arcs.length * RANK_HEIGHT_PX + ARROW_LENGTH_PX + EXTRA_MARGIN_PX

  const anchorSemitone = direction === 'direct' ? 0 : 12
  const vdir = direction === 'direct' ? 1 : -1
  const nearY = direction === 'direct' ? 0 : height
  const anchorX = width > 0 ? columnCenterX(anchorSemitone, width, columnCount) : 0

  return (
    <div ref={containerRef} className="relative" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={`text-text transition-opacity duration-200 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {arcs.map((arc) => {
            const targetX = columnCenterX(arc.semitone, width, columnCount)
            const rank = rankBySpan.get(arc.span) ?? 1
            const peakY = nearY + vdir * rank * RANK_HEIGHT_PX
            const lineEnd = { x: targetX, y: nearY + vdir * ARROW_LENGTH_PX }

            const path = [
              `M ${anchorX} ${nearY}`,
              `L ${anchorX} ${peakY}`,
              `L ${targetX} ${peakY}`,
              `L ${lineEnd.x} ${lineEnd.y}`,
            ].join(' ')

            const arrowPoints = [
              `${targetX},${nearY}`,
              `${targetX - ARROW_WIDTH_PX / 2},${lineEnd.y}`,
              `${targetX + ARROW_WIDTH_PX / 2},${lineEnd.y}`,
            ].join(' ')

            const labelWidth = arc.label.length * labelCharWidth + labelPadding * 2
            const labelX = (anchorX + targetX) / 2

            return (
              <g key={arc.semitone}>
                <path d={path} stroke="currentColor" strokeWidth={1.5} fill="none" />
                <polygon points={arrowPoints} fill="currentColor" />
                {showLabels && (
                  <>
                    <rect
                      x={labelX - labelWidth / 2}
                      y={peakY - labelFontSize / 2 - 2}
                      width={labelWidth}
                      height={labelFontSize + 4}
                      style={{ fill: 'var(--bg)' }}
                    />
                    <text
                      x={labelX}
                      y={peakY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={labelFontSize}
                      fontWeight="bold"
                      fill="currentColor"
                    >
                      {arc.label}
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}
