# Handoff: Woodshed — Guitar Theory redesign

## Overview

A visual and navigational overhaul of the guitar theory app (`torkilvatne/learn-guitar`).
It replaces three high-contrast themes with one warm light theme and its dark
counterpart, resolves the square-vs-rounded conflict with a single radius scale,
gives every control one shared grammar, and replaces the sidebar-plus-redirect entry
with a task-first Home that routes by goal.

The app is renamed **Woodshed** — what guitarists call private practice. Today the tab
title says "Absolutely Understanding Guitar" and the sidebar says "Guitar Theory"; one
name settles it.

## About the design files

The `.dc.html` files in `designs/` are **design references created in HTML** —
prototypes showing the intended look and behaviour. They are not production code to
lift directly. The task is to recreate them inside this codebase's existing
environment: React 19 + TypeScript + Vite + Tailwind v4 + shadcn/ui + react-router,
following its established patterns.

`code/` is different: those files **are** written against this codebase's conventions
(Tailwind v4 `@theme` tokens, the existing `src/` layout, the existing domain imports)
and are intended to be dropped in and adjusted, not just read.

## Fidelity

**High-fidelity.** Final colours, typography, spacing, radii and interaction states.
Recreate the UI faithfully using the existing Tailwind setup.

## Why each change

| Problem in the brief | Fix |
| --- | --- |
| Themes too high-contrast, uncomfortable | Cream ground #f5ead8 with ink #201e1d (about 14:1 → still crisp but no pure black on pure white); surfaces carry fills instead of outlines |
| Three ad-hoc themes | Two: `light` and `dark`, one warm family. `coral` is retired and its warmth folded into `light` |
| `--radius: 0rem` everywhere, yet round note circles | A real radius scale: 10px note cells, 16–36px containers, 999px on every button |
| Doesn't look professional | One display face (Caprasimo) over one text face (Figtree); one accent; one second voice |
| No natural flow; three paths to the same games | `/` → `/home`. Home offers Understand / Recall / Locate. Sidebar demoted to a quiet top nav. Each game has exactly one entry point |
| Nine undifferentiated practice links | Three families of three: Name it / Write it / Place it |
| Two note primitives that never meet | Both kept, and the difference is stated: square = on paper (both spellings), round = on the neck (one spelling). Same warm/sage colour logic in both |
| `opacity-10` on out-of-scale notes | Raised to 0.28 — recedes without vanishing |

## Screens

### 1. Home  `/home` — new (`code/src/features/Home.tsx`)
- **Purpose:** answer "what am I here to do" before showing any content.
- **Layout:** max-width 1152px, px-14 py-11. An h1 plus sub-line, then a 3-column grid
  (`gap-5`, single column under 768px) of goal cards, then an optional resume strip.
- **Goal card:** `rounded-xl bg-surface p-6 shadow-elev-sm`, min-height 280px,
  `flex-col gap-3.5`. Kicker 11px bold uppercase tracking .1em in `--accent-700`;
  title Caprasimo 26px; body 14px at 78% ink; chips `rounded-full bg-neutral-200 px-3 py-1 text-xs`;
  primary button pinned to the bottom.
- **Copy:** Understand / Learn a scale / "Open the library" · Recall / Drill it /
  "Choose a drill" · Locate / Find it on the neck / "Open the fretboard". Exact body
  copy is in the component.
- **Resume strip:** `rounded-xl border border-divider px-6 py-4.5` — label, scale name
  in Caprasimo 18px, a sage tag, then secondary + primary buttons right-aligned.
  Render only when a last scale exists.

### 2. Scales list  `/scales` (`ScalesLayout`, `ScaleList`, `ScaleListItem`)
- **Keep** the focus-carousel behaviour — it's the most distinctive thing in the app.
- **Change** the falloff from opacity 1 / .72 / .44 / .16 to **1 / .62 / .34**, and cap it
  at three visible steps; the far rows currently fade to near-nothing and read as a bug.
