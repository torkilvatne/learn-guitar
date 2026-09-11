# Trimming three themes to two

`src/state/theme.tsx` currently offers light / dark / coral. Woodshed is one warm
light theme and its dark counterpart — coral is gone, and its warmth has been folded
into the light theme itself.

- Narrow the theme union to `'light' | 'dark'`.
- Migrate any persisted `'coral'` value to `'light'` on read, so existing users don't
  land on an undefined theme.
- `src/features/ThemeSelector.tsx` becomes a two-option segmented control (or a single
  toggle) instead of a three-way picker.
