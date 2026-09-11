import { Link } from 'react-router-dom'

interface Goal {
  kicker: string
  title: string
  body: string
  chips: string[]
  to: string
  cta: string
}

const GOALS: Goal[] = [
  {
    kicker: 'Understand',
    title: 'Learn a scale',
    body: 'Thirty-nine scales with their intervals, their spelling, and how the seven modes sit against each other.',
    chips: ['Intervals', 'Modes', 'Filter by notes'],
    to: '/scales',
    cta: 'Open the library',
  },
  {
    kicker: 'Recall',
    title: 'Drill it',
    body: 'Nine short games across naming, writing and placing. Wrong answers lock and stay visible; nothing is timed.',
    chips: ['Guess the interval', 'Complete the chord'],
    to: '/practice',
    cta: 'Choose a drill',
  },
  {
    kicker: 'Locate',
    title: 'Find it on the neck',
    body: 'Six strings, twelve frets, eight tunings. Filter down to the notes you are hunting for.',
    chips: ['Sharps / flats', 'Tunings'],
    to: '/fretboard',
    cta: 'Open the fretboard',
  },
]

export interface HomeProps {
  lastScale?: { id: string; name: string; groupLabel: string }
}

export function Home({ lastScale }: HomeProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-8 overflow-y-auto px-6 py-11 sm:px-14">
      <div className="max-w-xl">
        <h1 className="mb-1.5">What are you working on?</h1>
        <p className="text-base text-text/70">
          Three ways in. Everything else is one click deeper.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {GOALS.map((goal) => (
          <div
            key={goal.title}
            className="flex flex-col gap-3.5 rounded-xl bg-surface p-6 shadow-elev-sm md:min-h-[280px]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent-700">
              {goal.kicker}
            </span>
            <span className="font-heading text-[26px] leading-tight">{goal.title}</span>
            <p className="text-sm text-text/78">{goal.body}</p>
            <div className="flex flex-wrap gap-2">
              {goal.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-text/75"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Link
              to={goal.to}
              className="mt-1 min-h-[44px] self-start rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-600 active:bg-accent-700"
            >
              {goal.cta}
            </Link>
          </div>
        ))}
      </div>

      {lastScale && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-divider px-6 py-4.5">
          <span className="text-xs uppercase tracking-[0.08em] text-text/60">
            Where you left off
          </span>
          <span className="font-heading text-lg">{lastScale.name}</span>
          <span className="rounded-full bg-accent-2-100 px-3 py-1 text-xs text-accent-2-800">
            {lastScale.groupLabel}
          </span>
          <div className="ml-auto flex gap-2">
            <Link
              to={`/scales/${lastScale.id}`}
              className="min-h-[44px] rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-alt"
            >
              Open the scale
            </Link>
            <Link
              to="/practice/guess-interval"
              className="min-h-[44px] rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-600"
            >
              Practice it
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