- **Change** the focused row from a bare surface swap to `rounded-[24px] bg-surface shadow-elev-sm`,
  with the name at Caprasimo 28px (unfocused 22px) and a chevron at 70% opacity on the right.
- **Row layout:** `flex items-center gap-6 px-5.5 py-4`; a 210px name column, then a
  13-column grid of cells with `gap-5px`.
- **Group marker:** the bare uppercase divider becomes an accent tag
  (`bg-accent-100 text-accent-800`, 11px uppercase tracking .08em) followed by a hairline rule.
- **Toolbar:** h2 + count on the left; segmented Numbers/Notes and a "Filter by notes"
  secondary button on the right. The floating icon-only buttons over the list are removed —
  they were unlabelled and overlapped content.

### 3. Scale detail  `/scales/:id` (`ScaleView`, `IntervalsPane`, `ModesPane`, `IntervalArcs`)
- **Header:** a back button ("All scales", ghost, with an arrow-left), then h1 + a sage
  tag for the family, a sub-line, and two right-aligned buttons: "Change scale" (secondary,
  chevrons-up-down) and **"Practice this scale"** (primary). That primary is the single
  entry point that used to be an unlabelled target icon.
- **Controls row:** segmented Intervals/Modes, segmented Numbers/Notes, and an
  "Interval arrows" checkbox pushed right. All three share the segmented grammar.
- **Grid panel:** `rounded-[32px] bg-surface p-9 shadow-elev-sm`. Inverted arcs above,
  the 13-cell grid (`gap-6px`, cells `rounded-md`), direct arcs below.
- **Arcs (`IntervalArcs`):** stroke 1.5 at 55% opacity in `--accent-700`; the label plate
  becomes a **pill** — `rx=9`, height 18, fill `--accent-100`, text 11px bold
  `--accent-800`. Rank spacing 19px. Today the plate is a white rectangle that punches a
  hole in any coloured ground.
- **Cell captions:** each cell carries the note name underneath at 11px (75% ink when in
  the scale, 30% when not) — this is what lets Numbers and Notes modes stop fighting.

### 4. Practice hub  `/practice` (`code/src/features/practice/PracticeHub.tsx`)
- Three `<section>`s, each a Caprasimo 20px family title + a grey blurb + a hairline,
  then a 3-column card grid (`gap-4`).
- **Game card:** `rounded-xl bg-surface p-5`, min-height 132px, title 15px semibold,
  body 13px at 75%, and a meta line pinned to the bottom (11px uppercase, 55%) saying
  what the pool/controls are. Hover raises to `shadow-elev-md`.
- All nine existing routes are preserved. "Write the scale" now points at
  `/practice/write-scales` rather than telling the user to go find a button elsewhere.

### 5. Session shell  (`PracticeSessionShell`, all nine sessions)
- **Sheet:** centred, max-width 840px, `rounded-[36px] bg-bg p-9 shadow-elev-lg` on a
  `bg-neutral-200` backdrop. The old shell used a hard border plus a heavy drop shadow.
- **Header:** ghost "Leave" on the left; on the right, ten progress dots and an
  "8 of 10 clean" neutral tag. The monospace "4/6" counter is gone.
- **Prompt:** an 11px uppercase game name over an h3 question ("How far is the arrow?"),
  centred. Every session gets a real question sentence.
- **Options:** 2-column grid, `gap-3`, each `rounded-full border px-5 py-4.5 text-[17px]`.
  Correct → sage fill; wrong → `bg-destructive-fill`, line-through, disabled, still visible.
- **Feedback banner:** `rounded-[24px] bg-accent-2-100 text-accent-2-800 px-5.5 py-4`,
  circle-check icon, an explanatory sentence, and the Next button inline on the right
  with an "↵" hint. Currently feedback and Next are two stacked blocks.

