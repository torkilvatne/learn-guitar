import { useMemo, useState } from 'react'
import { ScaleRow } from '../../components/ScaleRow'
import { CHORDS, getChordsFittingScale, type Chord } from '../../domain/chords'
import { pickDistinctRandom, pickRandom, pickRandomExcluding, shuffle } from '../../domain/random'
import { SCALES } from '../../domain/scales'
import type { Scale } from '../../domain/types'
import { useSettings } from '../../state/settings'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'

const OPTION_COUNT = 4
const SCALES_WITH_CHORDS = SCALES.filter((scale) => getChordsFittingScale(scale).length > 0)

interface ChordGuessRound {
  scale: Scale
  chord: Chord
}

function pickRound(previousScale?: Scale): ChordGuessRound {
  const scale = previousScale
    ? pickRandomExcluding(SCALES_WITH_CHORDS, previousScale)
    : pickRandom(SCALES_WITH_CHORDS)
  const chord = pickRandom(getChordsFittingScale(scale))
  return { scale, chord }
}

export function GuessChordSession() {
  const { mode, rootSemitone } = useSettings()
  const [round, setRound] = useState<ChordGuessRound>(() => pickRound())
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      CHORDS.filter((candidate) => candidate.id !== round.chord.id),
      OPTION_COUNT - 1,
    )
    return shuffle([round.chord, ...wrong])
  }, [round])

  function handleSelect(option: Chord) {
    if (option.id === round.chord.id) {
      setSolved(true)
      setScore((previous) => ({
        correct: previous.correct + (wrongAttempts.size === 0 ? 1 : 0),
        total: previous.total + 1,
      }))
    } else {
      setWrongAttempts((previous) => new Set(previous).add(option.id))
    }
  }

  function handleNext() {
    setWrongAttempts(new Set())
    setSolved(false)
    setRound((previous) => pickRound(previous.scale))
  }

  return (
    <PracticeSessionShell
      title="Guess the chord"
      description="A chord's notes will be highlighted on a scale. Pick the chord's name from the choices below."
      score={score}
    >
      <div className="w-full">
        <ScaleRow
          scale={round.scale}
          mode={mode}
          rootSemitone={rootSemitone}
          highlightedChordId={round.chord.id}
        />
      </div>
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => option.id}
        getLabel={(option) => `${option.name} (${option.shorthand})`}
        correctOption={round.chord}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
    </PracticeSessionShell>
  )
}
