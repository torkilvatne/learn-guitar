import { useMemo, useState } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { findScalesContainingSemitones } from '../domain/search'
import { SCALES } from '../domain/scales'
import { ScaleList } from './ScaleList'
import { ScaleSearchPanel } from './ScaleSearchPanel'

export function ScalesLayout() {
  const navigate = useNavigate()
  const match = useMatch('/scales/:id')
  const [searchSemitones, setSearchSemitones] = useState<number[]>([])

  const scales = useMemo(
    () =>
      searchSemitones.length > 0
        ? findScalesContainingSemitones(searchSemitones)
        : SCALES,
    [searchSemitones],
  )

  return (
    <div className="relative h-full">
      <div className="mx-auto h-full w-full max-w-[1600px]">
        <ScaleList
          scales={scales}
          activeScaleId={match?.params.id}
          onOpenScale={(scale) => navigate(`/scales/${scale.id}`)}
          topOverlay={
            <ScaleSearchPanel
              selected={searchSemitones}
              onSelectedChange={setSearchSemitones}
            />
          }
        />
      </div>
      <Outlet />
    </div>
  )
}