### 6. Fretboard  `/fretboard` (`Fretboard`, `FretboardRow`, `NoteCircle`)
- Same toolbar grammar as everywhere else: h2 + sub-line left; segmented Sharps/Flats,
  a tuning select and a filter button right.
- Board sits in `rounded-[32px] bg-surface p-6`.
- Inlay markers become `rx=12` pills in `--neutral-200`. Nut stroke 7px `--neutral-800`.
- Note circles r=19, stroke 2: natural `fill #ffe1d0 / stroke #b2622d / text #643312`,
  accidental `fill #e1eecc / stroke #728157 / text #3d472b`.
- **Add the caption** under the board explaining the two note languages — it is the
  cheapest possible fix for the primitive split.

### 7. App shell  (`code/src/features/AppTopNav.tsx`)
- Desktop: a 56px top bar — brand mark + "Woodshed" left, four text links, then the
  Numbers/Notes toggle and the settings icon button.
- Mobile: the same four destinations as a bottom tab bar with Lucide icons at 52px
  minimum height.
- Active link is `--accent`; inactive is 70% ink and goes accent on hover.

## Interactions & behaviour

- **Navigation:** `/` → `/home`; unknown routes → `/home`. All nine practice routes
  unchanged. The scale detail "Practice this scale" button deep-links into a drill
  seeded with that scale.
- **Focus carousel:** unchanged logic; only the opacity falloff and the focused-row
  treatment change.
- **Answer feedback:** wrong answers lock and remain visible with a strikethrough;
  correct answers reveal a one-line explanation. Advance on click or Enter.
- **Transitions:** `transition-colors` at the Tailwind default (150ms) on buttons, links
  and cells; `transition-shadow` on cards. Nothing longer than 200ms — the point is calm.
- **Responsive:** goal cards, practice grids and toolbars collapse to one column under
  768px. The scale grid keeps 13 columns and scrolls horizontally on narrow screens
  rather than shrinking cells below a readable size.
- **Focus:** `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`
  globally — the default blue ring is never acceptable.

## State management

No new global state is required. Two optional additions:

- `lastScale` — `{ id, name, groupLabel }` persisted to localStorage on scale view, read
  by Home for the resume strip. Home renders without it.
- Session `results: boolean[]` — already implicit in the session components; surface it
  so the shell can draw the ten progress dots and the "N of M clean" tag.

The theme union narrows from `'light' | 'dark' | 'coral'` to `'light' | 'dark'`; migrate
persisted `'coral'` to `'light'` on read (see `code/src/state/theme.md`).

## Design tokens

Full drop-in file: `code/src/theme/tokens.css`. Summary of the light theme:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f5ead8` | page ground |
| `--surface` | `#ebddc5` | cards, focused row, panels |
| `--surface-alt` | `#f0e4ce` | inactive note cells, segmented track |
| `--text` | `#201e1d` | ink |
| `--text-muted` | `#6c6152` | secondary copy |
| `--divider` | `rgba(32,30,29,.10)` | hairlines |
| `--accent` | `#c67139` | the only emphasis; in-scale cells, primary buttons |
| `--accent-100 / -600 / -700 / -800` | `#fbe6d6` / `#b2622d` / `#8f4d22` / `#6b391a` | tint / hover / pressed & accent body text / text on tint |
| `--accent-2` | `#7a8a5e` | second voice: chord tones, correct |
| `--accent-2-100 / -200 / -600 / -800` | `#eef3e2` / `#e1eecc` / `#67774e` / `#3d472b` | banner fill / chip fill / border / text on tint |
| `--destructive-fill / -foreground` | `#f6ddd4` / `#7e2d1d` | locked wrong answer |
| `--natural / -fill / -text` | `#b2622d` / `#ffe1d0` / `#643312` | neck, natural notes |
| `--accidental / -fill / -text` | `#728157` / `#e1eecc` / `#3d472b` | neck, accidentals |

