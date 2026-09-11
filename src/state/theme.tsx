import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_THEME_ID, THEMES, type ThemeId } from '../theme/themes'

const STORAGE_KEY = 'absolutely-understanding-guitar:theme'

function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.value === value)
}

function loadTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return isThemeId(raw) ? raw : DEFAULT_THEME_ID
  } catch {
    return DEFAULT_THEME_ID
  }
}

export interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(loadTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
