import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { GROUP_MARKER_HEIGHT_PX, ScaleGroupMarker } from '../components/ScaleGroupMarker'
import { ITEM_HEIGHT_PX, ScaleListItem } from '../components/ScaleListItem'
import { groupScales, SCALE_GROUP_LABELS } from '../domain/grouping'
import { SCALES } from '../domain/scales'
import type { Scale } from '../domain/types'
import { useSettings } from '../state/settings'

const SCROLL_END_DELAY_MS = 150
const CENTER_OFFSET_PX = ITEM_HEIGHT_PX

function getFocusPoint(container: HTMLDivElement): number {
  return container.scrollTop + container.clientHeight / 2 - CENTER_OFFSET_PX
}

export interface ScaleListProps {
  scales?: Scale[]
  activeScaleId?: string
  onSelectScale?: (scale: Scale) => void
  onOpenScale?: (scale: Scale) => void
  topOverlay?: ReactNode
}

export function ScaleList({
  scales = SCALES,
  activeScaleId,
  onSelectScale,
  onOpenScale,
  topOverlay,
}: ScaleListProps) {
  const { mode, rootSemitone, highlightedChordId } = useSettings()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const scrollEndTimeoutRef = useRef<number | null>(null)
  const lastNotifiedIndexRef = useRef(0)
  const hasSyncedActiveScaleRef = useRef(false)

  const [focusValues, setFocusValues] = useState<number[]>(() =>
    scales.map((_, index) => index),
  )
  const [containerHeight, setContainerHeight] = useState(0)

  const recomputeFocus = useCallback(() => {
    const container = containerRef.current
    if (!container || container.clientHeight === 0) {
      return
    }
    const focusPoint = getFocusPoint(container)
    setFocusValues(
      itemRefs.current.map((item) => {
        if (!item) {
          return 0
        }
        const itemCenter = item.offsetTop + item.offsetHeight / 2
        return (itemCenter - focusPoint) / ITEM_HEIGHT_PX
      }),
    )
  }, [])

  const notifyNearestScale = useCallback(() => {
    const container = containerRef.current
    if (!container || container.clientHeight === 0 || scales.length === 0) {
      return
    }
    const focusPoint = getFocusPoint(container)
    let nearestIndex = 0
    let nearestDistance = Infinity
    itemRefs.current.forEach((item, index) => {
      if (!item) {
        return
      }
      const itemCenter = item.offsetTop + item.offsetHeight / 2
      const distance = Math.abs(itemCenter - focusPoint)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })
    if (nearestIndex !== lastNotifiedIndexRef.current) {
      lastNotifiedIndexRef.current = nearestIndex
      onSelectScale?.(scales[nearestIndex])
    }
  }, [onSelectScale, scales])

  const handleScroll = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        recomputeFocus()
      })
    }
    if (scrollEndTimeoutRef.current !== null) {
      window.clearTimeout(scrollEndTimeoutRef.current)
    }
    scrollEndTimeoutRef.current = window.setTimeout(() => {
      scrollEndTimeoutRef.current = null
      notifyNearestScale()
    }, SCROLL_END_DELAY_MS)
  }, [recomputeFocus, notifyNearestScale])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }
    itemRefs.current.length = scales.length
    lastNotifiedIndexRef.current = 0
    hasSyncedActiveScaleRef.current = false
    container.scrollTop = 0
    setFocusValues(scales.map((_, index) => index))
    setContainerHeight(container.offsetHeight)
    const observer = new ResizeObserver(() => {
      setContainerHeight(container.offsetHeight)
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [scales])

  useLayoutEffect(() => {
    if (containerHeight === 0 || !activeScaleId) {
      return
    }
    const index = scales.findIndex((scale) => scale.id === activeScaleId)
    if (index === -1 || index === lastNotifiedIndexRef.current) {
      return
    }
    const container = containerRef.current
    const item = itemRefs.current[index]
    if (!container || !item) {
      return
    }
    const isInitialSync = !hasSyncedActiveScaleRef.current
    hasSyncedActiveScaleRef.current = true
    lastNotifiedIndexRef.current = index
    const targetScrollTop =
      item.offsetTop +
      item.offsetHeight / 2 -
      container.clientHeight / 2 +
      CENTER_OFFSET_PX
    if (isInitialSync) {
      container.scrollTop = targetScrollTop
    } else {
      container.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    }
  }, [activeScaleId, containerHeight, scales])

  useLayoutEffect(() => {
    recomputeFocus()
  }, [recomputeFocus, containerHeight])

  useEffect(
    () => () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current)
      }
    },
    [],
  )

  function handleSelect(scale: Scale, index: number) {
    const container = containerRef.current
    const item = itemRefs.current[index]
    lastNotifiedIndexRef.current = index
    if (container && item) {
      const itemCenter = item.offsetTop + item.offsetHeight / 2
      const targetScrollTop = itemCenter - container.clientHeight / 2 + CENTER_OFFSET_PX
      container.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    }
    onSelectScale?.(scale)
    onOpenScale?.(scale)
  }

  const basePadding = Math.max((containerHeight - ITEM_HEIGHT_PX) / 2, 0)
  const paddingTop = Math.max(basePadding - CENTER_OFFSET_PX - GROUP_MARKER_HEIGHT_PX, 0)
  const paddingBottom = basePadding + CENTER_OFFSET_PX

  const groupLabelAtIndex = useMemo(() => {
    const labels = new Map<number, string>()
    let index = 0
    for (const section of groupScales(scales)) {
      labels.set(index, SCALE_GROUP_LABELS[section.group])
      index += section.scales.length
    }
    return labels
  }, [scales])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="scale-list-scroll relative h-full snap-y snap-mandatory overflow-y-auto"
      style={{ paddingTop, paddingBottom, overflowAnchor: 'none' }}
    >
      {topOverlay && <div className="absolute inset-x-0 top-0">{topOverlay}</div>}
      {scales.map((scale, index) => {
        const groupLabel = groupLabelAtIndex.get(index)
        return (
          <Fragment key={scale.id}>
            {groupLabel !== undefined && <ScaleGroupMarker label={groupLabel} />}
            <ScaleListItem
              itemRef={(element) => {
                itemRefs.current[index] = element
              }}
              scale={scale}
              mode={mode}
              rootSemitone={rootSemitone}
              highlightedChordId={highlightedChordId}
              focus={focusValues[index] ?? index}
              onSelect={(selected) => handleSelect(selected, index)}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
