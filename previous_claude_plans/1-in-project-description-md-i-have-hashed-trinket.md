# Plan: Bootstrap "Absolutely Understanding Guitar" support site — spec clarifications + TASKS.md

## Context

The user is building a **client-side-only music-theory learning website** (support material for the _Absolutely Understand Guitar_ series). `PROJECT_DESCRIPTION.md` describes the goals; `resources/*.png` + `SCALES_AND_MODES.pdf` are the visual/theory reference. The repo is **greenfield** — only markdown + resource images exist, no code.

The user's immediate ask for **this** turn is NOT to build the app yet. It is to:

1. Fill spec gaps / record decisions in `PROJECT_DESCRIPTION.md`.
2. Produce **`TASKS.md`** — the full task/sub-task breakdown for the whole project.

So this plan's execution produces exactly two file changes: an **append to `PROJECT_DESCRIPTION.md`** (a "Technical Decisions & Clarifications" section) and a **new `TASKS.md`**. All app implementation happens later, per TASKS.md.

## Decisions locked (from Q&A)

- **Stack:** React + Vite + **TypeScript**.
- **Styling/theming:** **Tailwind CSS v4** with theme tokens as CSS variables (single theme file → easy reskin).
- **Scale scope:** Full set — must-know (`must_know_scales.png`) **+** all exotic (`scales_extended_list.png`), ~50 scales. Data-driven so entries are just data.
- **Note spelling:** **Dual sharp/flat labels** (A#/Bb stacked), derived from chromatic position + root. No key-signature-correct spelling.
- **Guess-which-scale:** **Multiple choice** (grid + 4 name options).
- **Persistence:** **localStorage** for settings (root note, numbers/notes mode, key progression).
- **Audio:** **None in v1.**
- **Deployment:** **Static build config only** (`vite build`), no specific host.

## Spec clarifications to append to PROJECT_DESCRIPTION.md

A new section capturing the locked decisions above, plus these theory clarifications/corrections that resolve ambiguities in the current prose:

- **Chromatic grid = 13 columns:** `1, 1#/2b, 2, 2#/3b, 3, 4, 4#/5b, 5, 5#/6b, 6, 6#/7b, 7, 8`. No accidental column between 3–4 and 7–8 (the two half-steps). Semitone index 0–12.
- **Roman-numeral correction.** The description's mode numbering has casing typos. Correct sets:
  - **Major key progression** (Ionian = tonic, on top): `I ii iii IV V vi vii°` → Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian.
  - **Minor key progression** (Aeolian = tonic, on top): `i ii° III iv v VI VII` → Aeolian, Locrian, Ionian, Dorian, Phrygian, Lydian, Mixolydian.
  - Uppercase = major-quality mode, lowercase = minor-quality, `°` = diminished (Locrian). This matches the two roman-numeral columns in `slider.png`.
- **Modes view scope:** the staggered/indented modes view applies to the **7 major-diatonic modes** only (as described). Non-diatonic scales don't get a modes view; diatonic modes show a "belongs to the major-diatonic modes" label + an entry point to Modes view.
- **Accidental input (practice views) — open design item.** The description's example ("SHIFT+3 → 3b") implies SHIFT = flat, but Lydian needs `#4` and whole-tone needs `#4/#5/#6`. Recommended resolution: **grade by semitone-set equivalence** (a written scale is correct when its degrees map to the target's semitone set, regardless of #/b spelling). Final input UX finalized in the practice task.

## Domain model (the core — drives everything)

Pure TS in `src/domain/`, zero React. This is the heart of the "theory-correct, not hardcoded" requirement.

- **`constants.ts`** — `CHROMATIC` (13 labels above), `NOTE_LABELS` (12 dual labels: `A, A#/Bb, B, C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab`), `INTERVALS` by semitone (0 PER UNISON … 6 AUG4/DIM5 … 12 PER OCT), rainbow degree colors (optional, from the PDF: 1=red…7=violet).
- **`scales.ts`** — scale **data**: each scale = `{ name, category, degrees: Degree[] }` where `Degree = { semitone: 0–12, label: "1"|"b3"|"#4"|"bb7"|… }`. Category order preserved from resources (must-know groups first, then exotic). Examples:
  - Ionian `1,2,3,4,5,6,7,8` → semitones `0,2,4,5,7,9,11,12`
  - Dorian `1,2,b3,4,5,6,b7,8` → `0,2,3,5,7,9,10,12`
  - Lydian `1,2,3,#4,5,6,7,8` → `0,2,4,6,7,9,11,12`
  - Diminished `1,2,b3,4,b5,b6,bb7,7,8` → `0,2,3,5,6,8,9,11,12`
- **`scaleEngine.ts`** — map a scale's degrees onto the 13-column grid (occupied vs gap columns for spacing); given a `rootSemitone`, compute each degree's **note** via `(rootSemitone + semitone) % 12` → `NOTE_LABELS`. Numbers mode shows `degree.label`; notes mode shows note label(s), accidentals rendered dual-stacked.
- **`intervals.ts`** — interval name + **inverted interval** (12 − n) per column, for the Interval view arrows.
- **`modes.ts`** — diatonic mode rotations, roman-numeral labels for both progressions, ordering per progression, and **stagger offset** per mode for the indented layout (Ionian 0, Dorian 2, Phrygian 4, Lydian 5, Mixolydian 7, Aeolian 9, Locrian 11 semitones).
- **`search.ts`** — given selected chromatic columns → scales whose semitone set matches/contains them.

## Architecture

```
src/
  domain/     pure theory logic (above) — unit-tested
  components/ render-only: Box (single/dual label), ChromaticGrid, ScaleRow,
              IntervalArrows, RootNoteSelector, ModeToggle (numbers/notes),
              ProgressionToggle, ScaleName label
  features/   compose domain+components: ScaleList (home), IntervalView,
              ModesView, SearchScale, practice/{GuessScale,WriteScale,WriteScalesLoop}
  state/      settings context + localStorage (root note, numbers/notes, progression)
  theme/      Tailwind v4 tokens as CSS variables
  App.tsx, main.tsx
```

Components are render-only (props in, JSX out); all music logic lives in `domain/`; no duplicated theory logic across components (the "DO NOT duplicate" requirement).

## TASKS.md structure (what the file will contain)

Markdown with checkbox tasks grouped into epics, each with sub-tasks and acceptance notes. Epics:

1. **Project scaffold** — Vite+React+TS, Tailwind v4, ESLint/Prettier, theme tokens file, folder structure, static build config.
2. **Domain: constants & intervals** — chromatic/note/interval data, inversion logic, unit tests.
3. **Domain: scale data & engine** — all ~50 scale definitions (must-know + exotic, in resource order), grid-mapping + root→notes engine, unit tests.
4. **Domain: modes** — rotations, roman numerals (both progressions), stagger offsets, tests.
5. **Shared components** — Box (single/dual stacked), ChromaticGrid, ScaleRow, RootNoteSelector, numbers/notes toggle, progression toggle.
6. **Global settings/state** — context + localStorage; numbers/notes + root applied site-wide; default numbers mode, root A.
7. **Home / Scale list view** — scrollable ordered list, spaced boxes, honors global settings.
8. **Interval view** — per-scale detail with interval + inverted-interval arrows (per `interval_chromatic_scale.png`/`interval_notes.png`); root selector accessible in notes mode.
9. **Modes view** — indented 7-mode layout, selected scale highlighted, mode-number label, major/minor progression toggle.
10. **Search scale view** — click chromatic columns → matching scales.
11. **Practice: Guess which scale** — multiple choice.
12. **Practice: Write the scale (single)** — desktop keyboard (incl. accidental scheme) + mobile chromatic-button keypad; semitone-set grading.
13. **Practice: Write the scales (loop)** — select scales → random loop until ended.
14. **Responsive + theming polish** — mobile/desktop layouts, theme swap sanity check.
15. **Build & docs** — production build verification.

Each task written as `- [ ]` with a one-line acceptance criterion; representative sub-tasks under each epic.

## Deliverables (execution of this plan)

1. **Append** a "Technical Decisions & Clarifications" section to `PROJECT_DESCRIPTION.md` (decisions + theory clarifications above). Existing content untouched (no comment removal, additive only).
2. **Create** `TASKS.md` with the epic/sub-task breakdown above.

## Verification

- Re-read both files after writing; confirm `PROJECT_DESCRIPTION.md` edits are additive and the roman-numeral/chromatic clarifications are correct against `slider.png` + `must_know_scales.png`.
- Confirm `TASKS.md` covers every user story and every "Reading" and "Practice" view in the description, with no orphaned feature.
- No code is built this turn; implementation proceeds task-by-task from `TASKS.md` afterward.
