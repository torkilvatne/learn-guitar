import { useState } from 'react'
import { PracticeMenu } from '../components/PracticeMenu'
import { ProgressionToggle } from '../components/ProgressionToggle'
import { ScaleName } from '../components/ScaleName'
import { ScaleSwitcher } from '../components/ScaleSwitcher'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { getDiatonicModeInfo } from '../domain/modes'
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

export function ScaleView({
  scale,
  mode,
  rootSemitone,
  highlightedChordId,
  onBack,
  onSelectScale,
}: ScaleViewProps) {
  const [selectedTab, setSelectedTab] = useState<ScaleViewTab>('intervals')
  const [rootDegree, setRootDegree] = useState(1)
  const [centerScale, setCenterScale] = useState(false)
  const currentDegree = getDiatonicModeInfo(scale)?.degree
  const isDiatonicMode = currentDegree !== undefined
  const isCurrentScaleRoot = currentDegree !== undefined && currentDegree === rootDegree
  const activeTab: ScaleViewTab = isDiatonicMode ? selectedTab : 'intervals'

  const practiceItems = [
    { label: 'Write the scale', to: `/practice/write-scale/${scale.id}` },
    ...(isDiatonicMode
      ? [{ label: "Guess the mode's position", to: '/practice/guess-mode-position' }]
      : []),
  ]

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm font-medium text-text-muted hover:text-text"
        >
          ← Back to scales
        </button>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <ScaleName scale={scale} />
          {onSelectScale && <ScaleSwitcher scale={scale} onSelect={onSelectScale} />}
        </div>
        <PracticeMenu items={practiceItems} />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setSelectedTab(value as ScaleViewTab)}
        className="mt-4"
      >
        {isDiatonicMode && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="intervals">Intervals</TabsTrigger>
              <TabsTrigger value="modes">Modes</TabsTrigger>
            </TabsList>
            {activeTab === 'modes' && (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
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
        )}
        <TabsContent value="intervals">
          <div className="mx-auto w-full max-w-4xl">
            <IntervalsPane
              scale={scale}
              mode={mode}
              rootSemitone={rootSemitone}
              highlightedChordId={highlightedChordId}
            />
          </div>
        </TabsContent>
        {isDiatonicMode && (
          <TabsContent value="modes">
            <ModesPane
              scale={scale}
              mode={mode}
              rootSemitone={rootSemitone}
              highlightedChordId={highlightedChordId}
              rootDegree={rootDegree}
              centerScale={centerScale}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
