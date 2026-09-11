# The shared control grammar

Every control in the app should come from this short list. The old UI drew each
toolbar slightly differently; that inconsistency is most of what read as "unplanned".

## Button
- Shape: `rounded-full`, min-height 44px (mobile hit target), px-5 py-2.5, text-sm font-semibold.
- Primary:   `bg-accent text-accent-foreground hover:bg-accent-600 active:bg-accent-700`
- Secondary: `border border-border bg-transparent hover:bg-surface-alt active:bg-neutral-300`
- Ghost:     `text-accent-700 hover:bg-accent-100`
- Icon:      square 44×44, `rounded-full`, same tones. Lucide at strokeWidth 2.75.
- Disabled:  `opacity-45 pointer-events-none`.

## Segmented control (Numbers/Notes, Sharps/Flats, Intervals/Modes)
Radio inputs inside a `rounded-full bg-surface-alt p-1` track; the selected option is
`rounded-full bg-bg shadow-elev-sm`. One component, used in all three places — today
these are three different-looking controls.

## Tag
`rounded-full px-3 py-1 text-xs`. Accent = `bg-accent-100 text-accent-800`,
sage = `bg-accent-2-100 text-accent-2-800`, neutral = `bg-neutral-200 text-text/75`.

## Card / panel
`rounded-xl bg-surface p-5` with `shadow-elev-sm`; large panels `rounded-2xl p-8`.
No 1px borders where a surface fill will do — the old UI outlined nearly everything,
which is a large part of the contrast problem.

## Feedback
Correct: `bg-accent-2-100 text-accent-2-800` with a circle-check, and a one-line
explanation ("Major 6th — nine semitones."), not just "Correct!".
Wrong: the chosen option goes `bg-destructive-fill text-destructive-foreground`,
line-through, and locks. It stays on screen — that's the teaching moment.

## Session progress
Ten 8px dots, `gap-1.5`. Clean = `bg-accent`, missed = `bg-accent-300`,
remaining = `bg-neutral-300`. Plus a "8 of 10 clean" neutral tag. No XP, no streaks,
no scores — the brief asked for subtle feedback, not a game show.
