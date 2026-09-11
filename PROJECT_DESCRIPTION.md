# Absolutely Understanding Guitar - Support material website

## Project description/goal

I am currently watching a YouTube-series about learning guitar with music theory. The series I am watching has support material, but I want a website that also can be used as additional support material. The existing support material is a PDF with theory. The website I want to be based on certian parts of that PDF (screenshots from PDF will be in @resources/*).

The core concept of this website is relevant to the chromatic scale (@resources/interval_chromatic_scale.png) which goes from 1 to 8 (including the above octave - 8). As music theory is mainly centered around, I want to learn and practice intervals. Scales (@resources/must_know_scales.png) have intervals that follow the chromatic scale (e.g. the "Major Diatonic"/"IONIAN mode" scale is 1-2-3-4-5-6-7-8 and "Natural Minor"/"AEOLIAN mode" is 1-2-3b-4-5-b6-7b-8).

As seen in @resources/intervals_overview.png there are the names and half steps for intervals which is used in @resources/interval_chromatic_scale.png and in @resources/interval_notes.png (the arrows above and below). The arrows below is the interval and the arrows above is the inverse intervals. I want to be able to show intervals with both it's chromatic scale numbers, but also the correlating notes (A to G) and also be able to select specific root notes. I want the UI to follow the "visualized scale structure" as in the screenshots (squares with the chromatic numbers/notes) and with the correct "spacing" to indicate the number of half-steps.

When giving a UI overview of scales I want the list of be ordered in the same way as in the screenshots, so first @resources/must_know_scales.png and then @resources/scales_extended_list.png.

I want for scales when a box is for a "sharp" or "flat" note, for numbers I want it to be shown as in @resources/interval_chromatic_scale.png where "1#" and "2b" to be shown in the same box with "1#" on top and "2b" on bottom. For notes I want it to be shown as in @resources/interval_notes.png with e.g. "A#" on top and "Bb" on bottom.

I also want to practice "modes" (see @resources/modes_explained.png). For the major diatonic modes (IONIAN, DORIAN, ..., LOCRIAN) I want to be able to show the correlating modes to the selected scale in some kind of "Mode view". So if I select the "Mode view" for a scale I should see the modes/scales presented in the same way as in @resources/modes_explained.png where the first mode is IONIAN and the last mode is LOCRIAN and they are shown in the a indented view where you can clearly see how it maps to the major diatonic scale. I also want the modes to be marked with its mode number. So IONIAN=I, DORIAN=ii, PHRYGIAN=iii, ... and LOCRIAN=Vii.

For a more detailed description about scales and modes, see @resources/SCALES_AND_MOTES.pdf.

I want to be able to switch between "major key progresson (degrees of major diatonic harmonization)" where IONIAN=I and on top of the list and "minor key progression (degrees of natural minor harmonization)" where AEOLIAN=i and on top of the list. Capital letter (e.g. "I") means the scale that is that roman letter is a major scale and lower case letter (e.g. "i") means that the scale it's a minor scale. See the usage of the mode numbering in the "scale slider (based on C as root note) in @resources/slider.png.

In general for all scale functionality I want to be able to have two modes which are "numbers" and "notes". If the mode is "numbers" then the scales follow the chromatic numbered system (1-8). If the mode is "notes" then the scales use the notes (A-G). Default note is A, but the user should be able to select the root note. When "note" mode is selected, that convention should be applied for "the whole site", so both in "interval view", "mode view", etc. The selection should be on top of the page or somewhere where it is easily accessible at all time. What out to not mix between "website mode" and "major diatonic modes". In this paragram I explain the "website/UI mode" where the user can select how they want to view the scales. "major diatonic modes" is IONIAN, DORIAN, ... and AEOLIAN.

I want to be able to select between three visual themes for the site: a Light theme, a Dark theme, and one custom theme. Theme selection should be easily accessible at all times (alongside the numbers/notes mode selection), and my choice should be remembered. The underlying implementation should make it easy to define additional themes later — adding one should be simple, not require touching many files.

Above is mainly explained the "Reading views" of the website, but I also want to have "Practice views" which are views/components/functionality where the user can practice on the information presented.

### Practice views

#### Guess which scale

For scales I want the user to be able to guess "which scale is this" by seeing the scale with its chromatic numbers (or notes) and guessing which it is.

#### Write the scale

I want the user to practice a single scale where they are asked to "write the chromatic numbers/notes for the scale [scale name]" and they have to write either with numbers or notes. E.g. if they are practicing the DORIAN scale they must write "1", "2", 3b", "4", "5", "6", "7b" and "8".

Because it should support both mobile and desktop there should be two different views.

- On desktop: They use the keyboard and use the numbers. To write the "sharps" they click SHIFT together with the number which will be interpreted as a "sharp" note. So if the use clicks SHIFT+3 it will be interpreted as "3b". When they are done they must click ENTER and they will see if they are correct or not.
- On mobile: Instead of keyboard the will "use the chromatic scale as their keyboard". Each number in the chromatic scale will be a button and when they press a number it will be added to their answer. There must be a button that says "Complete" and when that is pressed they will see if they were correct or not.

#### Write the scales (multiple)

Same as above, just that it starts with the user selecting (in the list of scales) which scales they want to practice. When they "start" they will be presented the name of the scale and they have to, as same as explained above, type out the scale. When they get it correct a new scale is presented. This will just loop forever with random picks from the selected list of scales until they click a button to "end the practice session".

### Search scale view

I want the user to be able to, by clicking the numbers in the chromatic scale, search for scales based on the numbers/notes they've clicked.

## Techincal description

I want the website to only be a client side website. I do not need a server. I want code to be based on reusable components. I want code placement to be clean and structured. I don't want multiple components to contain the same duplicated logic. I want to easily be able to change theme colors. I want to use a library/framework that is relevant/up-to-date (Vue/Next/React/etc.). I want domain logic/functions (e.g. music theory) to be in domain-folders and not scattered in multiple components. Components should be render only.

When scales are rendered I want them to follow the correct "theory". So if I want to render a DORIAN scale with notes I dont just want it to be rendered with a hardcoded way of showing the scale. I want to based on it's chromatic numbering scale (1-2-3b-4-5-6-7b-8), use that to decide it's spacing and which note to show. If a new root note is selected I want the rendering logic to easily calculate which notes are where based on the intervals and the chromatic order. I want the core functionality to be based on "which scale is it and what interval setup does it have" and "if notes (not numbers) then what is the root note and what are the correct following notes in the selected scale".

## User Stories

Assume that all bullet points below starts with "As a User [...]":

- I want the home screen to be a scrollable list of scales shown with name and with squares and chromatic numbers highlighed and spaced based on the chromatic scale
- I want to be able to select note modus (A-G) as the values in the scale boxes for my use of the website and have all scales in the list use notes
- I want to, in note modus, be able to select a root note and have all the scales and views be updated based on that
- I want to be able to click a scale and get a more detailed view (Interval view) that consists of its intervals- and inverted intervals arrow
- I want to, in the scales detailed view, still have access to "select root note" view if I'm in note modus
- when selecting a scale that is in the major diatonic modes I should see some indication/label that it is
- when selecting a scale that is in the major diatonic modes I should get an option of entering "Modes view" where I can see the major diatonic scales in intuitive indented rows with my selected scale in the middle of the screen
- when in "Modes view" for a selected scale I want to be able to see which "mode number" the scale I have selected is
- when in "Modes view" for a selected scale I should be able to select between "major key progression" and "minor key progression" so that I can see the scale and it's mode number in relation to either IONIAN (major key progression) or AEOLIAN (minor key progression)
- I want to be able to select between a Light theme, a Dark theme, and a custom theme for the site's appearance, from an always-accessible location, and have my choice remembered between visits

## Technical Decisions & Clarifications

This section records the technical stack and resolves theory ambiguities in the prose above. It is additive; nothing above is changed.

### Stack & tooling

- **Testing:** Only domain logic needs tests, UI components/pages does not need testing
- **Framework:** React + Vite + TypeScript. Client-side only, no server.
- **Styling/theming:** Tailwind CSS v4 with theme tokens defined as CSS variables, one block per selectable theme (Light/Dark/Coral) in a single file, so adding a theme or changing colors never touches more than that one file — see "Theme selection" below.
- **Scale scope:** the full set — the "must know" scales (`must_know_scales.png`) plus all "exotic" scales (`scales_extended_list.png`), 40 total after folding scales with identical interval formulas into each other's `altNames` (see "Deduplicated scale names"), minus the Chromatic scale (removed by user request — it's the reference grid every other scale is plotted against, not a scale to practice), for **39 total**. Scales are data-driven so adding one is just a data entry.
- **Note spelling:** dual sharp/flat labels (e.g. `A#/Bb` stacked), derived purely from chromatic position + root. No key-signature-correct (single-letter-per-degree) spelling.
- **Persistence:** user settings (root note, numbers/notes mode, key progression) are saved to `localStorage` and restored on load. Defaults: numbers mode, root A, major progression, Light theme.
- **Audio:** none in v1.
- **Routing:** `react-router-dom` (`BrowserRouter`), real URL paths (not hash-based) — `/scales` is the **Scales View** (the scrollable list), `/scales/:id` opens that scale's **Scale View** (renamed from "Interval view" — user request, since the view now shows more than just intervals, and the interval arrows themselves are just one of possibly several toggleable displays within it; see "Scale View toggles" below). An unknown `:id` or top-level path redirects to `/scales`.
- **Deployment:** static build only (`vite build`); no specific host configured in v1. Since routing uses real paths, whichever host serves the production build must rewrite unknown paths to `index.html` (a standard SPA fallback rule) so that a hard refresh or direct link to e.g. `/scales/dorian` doesn't 404 — flagged for Epic 16.

### Theme selection

Three selectable themes: **Light**, **Dark**, **Coral** (the "custom" theme called for in the requirements — a warm cream background with a coral-red accent, based on `resources/ui_inspiration/alternative_theme1.png`). Adding a fourth theme later touches exactly two places:

1. One entry in `src/theme/themes.ts`'s `THEMES` array (`{ value, label }`).
2. One `[data-theme="..."]` block in `src/theme/tokens.css`, declaring the same fixed set of variables every other theme declares (`--bg`, `--surface`, `--surface-alt`, `--text`, `--text-muted`, `--border`, `--accent`, `--accent-contrast`).

No component, feature, or state code changes — everything else (the selector UI, persistence, applying the theme) is generic over whatever's in `THEMES`.

Selection is applied by setting `data-theme` on `<html>`, managed by `state/theme.tsx`'s `ThemeProvider`/`useTheme()` (same context+localStorage pattern as `state/settings.tsx`, kept as a separate context since theme is a UI/presentation concern, not a music-domain one). A small inline script in `index.html` applies the stored theme before the app hydrates, so reloading on Dark or Coral doesn't flash Light first.

### Chromatic grid (13 columns)

The chromatic scale grid has 13 columns:
`1, 1#/2b, 2, 2#/3b, 3, 4, 4#/5b, 5, 5#/6b, 6, 6#/7b, 7, 8`
There is no accidental column between 3–4 and between 7–8 (the two natural half-steps). Internally each column maps to a semitone index 0–12. Every scale is defined by its semitone offsets from the root and rendered onto this grid (occupied columns vs. empty gap columns give the spacing) — never hardcoded per scale.

### Mode numbering

- **Major key progression** (IONIAN = tonic, on top): `I  ii  iii  IV  V  vi  vii`
  → Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian.
- **Minor key progression** (AEOLIAN = tonic, on top): `i  ii  III  iv  v  VI  VII`
  → Aeolian, Locrian, Ionian, Dorian, Phrygian, Lydian, Mixolydian.

Which mode gets which numeral is fixed music theory (a numeral's position = its degree of the major scale; its case = its quality). What's genuinely a style choice is *how the numeral string itself is typeset*, and there are two real options — see "Roman numeral notation style" below.

Locrian is **half-diminished**, not fully diminished: its triad alone (1-b3-b5) is diminished, but its own scale supplies a minor 7th, so the chord built on it is m7b5 ("half-diminished 7"), confirmed both by `resources/SCALES_AND_MODES.pdf` page 18A (labels it "HALF DIMINISHED scale") and by general music-theory sources (half-diminished is strictly a seventh-chord term, distinct from a fully-diminished triad/7th).

### Roman numeral notation style

An earlier version of this doc claimed the source material's `Vi` / `Vii` / `iV` numerals (capital V, lowercase i's) were a typo and "corrected" them to fully-lowercase `vi`/`vii°`. That was wrong — `resources/SCALES_AND_MODES.pdf` page 18A and `resources/slider.png` both use this exact capital-V styling consistently, so it's the source material's actual (if non-standard) convention, not a typo. General music-theory sources confirm standard roman-numeral analysis cases the *whole* numeral by quality and marks diminished/half-diminished with a suffix glyph (`vii°`, `viiø`) rather than partial capitalization, so the capital-V styling is specific to this resource's author, not universal notation.

**Decided: standard theory notation.** `I, ii, iii, IV, V, vi, viiø` (major progression) — whole-numeral case by quality (major → uppercase, minor/half-diminished → lowercase), half-diminished marked with `ø`. Numerals are computed from `getDiatonicModeInfo().degree` + `getScaleQuality()`, not hardcoded per mode — this decision only affects the string-formatting step, not the underlying theory logic.

### Scale metadata model

Scales do **not** have a generic `category` field. An earlier pass used one and it conflated three unrelated concerns (major-diatonic-mode membership, must-know-vs-exotic provenance, and tonal quality) — and was factually wrong for Locrian, which got excluded from "Major Diatonic Modes". Instead:

- **Major-diatonic-mode membership** is a computed predicate: a scale's own consecutive-semitone-step pattern is checked against rotations of the major scale's step pattern (`2,2,1,2,2,2,1`). If it matches, the scale is one of the 7 modes and its degree (1–7, Ionian=1 … Locrian=7) is known; otherwise it isn't a diatonic mode at all. This is derived from the scale's own degrees, not a stored flag, so it can't drift out of sync with the data (and it doubles as a correctness check on the degree data itself).
- **Tonal quality** (major, minor, diminished, half-diminished, augmented) is also computed, from the scale's raw semitone set — rather than authored per scale. Ionian/Lydian/Mixolydian → major; Dorian/Phrygian/Aeolian → minor; Locrian → half-diminished (matches the `∅` symbol next to Locrian in `must_know_scales.png`); Whole Tone → augmented (matches its `+` symbol); the symmetrical Diminished scale → diminished (matches its `O` symbol). Some scales (e.g. those with no clear 3rd, like Egyptian, or with both a natural and flat 3rd, like Ethiopian) have no well-defined quality and this returns `undefined` rather than a guess.
- **Must-know vs. exotic** isn't tracked as data at all — nothing in the app behaves differently for it. List ordering is simply the scale data's declared order.
- **List grouping** (user request) is a fourth computed predicate, `getScaleGroup()`: `'major-diatonic-modes'` (reuses the predicate above), `'pentatonic'` (exactly 5 distinct notes), `'symmetrical'` (the interval-step sequence has a repeating cell that tiles the octave evenly — covers Whole Tone and Diminished), else `'other'`. `SCALES`' declared order is grouped to match (diatonic modes, then pentatonic, then symmetrical, then other, with Harmonic Minor first in "other" since it's the one must-know scale fitting none of the first three groups), and the Home list renders a horizontal separator wherever the group changes.

### Scale data model: semitones only, no per-degree labels

A scale's `degrees` field is a bare `number[]` of semitones (e.g. Dorian = `[0,2,3,5,7,9,10,12]`) — nothing else. Earlier this also carried a `label` string per degree (`'b3'`, `'#4'`, ...), authored by hand for every scale. That was dropped for two reasons:

1. **Display never needed it.** A degree's on-screen label (numbers mode) is fully derivable from its semitone alone, via `CHROMATIC_STEPS` — the same 13-column reference table already used for the chromatic row. This also fixes a real display gap: numbers-mode boxes for an accidental degree now *always* show the dual sharp/flat label (`1#`/`2b` stacked), matching `interval_chromatic_scale.png`'s convention, instead of whichever single spelling the source chart happened to use for that particular scale.
2. **It duplicated the semitone.** The label was derivable from the semitone (mechanically parseable into `{step, accidental}`), so authoring both was two sources of truth for one fact, and needed its own cross-check test to catch transcription drift between them.

The one thing raw semitone *can't* recover is which scale-degree-number (2nd, 3rd, 4th...) an accidental note is theoretically functioning as — semitone 3 could be a `b3` or a `#2`; semitone 6 could be a `#4` or a `b5` — this is a genuine, provable music-theory ambiguity (Whole Tone's `#5` and Persian's `b6` sit on the identical semitone, semitone 8, and need opposite interpretations, with nothing in the pitch content itself to tell them apart), not a coding gap. `getScaleQuality()` (above) is the only place this matters, and it's only actually used for the 7 diatonic modes (Epic 4's roman numerals), where it's fully correct — verified against every scale in the dataset, it has exactly one accepted casualty: **Hungarian Major** (`1,#2,3,#4,5,6,b7,8`) is theoretically `major`, but its `#2` is indistinguishable from a `b3` by semitone alone, so it now returns `undefined` rather than a possibly-wrong guess.

### Deduplicated scale names

Authoring scales as bare semitone arrays surfaced 11 scales whose `degrees` were byte-for-byte identical to another scale already in the list — real (two culturally/historically distinct scale names sharing one interval pattern is a genuine, common occurrence in scale theory), but redundant as separate app entries, since they'd render identically in every view. Folded into the surviving scale's `altNames` rather than kept as separate `SCALES` entries (51 → 40 total):

- Melodic Minor ← Hawaiian
- Harmonic Minor ← Mohammedan (also directly confirmed by `slider.png`, which labels it "HARMONIC MINOR - Aeolian Major 7 - Mohammedan")
- Major Pentatonic ← Mongolian, Chinese
- Double Harmonic Major ← Gypsy, Byzantine
- Hungarian Minor ← Algerian
- Kumoi ← Japanese
- Major Phrygian ← Jewish, Spanish
- Major Locrian ← Arabian

The first three had an obvious primary (a must-know scale absorbing exotic duplicates). The other five are all-exotic groups with no must-know anchor, so the surviving name was picked by which is more theory-systematic or commonly used (e.g. "Major Phrygian"/"Major Locrian" name the actual interval alteration) — a judgment call, not a derived fact, and one the user could reasonably make differently.

**Renamed (user request):** the scale previously named "Major Diatonic" (id `major-diatonic`, altName "Ionian Mode") is now named **Ionian** (id `ionian`), with "Major Diatonic" moved to `altNames`. This flips which name is primary but changes nothing else — same degrees, same diatonic-mode membership, same everything downstream. Same treatment for "Natural Minor" (id `natural-minor`, altNames `["Aeolian Mode", "Relative Minor"]`) → **Aeolian** (id `aeolian`, altNames `["Natural Minor", "Relative Minor"]`).

### Mode progression math

The **major key progression** re-numbers the 7 diatonic modes with Ionian as "1"; the **minor key progression** re-numbers the same 7 modes with Aeolian as "1" (Aeolian is major-scale-degree 6, so this is a re-rooting, not a different mode family). Both are one formula: for a mode at major-scale degree `d` and a progression whose tonic sits at major-scale degree `t` (Ionian: t=1, Aeolian: t=6), its position in that progression is `((d - t + 7) % 7) + 1`. The roman numeral is then `getRomanNumeral(position, quality)` — quality never changes between progressions (Locrian is half-diminished whether viewed as `viiø` in the major progression or `iiø` in the minor one), only its position/numeral does.

The **indented "Modes view" layout** (`resources/modes_explained.png`) staggers each mode's row so that shared scale degrees visually line up in columns — confirmed by inspection that the image's reference grid is proportionally spaced by semitone (not by uniform degree-index width), matching the convention used everywhere else on this site. So each mode's horizontal stagger offset is its root's semitone distance from the *progression's own tonic* (not always Ionian): `(naturalSemitone(modeDegree) - naturalSemitone(tonicDegree) + 12) % 12`. For the major progression (tonic=Ionian) this gives the offsets shown in the PDF's G-major example: Ionian 0, Dorian 2, Phrygian 4, Lydian 5, Mixolydian 7, Aeolian 9, Locrian 11. For the minor progression (tonic=Aeolian), re-rooting gives: Aeolian 0, Locrian 2, Ionian 3, Dorian 5, Phrygian 7, Lydian 8, Mixolydian 10 — not shown in any resource directly, but it's the same formula, and it's internally consistent with the minor progression's positions (Aeolian=i is first, Locrian=iiø is second, etc.).

### Modes view scope

The staggered/indented "Modes view" applies to the **7 major-diatonic modes only**. Non-diatonic scales (pentatonics, symmetrical, exotic, etc.) do not have a Modes view. Scales that are one of the 7 diatonic modes show a label indicating they belong to the major-diatonic modes plus an entry point into Modes view.

### Scale View structure: Intervals pane + Modes pane (user request)

The **Scale View** (`/scales/:id`, renamed from "Interval view") is split into two panes so it can hold both an interval-focused view and a modes-focused view without either cramping the other: the **Intervals pane** (`features/IntervalsPane.tsx`, the pre-existing content — an "Arrows" on/off toggle plus the `IntervalArcs` pair above/below the scale row) and the **Modes pane** (`features/ModesPane.tsx`, Epic 10's home). A `SegmentedToggle` tab switcher ("Intervals"/"Modes") only appears for the 7 diatonic modes (per "Modes view scope" above) — non-diatonic scales just show the Intervals pane directly, since they have no Modes pane to switch to. The per-pane toggle row is local `useState` inside its own pane component, not a persisted setting — this is a per-view display preference, not a site-wide mode like numbers/notes or theme.

### Chord highlighting (user request)

A site-wide "Highlight a chord" dropdown, always accessible in the header (`SettingsBar`), lets the user pick a chord and see its tones marked on *every* scale row across the site — the Scales list (including while filtered by search), a Scale View's Intervals and Modes panes all honor it, via the same settings pipe `mode`/`rootSemitone` already flow through. Source: `resources/CHORDS_INTERVAL.pdf` page 2 ("27A"), all 39 chords, in the PDF's order. A chord only highlights on a scale that contains *every one* of its tones (per the PDF's own framing: "only the major scales contain a major chord") — a scale missing even one chord tone shows no highlighting at all, not a partial match. Chord extensions (9th/11th/13th) are stored folded into the same octave as their simple-interval equivalents (a 9 is stored as the same pitch class as a 2), since every scale row is a single-octave grid with nowhere else for an extension to land. The PDF's parenthetical/crossed-out degrees (commonly-omitted-in-practice notes on chords like `C11`/`C13`) are not treated as exclusions — the feature shows where a chord's tones theoretically fall, not real-world voicing conventions.

### Search is inline on the Scales list, not a separate page (user request)

"Search scale view" (above) is implemented as an overlay on the Scales list itself, not a standalone route — `features/ScaleSearchPanel.tsx` sits above the carousel, in the space already reserved there for centering the active item (so opening it doesn't move any scale box), and selecting chromatic columns filters the *same* list in place rather than showing a separate results list. `features/ScaleList.tsx` accepts scales as a prop for this reason, defaulting to the full set.

### UI library: shadcn/ui (user request)

The site's interactive controls (toggles, tabs, popovers, searchable selects) are built on [shadcn/ui](https://ui.shadcn.com) (Radix primitives, vendored as editable source under `src/components/ui/`) rather than hand-rolled from scratch — the user's own framing was that raw hand-built components were "hard to work with" and didn't look as polished as they wanted. Component choices don't have to visually match the site's earlier bespoke designs pixel-for-pixel; they only need to use the site's existing color tokens so Light/Dark/Coral theming still applies correctly. Practically: `Switch` for on/off toggles, `Tabs` for the Scale View pane switcher, `Popover` for the root-note selector, `Toggle Group` for the numbers/notes and theme selectors, and a hand-composed `Popover`+`Command` "Combobox" pattern for the chord and scale selectors (searchable, since both lists are large). shadcn's own CSS variables (`--primary`, `--popover`, `--muted`, etc.) are aliased directly onto the site's existing per-theme tokens in `theme/tokens.css`, and `--radius` is fixed at `0rem` so every shadcn component inherits the site's sharp-corners convention automatically, with no per-component overrides.

### Accidental input in practice views (design note)

The "Write the scale" example ("SHIFT+3 → 3b") implies SHIFT = flat, but some scales need sharps (Lydian `#4`; Whole Tone `#4/#5/#6`). Resolution: answers are graded by **semitone-set equivalence** — a written scale is correct when its entered degrees map to the target scale's semitone set, regardless of `#`/`b` spelling. The exact key/keypad UX is finalized in the practice-view task.
