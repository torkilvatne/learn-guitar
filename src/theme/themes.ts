export const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const

export type ThemeId = (typeof THEMES)[number]['value']

export const DEFAULT_THEME_ID: ThemeId = 'light'

export const RETIRED_THEME_IDS: Record<string, ThemeId> = {
  coral: 'light',
}
