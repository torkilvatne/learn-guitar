# Design Brief — Guitar Theory App

This document describes the current state of the app in enough detail for a design tool (or a designer) to understand its purpose, structure, every screen and component, the existing visual system, and where that system is inconsistent or unfinished. It reflects the codebase as of this milestone, not aspirations.

## 1. What the app is

A single-page web app for learning and drilling music theory as it applies to the guitar fretboard. Internal package name: `absolutely-understanding-guitar`. Browser tab title: "Absolutely Understanding Guitar". Sidebar brand text: "Guitar Theory" — **these two names don't match**, worth resolving.

The app has three parts, all reachable from a persistent left sidebar:

1. **Scales** (`/scales`) — a reference library: browse ~39 scales, see each one's notes, intervals, and (for diatonic modes) its relationship to the other 6 modes of its parent major scale.
2. **Practice** (`/practice`) — 9 independent quiz/drill mini-games that test recall of scales, chords, intervals, notes, and modal harmony.
3. **Fretboard** (`/fretboard`) — a visual guitar neck (6 strings × 12 frets) with sharps/flats toggle, tuning presets, and a note-filter, newly added this milestone.

There is no login, no backend, no server-persisted data. Everything is client-side React state; the only two things persisted (via `localStorage`) are a small global `Settings` object (numbers-vs-notes display mode, current root note, a highlighted chord id) and the selected color theme. There is no user content, no accounts, no images/photos anywhere in the UI — every visual element is drawn with CSS, SVG, or Unicode-adjacent text (nothing is a raster image except the favicon).

## 2. Tech stack

- React 19 + TypeScript, built with Vite 8.
- Routing: `react-router-dom` v7 (`BrowserRouter`), a handful of top-level routes plus one nested layout route under `/scales`.
- Styling: Tailwind CSS v4, configured entirely via CSS (`@theme` in `src/theme/tokens.css`) — there is no `tailwind.config.*` file.
- Component primitives: shadcn/ui (vendored into `src/components/ui/`, built on Radix UI / `@base-ui/react`), icons from `lucide-react`.
- State: two tiny React Context providers (`Settings`, `Theme`); every screen/game otherwise uses local `useState`.
- Testing: Vitest. **130 tests across 13 files, all passing, all of them domain-logic tests** (`src/domain/*.test.ts`). There are zero component/UI tests and no visual regression tooling — confidence in the UI currently comes only from manual/Playwright-driven checks done during development, not an automated suite.

## 3. Information architecture

```
/                          → redirects to /scales
/scales                    → scale list + search (layout route)
/scales/:id                → scale detail (rendered as an overlay above the list)
/practice                  → practice hub (menu of games)
/practice/guess-scale
/practice/write-scale/:scaleId
/practice/write-scales
/practice/write-chords
/practice/complete-chord
/practice/guess-interval
/practice/guess-note
/practice/guess-chord
/practice/guess-mode-position
/fretboard
*                          → redirects to /scales
```

Three ways to reach a practice game exist simultaneously: the sidebar → Practice hub card list; a "Practice" dropdown menu (`PracticeMenu`) available from the Scales detail header for scale-specific games; and direct deep links. Worth a design pass to decide if this redundancy is intentional wayfinding or should be simplified.

## 4. Design system as it exists today

### Color

Three selectable themes (Light / Dark / Coral), switched via a `ToggleGroup` in the settings popover, applied as `data-theme` on `<html>`, persisted in `localStorage`. All colors are CSS custom properties layered in two tiers: a small set of primitives per theme, then a shadcn-style semantic alias layer (`--background`, `--card`, `--popover`, `--secondary`, `--muted`, `--accent`, `--input`, `--ring`, `--sidebar*`) all derived from those primitives — nothing hardcodes a raw hex outside `tokens.css`.

**Light**
| Token | Value | Role |
|---|---|---|
| `--bg` | `#ffffff` | page background |
| `--surface` | `#f8f7fb` | card/panel background |
| `--surface-alt` | `#efedf3` | hover/selected background, muted fills |
| `--text` | `#1a1a1f` | primary text |
| `--text-muted` | `#6b6375` | secondary text |
| `--border` | `#d8d6de` | hairlines |
| `--primary` | `#1a1a1f` (= text) | the app's "accent" is literally its own text color — no separate brand hue |
| `--primary-foreground` | `#ffffff` | text on primary fill |
| `--natural` / `--natural-fill` | `#b5652c` / `#f6ddc1` | natural-note accent (fretboard) |
| `--accidental` / `--accidental-fill` | `#2f5f8f` / `#d3e3f2` | sharp/flat accent (fretboard) |
| `--destructive` / `-foreground` | `#dc2626` / `#ffffff` | wrong-answer state |
| `--success` / `-foreground` | `#16a34a` / `#ffffff` | correct-answer state |

