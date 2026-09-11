import type { Chord, ChordFamily } from './chords'
import { groupByAdjacent } from './groupByAdjacent'

export const CHORD_FAMILY_LABELS: Record<ChordFamily, string> = {
  triad: 'Triads',
  six: 'Sixth Chords',
  seven: 'Seventh Chords',
  nine: 'Ninth Chords',
  eleven: 'Eleventh Chords',
  thirteen: 'Thirteenth Chords',
}

export interface ChordFamilySection {
  family: ChordFamily
  chords: Chord[]
}

export function groupChords(chords: Chord[]): ChordFamilySection[] {
  return groupByAdjacent(chords, (chord) => chord.family).map(({ group, items }) => ({
    family: group,
    chords: items,
  }))
}
