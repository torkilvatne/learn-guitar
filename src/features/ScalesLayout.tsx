import { useMemo, useState } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { ModeToggle } from '../components/ModeToggle'
import { findScalesContainingSemitones } from '../domain/search'
import { SCALES } from '../domain/scales'
import { useSettings } from '../state/settings'
import { ScaleList } from './ScaleList'
import { ScaleSearchPanel } from './ScaleSearchPanel'

export function ScalesLayout() {
  const navigate = useNavigate()
  const match = useMatch('/scales/:id')
  const { mode, setMode } = useSettings()
  const [searchSemitones, setSearchSemitones] = useState<number[]>([])
  const [searchOpen, setSearchOpen] = useState(false)

  const scales = useMemo(
    () =>
      searchSemitones.length > 0 ? findScalesContainingSemitones(searchSemitones) : SCALES,
    [searchSemitones],
  )

  return (
    <div className="relative flex h-full flex-col">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end gap-4 px-6 pt-8 sm:px-14">
        <div>
          <h2 className="mb-0.5">Scales</h2>
          <p className="text-sm text-text/70">
            {scales.length} scale{scales.length === 1 ? '' : 's'} · scroll to bring one
            into focus
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <ModeToggle mode={mode} onChange={setMode} />
          <ScaleSearchPanel
            selected={searchSemitones}
            onSelectedChange={setSearchSemitones}
            open={searchOpen}
            onOpenChange={setSearchOpen}
          />
        </div>
      </div>

      <div className="mx-auto min-h-0 w-full max-w-[1600px] flex-1">
        <ScaleList
          scales={scales}
          activeScaleId={match?.params.id}
          onOpenScale={(scale) => navigate(`/scales/${scale.id}`)}
        />
      </div>
      <Outlet />
    </div>
  )
}