**Dark**
| Token | Value |
|---|---|
| `--bg` | `#14151a` |
| `--surface` | `#1c1d24` |
| `--surface-alt` | `#26272f` |
| `--text` | `#f2f1f5` |
| `--text-muted` | `#9c98a6` |
| `--border` | `#34353f` |
| `--primary` | `#ffffff` |
| `--primary-foreground` | `#14151a` |
| `--natural` / `--natural-fill` | `#e8a06a` / `#4a3524` |
| `--accidental` / `--accidental-fill` | `#7db1e0` / `#223347` |
| `--destructive` / `-foreground` | `#f87171` / `#14151a` |
| `--success` / `-foreground` | `#4ade80` / `#14151a` |

**Coral**
| Token | Value |
|---|---|
| `--bg` | `#f1e7d6` |
| `--surface` | `#faf4e8` |
| `--surface-alt` | `#e8dcc3` |
| `--text` | `#241f1a` |
| `--text-muted` | `#8a7d6b` |
| `--border` | `#ddcdae` |
| `--primary` | `#e2604c` (this theme's only real hue accent) |
| `--primary-foreground` | `#fbf3e7` |
| `--natural` | reuses `--primary` (`#e2604c`) |
| `--natural-fill` | `#f2d6c4` |
| `--accidental` / `--accidental-fill` | `#2d6e78` / `#d7e6e4` |
| `--destructive` / `-foreground` | `#b3261e` / `#fbf3e7` |
| `--success` / `-foreground` | `#2f7d4f` / `#fbf3e7` |

**Observation for the designer**: Light and Dark themes are essentially monochrome — `--primary` is just the text color, so "highlighted" and "your own text" render identically. Coral is the only theme with a true brand hue. The natural/accidental (orange/blue) pair exists only for the Fretboard section; nothing else in the app uses a two-hue accent system. This is a real opportunity: the app currently has almost no chromatic identity outside one screen.

### Shape / radius

Every theme sets `--radius: 0rem` and the `@theme` block pins all of Tailwind's radius scale (`--radius-sm` through `--radius-4xl`) to that single zero value — the design intent is a hard-edged, square aesthetic. **This is not actually honored**: the vendored shadcn primitives (button, input, dialog, popover, tooltip, dropdown-menu, command, sidebar, switch, toggle, tabs, etc. — 19 files under `src/components/ui/`) hardcode literal Tailwind radius classes (`rounded-lg`, `rounded-xl`, `rounded-full`, `rounded-md`) instead of referencing the token, so popovers, dialogs, buttons, and switches all render with soft rounded corners in practice, while the note/chord "boxes" that make up most of the app's actual content are perfectly square. `ScaleName`'s mode badge and the sidebar's logo mark also use `rounded-full`/`rounded-md`. **This mismatch between the declared token and the rendered UI is probably the single highest-leverage thing to fix or deliberately resolve.**

### Typography

No custom typeface anywhere — no `@font-face`, no Google Fonts link, no `font-family` override in any CSS/component. The entire app renders in the browser/OS default sans-serif. There is a de facto type scale (`text-xs` through `text-2xl`/`text-3xl`, mostly via Tailwind utility classes on a per-component basis) but no named/documented scale. **This is an open canvas for a designer** — pairing a real typeface (a display face for scale/chord names, a clean body/UI face, and something with good tabular figures for the fretboard's fret numbers and interval math) would likely do more for the app's identity than any other single change.

### Iconography

`lucide-react` throughout (Settings gear, Target for practice, ListMusic for scales, Guitar for the fretboard nav item, chevrons, X/clear, RotateCcw for reset, Search). No custom icon set.

### Branding

The favicon (`public/favicon.svg`) is a generic abstract purple/blue gradient blob — it has no connection to guitars, music, or the app's own square/two-tone visual language, and looks like an unedited scaffold default. There is no other logo asset; the sidebar header is just a plain square with the letter "G" in `--text`/`--bg` colors. **The app currently has no real visual identity/mark.**

### The atomic visual language: two note primitives

Almost the entire app is built from tiling one of two primitives:

- **`Box`** (`src/components/Box.tsx`) — a square, bordered cell showing a note or scale-degree label. Two variants: `filled` (solid `bg-surface`, or `bg-primary` when highlighted) and `outline` (transparent, low-opacity when not highlighted — used for scale/chromatic rows). State layering, in priority order: `wrong` (destructive red) > `secondaryHighlighted` (chord tone, primary fill) > `highlighted` (scale tone, primary fill or border) > default. A note with both a sharp and flat name (e.g. C#/Db) renders as two small stacked lines inside the box rather than one string. This is the primitive behind `ScaleRow`, `ChromaticGrid`, and most practice-game grids.
- **`NoteCircle`** (`src/components/NoteCircle.tsx`) — the Fretboard's equivalent: an SVG circle + single-spelling label (sharp *or* flat, whichever the user has toggled — never both at once, unlike `Box`), colored by a `natural`/`accidental` accent rather than the neutral primary color, with the same `highlighted`/`secondaryHighlighted`/`wrong`/`muted` state vocabulary layered on top for future reuse (root highlighting, chord overlays, note filtering).

These two primitives never appear together and look deliberately different (square vs. round, mono vs. two-hue, dual-label vs. single-label) — this divergence is a direct consequence of the Fretboard being built later, matching a specific reference photo, rather than a considered decision to have two note languages. Worth a deliberate call: unify them, or keep two languages but make the reason legible (e.g. "square = abstract/scale context, round = physical fretboard context").

## 5. Section: Scales (`/scales`)

**Purpose**: a browsable reference of every scale, with tools to inspect its intervals and (for the 7 diatonic modes of the major scale) how it relates to its sibling modes.

- **`ScalesLayout`** — the route shell. Renders the scrolling list with a search panel pinned above it, plus a router outlet for the detail view.
- **`ScaleList`** — a vertically scrolling, snap-scrolling "carousel" (fixed 176px row height, `snap-y snap-mandatory`). Scales are grouped into sections (Major Diatonic Modes, Pentatonics, Symmetrical, Other), each preceded by a centered label flanked by horizontal rules (`ScaleGroupMarker`). As the user scrolls, a listener computes each row's distance from the vertical center and fades opacity for anything off-center (decaying ~0.28 per row, floor 0.08) — the focused row is fully opaque, neighbors dim progressively. This is a distinctive, already-considered piece of interaction design worth preserving/refining rather than replacing.
- Each **`ScaleListItem`** shows the scale's name (+ alt names, + a "Major diatonic mode" pill badge where relevant) beside a compact chromatic preview row.
- **`ScaleSearchPanel`** sits above the list: a small toolbar (Clear, a search-icon toggle, a Practice-games dropdown) that expands into a full 13-box chromatic grid — clicking notes there filters the list to scales containing every selected note. This is a note-multiselect, not a text search field.
- **`ScaleRoute` / `ScaleView`** — clicking a scale overlays the detail page full-bleed over the list (absolutely positioned, not a route transition in the traditional sense). Header: a "← Back to scales" link, the scale name + a searchable combobox to jump to a different scale, and a Practice-games dropdown scoped to that scale. Below that, two tabs — **Intervals** and **Modes** — but the tab bar itself only appears for scales that are diatonic modes; non-modal/synthetic scales get the Intervals view with no tab chrome at all (an inconsistent shell depending on scale type).
- **Intervals tab** (`IntervalsPane`): a "Show arrows" switch, then a stacked SVG diagram — interval arcs above the row, the note row (`ScaleRow`) in the middle, interval arcs below. Arcs are drawn as orthogonal step-lines from the root to each scale degree, ranked/staggered by interval width so overlapping arcs don't collide, each ending in an arrowhead and a text label (e.g. "M3", "P5") with a background-matte rectangle so the label reads over crossing lines. This is one of the more sophisticated pieces of custom SVG work in the app and a strong visual anchor — a good candidate for a "hero" treatment.
- **Modes tab** (`ModesPane`): all 7 modes of the scale's parent major scale, stacked as rows, each with a roman-numeral position label, name, and quality (major/minor/diminished). A toolbar lets the user set the currently-viewed scale as the rotation's "root" (re-numbering all 7 relative to it), toggle Major-key vs Minor-key ordering (`ProgressionToggle`), and toggle "Center scale" (re-aligns all mode rows so the active scale's notes land in the same visual columns as its siblings, instead of every mode starting at column 0).
- **Top bar** (`TopBar`, always visible above all three sections): a sidebar-toggle button, a Numbers/Notes display-mode toggle, and a settings gear that opens `SettingsPopover` — root-note picker (only relevant in Notes mode), a chord-highlight picker (overlay any chord's shape on the current scale, with a clear/X button), the theme picker, and a "Reset to defaults" action.

## 6. Section: Practice (`/practice`)

**Purpose**: 9 short, replayable quiz games, each drilling one specific music-theory recall skill. All share one chrome (`PracticeSessionShell`): a fixed full-screen overlay with a blurred backdrop, a centered card, a header (← Exit / title / running `correct/total` score once started), a "Start" gate before play begins, and the game itself as `children` once started.

Two distinct interaction models exist across the games, both worth naming explicitly to a designer:

- **Multiple-choice model** (`MultipleChoiceOptions`): 4 shuffled answer buttons; a wrong click turns that button red/destructive and disables it (others stay live), the correct answer turns green/success once found, then a shared `FeedbackBanner` (green check / red X + optional "here's the right answer" reveal) appears with a "Next" button (Enter also advances).
- **Build-your-answer model** (`NoteAnswerInput` / `CompleteChordLoop`'s own grid): the user constructs an answer by clicking boxes on a chromatic grid (or typing letters, with Shift for sharps, on the keyboard) and either submits explicitly (write-scale/write-chords games) or gets immediate per-click feedback (complete-the-chord).

The 9 games:

1. **Guess the scale** — a scale's shape is shown as highlighted boxes on a chromatic grid; pick its name from 4 choices. Pool of scales configurable via a checkbox tree (`ScaleGroupPicker`) before starting.
2. **Write the scale** (loop + single-scale route variant) — given a scale name, build its notes from memory on a chromatic grid or keyboard; submit; correct/incorrect banner reveals the right answer as a full note row if wrong.
3. **Write the chords** — same build-and-submit model, but for a chord's notes given its name and a random root.
4. **Complete the chord** — the newest/most iterated game this session: shown a chord's shape with the root filled in and blank slots (labeled with interval numbers), pick the remaining notes from a shuffled 11-note row by click or keyboard (letter + Shift for sharp); correct picks fill the slot and turn primary/blue, wrong picks turn red and lock out, interval arcs with names annotate the target shape. Configurable via a chord picker + a root-note filter before starting.
5. **Guess the interval** — two notes shown with an arrow between them (interval name hidden); pick the interval name from 4 choices.
6. **Guess the note (Static root / Endless)** — a `ToggleGroup` picks between two sub-modes: a fixed root with a fixed-interval arrow (auto-advances 800ms after a correct pick, no manual Next), or an "endless" horizontally-scrolling note track that visually slides/chains forward on each correct answer — the only game with this kind of continuous-scroll visual.
7. **Guess the chord** — a chord's notes highlighted within a scale context; pick its name from 4 choices.
8. **Guess the mode position** — given a mode shown as a note row, pick its roman-numeral position within a major- or minor-key progression from 4 choices.

Shared setup pickers, all reusable checkbox-tree or list components: `GroupPicker` (generic, section headers with indeterminate select-all + per-item checkboxes), specialized as `ScaleGroupPicker`, `ChordGroupPicker`, and `NoteGroupPicker` (splits into "Natural notes" / "Sharps & flats" sections — this exact component is now reused, unmodified, as the Fretboard's note filter). `ChordPicker` is a separate, simpler single-select list (not a `GroupPicker`) used where only one chord may be chosen.

## 7. Section: Fretboard (`/fretboard`)

**Purpose**: a visual, interactive guitar neck — the newest platform, added and iterated this milestone, built to eventually support the same kind of scale/chord overlay and practice-game reuse that `Box`/`ScaleRow` provide for the Scales side.

- **`Fretboard`** — a single SVG (fixed viewBox, scales responsively, no measurement dependency on surrounding DOM) drawing: 6 horizontal string lines, a thick rounded "nut" line separating the open-string column from the fretted grid, 12 evenly-spaced fret cells (wider than tall, notes drawn at each cell's *center* — between fret wires, matching where a finger actually presses, not on the wire itself), fret numbers above and below (grey-highlighted behind the number only, at frets 3/5/7/9/12), and one `NoteCircle` per string per position (open + 12 frets = 13 per string, 78 total).
- **`FretboardRow`** — one string's worth of notes, computed from an open-string semitone and the shared fret-to-x math.
- **Controls row** above the board (`FretboardView`): a Sharps/Flats `ToggleGroup`; a tuning picker using the app's existing generic `Combobox` (search-enabled dropdown), with 8 presets — Standard, Drop D, Half Step Down (Eb Standard), Open G, Open D, Open E, DADGAD, Drop C; and a note-filter button that opens a popover containing the same `NoteGroupPicker` used in the Complete-the-chord practice game, showing a live count on the trigger ("All notes" / "7 notes").
- The component API already accepts (but nothing in the UI yet drives) `rootSemitone` and `highlightedSemitones` — the hooks for a future scale/chord overlay on the neck, and for reusing `Fretboard`/`FretboardRow`/`NoteCircle` inside practice games later, mirroring how `ScaleRow` is reused throughout Practice today.

**Design inconsistency worth flagging**: unlike Scales and Practice, the Fretboard page has no "landing/picker then commit" flow — it's just the board and its controls, always live, no separate setup step. Whether that's the right pattern for this section (versus giving it the same session-shell treatment as Practice) is an open design question.

## 8. Cross-cutting interaction conventions

- **Retry-until-correct, never unmount**: across every practice game, a wrong pick locks that option out (red) but everything else stays clickable and nothing disappears from the layout — no answer choice is ever removed from the DOM, so there's no layout jump while retrying.
- **Score convention**: `correct/total` count, shown top-right of the practice shell once a session has started; a round only counts as "correct" if it was solved with zero wrong attempts along the way.
- **Advance convention**: a green "Correct!" or red "Not quite" banner with a "Next" button; Enter is a global shortcut for that button.
- **Keyboard input**: fully supported in "Write the scale/chords" (type digits or letters, Shift for sharp, Enter to submit) and in "Complete the chord" (type a letter, Shift for sharp, to pick an alternative) — but not in any of the multiple-choice games, where you must click a button. Worth deciding if keyboard support should be universal.
- **Sharp/flat display differs by context**: everywhere on the Scales/Practice side, a dual-spelling note (C#/Db) is shown as both spellings stacked, always. On the Fretboard, it's a user-toggleable single spelling. These are two different mental models for the same underlying data and currently coexist without a stated reason.

## 9. Testing / confidence level

130 automated tests, 13 files, 100% passing — but entirely domain-logic (chord/scale data integrity, interval math, grouping, search, fretboard math). There is no automated coverage of rendering, layout, or interaction, and no visual regression tooling. Any redesign should assume manual verification is the only safety net for anything visual.

## 10. Summary: explicit opportunities for a design pass

1. **No real typeface** — the single highest-impact opportunity; nothing about the current type is a deliberate choice.
2. **Radius token says "square everywhere," reality says "rounded everywhere except note boxes"** — pick one and apply it consistently across shadcn primitives (popovers, dialogs, buttons, switches) vs. the Box/NoteCircle grids.
3. **No real brand mark** — the favicon is an unrelated generic gradient blob; the sidebar logo is a bare letter tile; the app's own name is inconsistent between the browser tab ("Absolutely Understanding Guitar") and the sidebar ("Guitar Theory").
4. **Two note-primitive visual languages that never talk to each other** — `Box` (square, mono, dual-label) for Scales/Practice vs. `NoteCircle` (round, two-hue, single-label) for Fretboard. Decide whether to unify or intentionally differentiate.
5. **Almost no color identity outside Coral and the Fretboard** — Light/Dark themes use their own text color as "primary," so there's no accent hue driving buttons, links, or emphasis most of the time.
6. **Three different single-select UI patterns** doing similar jobs — the generic searchable `Combobox`, the plain highlighted-button-list `ChordPicker`, and two-option `ToggleGroup`s — could likely be consolidated or made visually related.
7. **Inconsistent game shells** — some practice games have a setup/picker step before "Start," others drop straight into play; the Fretboard page has no setup step at all, unlike its sibling sections.
8. **Triple navigation paths** to the same practice games (sidebar hub, per-scale dropdown, deep link) with no visual distinction in how they're presented.
9. **Zero UI test coverage** — any visual/structural refactor currently relies entirely on manual and ad hoc Playwright checks, not a maintained suite.