Dark theme ground is `#211d18`, surface `#2c2721`, ink `#f3e9db`, accent `#e08a4d`,
sage `#9cb07a` — same roles, same component code.

**Radius** (the old file pinned every step to `0rem`):
sm 8px · md 10px (note cells) · lg 16px · xl 24px · 2xl 32px · 3xl 36px · full 999px.

**Shadows:** `--shadow-sm` `0 1px 2px rgba(46,43,37,.06), 0 2px 8px rgba(46,43,37,.05)` ·
`--shadow-md` `0 4px 12px rgba(46,43,37,.10)` · `--shadow-lg` `0 12px 32px rgba(46,43,37,.16)`.

**Type:** Caprasimo (display, weight 400 only) for h1–h3 and scale names; Figtree
400/500/600/700 for everything else. h1 36px · h2 28px · h3 22px · body 15–16px ·
small 13px · meta 11px uppercase tracking .06–.10em. Nothing below 11px.

**Spacing:** the Tailwind default 4px scale. Page gutters 24px mobile / 56px desktop;
card padding 20–24px; panel padding 32–36px; grid gaps 16–20px.

## Assets

- **Icons:** Lucide (already a dependency, `lucide-react`) at `strokeWidth={2.75}`.
  Used: house, list-music, target, guitar, settings, search, chevrons-up-down,
  chevron-right, arrow-left, circle-check.
- **Fonts:** Caprasimo and Figtree. Imported from Google Fonts in the supplied
  `index.css`; switch to `@fontsource/caprasimo` + `@fontsource/figtree` if you prefer
  to self-host.
- **Brand mark:** a 28px inline SVG in `AppTopNav.tsx` — an accent disc with a nut-and-
  strings glyph. No image asset needed.

## Suggested order of work

1. **Tokens** — `tokens.css`, `index.css`, `themes.ts`, `state/theme.tsx`. The whole app
   reskins on this alone, and it's reversible in one commit.
2. **Primitives** — `Box`, `NoteCircle`, `SegmentedControl`, `ui/button`, and the two
   toggles that now wrap SegmentedControl. Every screen renders these.
3. **Shell** — `AppTopNav`, `App.tsx`, `Home`, `SettingsPopover`, `ThemeSelector`. Delete
   `AppSidebar` and `TopBar`.
4. **Practice** — `PracticeHub`, `PracticeSessionShell`, `SessionProgress`,
   `MultipleChoiceOptions`, `FeedbackBanner`.
5. **Scales** — `ScalesLayout`, `ScaleSearchPanel`, `ScaleListItem`, `ScaleGroupMarker`,
   `ScaleName`, `ScaleRow`, `ChromaticGrid`.
6. **Scale detail and fretboard** — `ScaleView`, `IntervalsPane`, `ModesPane`,
   `IntervalArcs`, `FretboardView`, `Fretboard`.
7. **Follow-up pass** — thread `question` / `results` / `explanation` through the nine
   session components.

Steps 1–2 get you most of the visual change before any routing moves.

## Files

**`MANIFEST.md`** — every file, what changed in it, what to delete, and the props you'll
need to add to the three components that stay. Read this next.

**Design references (open in a browser):**
- `designs/Woodshed Redesign.dc.html` — the redesign: foundations, home, scales, scale
  detail, practice hub, a drill in play, fretboard, mobile, dark theme, rationale.
- `designs/Current App.dc.html` — today's UI rebuilt from the repo, for before/after.

**Implementation:** 25 files under `code/src/`, mirroring the repo's own paths. Four of
them are new (`SegmentedControl.tsx`, `AppTopNav.tsx`, `Home.tsx`,
`SessionProgress.tsx`); the rest are replacements. See `MANIFEST.md`.

**Supporting notes:**
- `code/src/components/PrimitivesCheatSheet.md` — the button/segment/tag/card/feedback
  grammar, for any surface not covered by a supplied file.
- `code/src/state/theme.md` — background on the three-to-two theme trim.
