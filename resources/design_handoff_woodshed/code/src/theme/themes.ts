/**
 * Two themes, not three. 'coral' is retired — its warmth is now the light theme.
 */
export const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const

export type ThemeId = (typeof THEMES)[number]['value']

export const DEFAULT_THEME_ID: ThemeId = 'light'

/** Anyone still on the retired theme lands on light rather than an undefined theme. */
export const RETIRED_THEME_IDS: Record<string, ThemeId> = {
  coral: 'light',
}
