import { useState } from 'react'
import { ArrowLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ProgressionToggle } from '../components/ProgressionToggle'
import { ScaleSwitcher } from '../components/ScaleSwitcher'
import { SegmentedControl } from '../components/SegmentedControl'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { getDiatonicModeInfo } from '../domain/modes'
import { getScaleQuality } from '../domain/quality'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'
import { IntervalsPane } from './IntervalsPane'
import { ModesPane } from './ModesPane'

type ScaleViewTab = 'intervals' | 'modes'

export interface ScaleViewProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  highlightedChordId?: string | null
  onBack?: () => void
  onSelectScale?: (scale: Scale) => void
}

/**
 * Changes from the old ScaleView:
 *   - The unlabelled PracticeMenu icon button becomes an explicit primary
 *     "Practice this scale" — this is the single entry point into a drill for this
 *     scale, replacing one of the three competing paths.
 *   - shadcn Tabs is replaced by the shared SegmentedControl, so Intervals/Modes looks
 *     identical to Numbers/Notes and Sharps/Flats.
 *   - A real header: h1, family tag, and a quality sub-line.
 */
export function ScaleView({
  scale,
  mode,
  rootSemitone,
  highlightedChordId,
  onBack,
  onSelectScale,
}: ScaleViewProps) {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState<ScaleViewTab>('intervals')
  const [rootDegree, setRootDegree] = useState(1)
  const [centerScale, setCenterScale] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)

  const modeInfo = getDiatonicModeInfo(scale)
  const currentDegree = modeInfo?.degree
  const isDiatonicMode = currentDegree !== undefined
  const isCurrentScaleRoot = currentDegree !== undefined && currentDegree === rootDegree
  const activeTab: ScaleViewTab = isDiatonicMode ? selectedTab : 'intervals'
  const quality = getScaleQuality(scale)

  return (
    <div className="h-full overflow-y-auto px-6 py-6 sm:px-14 sm:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        {onBack && (
          <Button variant="ghost" size="sm" className="self-start pl-0" onClick={onBack}>
            <ArrowLeft strokeWidth={2.75} />
            All scales
          </Button>
        )}

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1>{scale.name}</h1>
              {isDiatonicMode && (
                <span className="rounded-full bg-accent-2-100 px-3 py-1 text-xs font-medium text-accent-2-800">
                  Major diatonic mode
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-text/70">
              {modeInfo ? `Degree ${modeInfo.degree} of the major scale` : 'Scale'}
              {quality ? ` · ${quality.replace('-', ' ')} quality` : ''}
              {scale.altNames && scale.altNames.length > 0
                ? ` · also ${scale.altNames.join(', ')}`
                : ''}
            </p>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2.5">
            {onSelectScale && (
              <ScaleSwitcher
                scale={scale}
                onSelect={onSelectScale}
                open={switcherOpen}
                onOpenChange={setSwitcherOpen}
                trigger={
                  <Button variant="outline">
                    Change scale
                    <ChevronsUpDown strokeWidth={2.75} />
                  </Button>
                }
              />
            )}
            <Button onClick={() => navigate(`/practice/write-scale/${scale.id}`)}>
              Practice this scale
              <ChevronRight strokeWidth={2.75} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          {isDiatonicMode && (
            <SegmentedControl
              options={[
                { value: 'intervals' as ScaleViewTab, label: 'Intervals' },
                { value: 'modes' as ScaleViewTab, label: 'Modes' },
              ]}
              value={activeTab}
              onChange={setSelectedTab}
              ariaLabel="Intervals or modes"
            />
          )}

          {activeTab === 'modes' && (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={isCurrentScaleRoot}
                onClick={() => currentDegree !== undefined && setRootDegree(currentDegree)}
              >
                {isCurrentScaleRoot ? 'Root mode' : 'Set as root mode'}
              </Button>
              <ProgressionToggle rootDegree={rootDegree} onChange={setRootDegree} />
              <div className="flex items-center gap-2">
                <Switch
                  id="center-scale"
                  checked={centerScale}
                  onCheckedChange={setCenterScale}
                />
                <Label htmlFor="center-scale">Center scale</Label>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'intervals' ? (
          <IntervalsPane
            scale={scale}
            mode={mode}
            rootSemitone={rootSemitone}
            highlightedChordId={highlightedChordId}
          />
        ) : (
          <ModesPane
            scale={scale}
            mode={mode}
            rootSemitone={rootSemitone}
            highlightedChordId={highlightedChordId}
            rootDegree={rootDegree}
            centerScale={centerScale}
          />
        )}
      </div>
    </div>
  )
}
