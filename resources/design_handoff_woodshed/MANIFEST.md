# File manifest

Everything under `code/src/` mirrors the repo's own paths — copy each file to the same
path in `torkilvatne/learn-guitar`. Domain logic (`src/domain/*`), state
(`src/state/settings.tsx`) and the nine session components are untouched except where
noted.

## Replace wholesale (25 files)

### Tokens and global CSS — do these first
| File | What changed |
| --- | --- |
| `src/theme/tokens.css` | New warm palette, 100–900 ramps for neutral/accent/sage, note-language tokens, a real radius scale (was `0rem` for every step), shadow tokens. Two themes. |
| `src/index.css` | Caprasimo + Figtree import, heading styles, accent `::selection`, the themed `:focus-visible` ring. |
| `src/theme/themes.ts` | Three themes → two, plus a `RETIRED_THEME_IDS` map. |
| `src/state/theme.tsx` | Migrates a persisted `'coral'` to `'light'` on read. |

### Shared primitives — everything else depends on these
| File | What changed |
| --- | --- |
| `src/components/Box.tsx` | Rounded 10px cell, accent fill when in-scale, sage when a chord tone, locked strikethrough when wrong, optional caption underneath. |
| `src/components/NoteCircle.tsx` | Warm/sage fills with dedicated text colours; muted opacity 0.1 → 0.28. |
| `src/components/SegmentedControl.tsx` | **New.** The one segmented control for Numbers/Notes, Sharps/Flats, Intervals/Modes and Theme. |
| `src/components/ui/button.tsx` | Pill radius, accent primary, 44px min height, accent-ramp hover/press, themed focus outline, contrast-safe success/destructive. |
| `src/components/ModeToggle.tsx` | Now wraps SegmentedControl. |
| `src/components/AccidentalStyleToggle.tsx` | Now wraps SegmentedControl. |

### App shell and navigation
| File | What changed |
| --- | --- |
| `src/features/AppTopNav.tsx` | **New.** Exports `AppTopNav` (desktop bar) and `AppBottomTabs` (mobile). Replaces AppSidebar + TopBar. |
| `src/features/Home.tsx` | **New.** Task-first landing: Understand / Recall / Locate, plus an optional resume strip. |
| `src/App.tsx` | Sidebar removed, `/home` added, `/` and `*` now land on Home. |
| `src/features/SettingsPopover.tsx` | Rounded popover, 2.75 icon stroke, hairline instead of `<Separator>`. |
| `src/features/ThemeSelector.tsx` | Two options via SegmentedControl. |

### Scales
| File | What changed |
| --- | --- |
| `src/features/ScalesLayout.tsx` | Real page header with title, live count, mode toggle and the notes filter. |
| `src/features/ScaleSearchPanel.tsx` | Unlabelled icon → a labelled "Filter by notes" popover that shows the active count. No longer overlays the list. |
| `src/components/ScaleListItem.tsx` | Focus falloff 1 / .62 / .34 over three steps (was four steps to a 0.08 floor); focused row is a rounded raised surface; chevron affordance. |
| `src/components/ScaleGroupMarker.tsx` | Accent tag + single rule instead of a label between two hairlines. |
| `src/components/ScaleName.tsx` | Caprasimo, `emphasis` prop for the focused row, sage family tag. |
| `src/components/ScaleRow.tsx` | 6px gaps; the caption now shows the *other* language rather than being hidden or set to opacity-10. |
| `src/components/ChromaticGrid.tsx` | Gap 4px → 6px to match. |

### Scale detail
| File | What changed |
| --- | --- |
| `src/features/ScaleView.tsx` | Explicit "Practice this scale" primary (replaces the unlabelled PracticeMenu icon), SegmentedControl tabs, real h1 header with quality sub-line. |
| `src/features/IntervalsPane.tsx` | The shadcn Field explainer block is gone; grid + arcs live in one rounded surface panel. |
| `src/features/ModesPane.tsx` | One rounded surface; active mode is an inset ground-coloured row; roman numeral becomes a tag. |
| `src/components/IntervalArcs.tsx` | Arcs in accent-700 at 55%; label plate is a rounded accent pill instead of a `--bg` rectangle that punched through surfaces. |

### Practice
| File | What changed |
| --- | --- |
| `src/features/practice/PracticeHub.tsx` | Nine flat links → three families of three, as cards with a meta line. |
| `src/features/practice/PracticeSessionShell.tsx` | Rounded sheet, Leave + progress dots header, prompt block with a real question. New `question` and `results` props. |
| `src/features/practice/SessionProgress.tsx` | **New.** Ten dots + "N of M clean". |
| `src/features/practice/MultipleChoiceOptions.tsx` | Wrong answers lock with a strikethrough and stay visible. |
| `src/features/practice/FeedbackBanner.tsx` | One rounded bar: icon, an explanatory sentence, Next inline with its ↵ hint. New `explanation` prop. |

### Fretboard
| File | What changed |
| --- | --- |
| `src/features/FretboardView.tsx` | Header/toolbar matches the other screens; board in a rounded surface; adds the caption explaining the two note languages. |
| `src/components/Fretboard.tsx` | Pill inlays, lighter fret wires, heavier nut, 14px/700 fret numbers. Geometry unchanged. |

## Delete after the shell change
- `src/features/AppSidebar.tsx`
- `src/features/TopBar.tsx`
- `src/components/ui/sidebar.tsx` — only if nothing else imports it

## Unchanged, but you'll touch them
| File | Why |
| --- | --- |
| `src/components/ScaleSwitcher.tsx` | `ScaleView` now passes `open`, `onOpenChange` and a custom `trigger`. Add those three props (or drop them from ScaleView and keep the current trigger). |
| `src/components/PracticeMenu.tsx` | No longer used by ScaleView or ScaleSearchPanel. Delete if nothing else uses it. |
| The nine `*Session.tsx` files | Pass `question` and `results` to `PracticeSessionShell`, and `explanation` to `FeedbackBanner`. Both are optional — the components render sensibly without them, so this can be a follow-up pass. |
| `src/features/ScaleList.tsx` | No edits needed: the falloff constants it relies on live in `ScaleListItem`. |
| `src/components/FretboardRow.tsx` | No edits needed: muting is handled inside `NoteCircle`. |

## Build notes
- Tailwind v4 picks the new tokens up through `@theme` — no `tailwind.config` change.
- New utility names you'll be able to use: `bg-accent-100…900`, `bg-accent-2-*`,
  `bg-neutral-*`, `text-natural-text`, `shadow-elev-sm|md|lg`, `bg-divider`.
- `rounded-lg` and friends now produce real radii everywhere, including in shadcn
  components you haven't touched. That is intended — but skim popovers, dialogs and
  command menus once after the token swap.
- Fonts: swap the Google import for `@fontsource/caprasimo` + `@fontsource/figtree`
  if you'd rather self-host.
