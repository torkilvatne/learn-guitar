import { Link } from 'react-router-dom'

interface PracticeFeatureEntry {
  to: string
  title: string
  description: string
}

const FEATURES: PracticeFeatureEntry[] = [
  {
    to: '/practice/guess-scale',
    title: 'Guess which scale',
    description: 'See a scale on the grid and pick its name from four choices.',
  },
  {
    to: '/scales',
    title: 'Write the scale',
    description: 'Pick a scale from the Scales list, then use its "Write the scale" button.',
  },
  {
    to: '/practice/write-scales',
    title: 'Write the scales',
    description: 'Pick a set of scales and write out their degrees, looping until you exit.',
  },
  {
    to: '/practice/write-chords',
    title: 'Write the chords',
    description: 'Pick a set of chords and write their notes from a random root, looping until you exit.',
  },
  {
    to: '/practice/complete-chord',
    title: 'Complete the chord',
    description:
      'Pick one chord and a set of root notes. Each round shows the root — pick the rest of the notes from a shuffled row.',
  },
  {
    to: '/practice/guess-interval',
    title: 'Guess the interval',
    description: 'See an arrow from the root to a note and name the interval.',
  },
  {
    to: '/practice/guess-note',
    title: 'Guess the note',
    description:
      'See an arrow from the root to another position and guess which note it points to. Play endlessly with a shifting root, or from a fixed root with the interval named.',
  },
  {
    to: '/practice/guess-chord',
    title: 'Guess the chord',
    description: 'See a chord highlighted on a scale and pick its name.',
  },
  {
    to: '/practice/guess-mode-position',
    title: "Guess the mode's position",
    description:
      'See a diatonic mode and pick its roman numeral in the major or minor key progression.',
  },
]

export function PracticeHub() {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-6 overflow-y-auto p-6">
      <Link
        to="/scales"
        className="text-sm font-medium text-text-muted hover:text-text"
      >
        ← Back to scales
      </Link>
      <h1 className="text-lg font-semibold text-text">Practice</h1>
      <div className="flex flex-col gap-3">
        {FEATURES.map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            className="flex flex-col gap-1 border border-border bg-surface p-4 transition-colors hover:bg-surface-alt"
          >
            <span className="font-medium text-text">{feature.title}</span>
            <span className="text-sm text-text-muted">{feature.description}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
