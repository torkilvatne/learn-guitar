export const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'coral', label: 'Coral' },
] as const

export type ThemeId = (typeof THEMES)[number]['value']

export const DEFAULT_THEME_ID: ThemeId = 'light'
