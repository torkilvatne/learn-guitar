import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getChordById } from '../domain/chords'
import { resolveRootSemitone, type DisplayMode } from '../domain/scaleEngine'

export interface Settings {
  mode: DisplayMode
  rootSemitone: number
  highlightedChordId: string | null
}

const DEFAULT_SETTINGS: Settings = {
  mode: 'numbers',
  rootSemitone: resolveRootSemitone('A'),
  highlightedChordId: null,
}

const STORAGE_KEY = 'absolutely-understanding-guitar:settings'

function isDisplayMode(value: unknown): value is DisplayMode {
  return value === 'numbers' || value === 'notes'
}

function isRootSemitone(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 11
}

function isHighlightedChordId(value: unknown): value is string | null {
  return (
    value === null || (typeof value === 'string' && getChordById(value) !== undefined)
  )
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_SETTINGS
    }
    const parsed = JSON.parse(raw)
    return {
      mode: isDisplayMode(parsed.mode) ? parsed.mode : DEFAULT_SETTINGS.mode,
      rootSemitone: isRootSemitone(parsed.rootSemitone)
        ? parsed.rootSemitone
        : DEFAULT_SETTINGS.rootSemitone,
      highlightedChordId: isHighlightedChordId(parsed.highlightedChordId)
        ? parsed.highlightedChordId
        : DEFAULT_SETTINGS.highlightedChordId,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export interface SettingsContextValue extends Settings {
  setMode: (mode: DisplayMode) => void
  setRootSemitone: (rootSemitone: number) => void
  setHighlightedChordId: (highlightedChordId: string | null) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...settings,
      setMode: (mode) => setSettings((previous) => ({ ...previous, mode })),
      setRootSemitone: (rootSemitone) =>
        setSettings((previous) => ({ ...previous, rootSemitone })),
      setHighlightedChordId: (highlightedChordId) =>
        setSettings((previous) => ({ ...previous, highlightedChordId })),
      resetSettings: () => setSettings(DEFAULT_SETTINGS),
    }),
    [settings],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
