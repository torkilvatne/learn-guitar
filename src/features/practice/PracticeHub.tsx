import { Link } from 'react-router-dom'

interface Game {
  to: string
  title: string
  body: string
  meta: string
}

interface Family {
  title: string
  blurb: string
  games: Game[]
}

const FAMILIES: Family[] = [
  {
    title: 'Name it',
    blurb: 'four choices, one right',
    games: [
      {
        to: '/practice/guess-scale',
        title: 'Guess which scale',
        body: 'A shape on the grid — name the scale.',
        meta: '4 choices · pick your pool',
      },
      {
        to: '/practice/guess-interval',
        title: 'Guess the interval',
        body: 'An arrow between two notes — name the distance.',
        meta: '4 choices',
      },
      {
        to: '/practice/guess-chord',
        title: 'Guess the chord',
        body: 'A chord inside a scale — name it.',
        meta: '4 choices',
      },
    ],
  },
  {
    title: 'Write it',
    blurb: 'build the answer, click or type',
    games: [
      {
        to: '/practice/write-scales',
        title: 'Write the scale',
        body: 'Given a name, lay out its degrees.',
        meta: 'Keyboard · Shift for sharps',
      },
      {
        to: '/practice/write-chords',
        title: 'Write the chords',
        body: 'Given a chord and a root, spell its notes.',
        meta: 'Keyboard · Shift for sharps',
      },
      {
        to: '/practice/complete-chord',
        title: 'Complete the chord',
        body: 'The root is placed — fill the empty slots.',
        meta: 'Immediate feedback',
      },
    ],
  },
  {
    title: 'Place it',
    blurb: 'notes and positions in context',
    games: [
      {
        to: '/practice/guess-note',
        title: 'Guess the note',
        body: 'Follow the arrow and name where it lands.',
        meta: 'Fixed root or endless',
      },
      {
        to: '/practice/guess-mode-position',
        title: "Guess the mode's position",
        body: 'Pick the roman numeral in the key.',
        meta: 'Major or minor',
      },
      {
        to: '/fretboard',
        title: 'Scale on the neck',
        body: 'The same shapes, round notes, six strings.',
        meta: 'Opens the fretboard',
      },
    ],
  },
]

export function PracticeHub() {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-7 overflow-y-auto px-6 py-9 sm:px-14">
      <div className="max-w-xl">
        <h2 className="mb-1">Practice</h2>
        <p className="text-[15px] text-text/72">
          Every drill opens the same way: choose what&rsquo;s in the pool, then start. Leave
          whenever — nothing is timed.
        </p>
      </div>

      {FAMILIES.map((family) => (
        <section key={family.title} className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl">{family.title}</span>
            <span className="text-[13px] text-text/60">{family.blurb}</span>
            <span className="h-px flex-1 bg-divider" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {family.games.map((game) => (
              <Link
                key={game.title}
                to={game.to}
                className="flex min-h-[132px] flex-col gap-2 rounded-xl bg-surface p-5 transition-shadow hover:shadow-elev-md"
              >
                <span className="font-semibold">{game.title}</span>
                <p className="text-[13px] text-text/75">{game.body}</p>
                <span className="mt-auto text-[11px] uppercase tracking-[0.06em] text-text/55">
                  {game.meta}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
