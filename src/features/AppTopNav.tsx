import { Guitar, House, ListMusic, Target } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ModeToggle } from '../components/ModeToggle'
import { useSettings } from '../state/settings'
import { SettingsPopover } from './SettingsPopover'

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: House },
  { to: '/scales', label: 'Scales', icon: ListMusic },
  { to: '/practice', label: 'Practice', icon: Target },
  { to: '/fretboard', label: 'Fretboard', icon: Guitar },
]

export function AppTopNav() {
  const location = useLocation()
  const { mode, setMode } = useSettings()

  return (
    <header className="flex items-center gap-5 border-b border-divider bg-bg px-7 py-3.5">
      <Link to="/home" className="mr-auto flex items-center gap-2.5 rounded-full">
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <circle cx="14" cy="14" r="13" fill="var(--accent)" />
          <path d="M9 8.5V19.5" stroke="var(--bg)" strokeWidth="2.75" strokeLinecap="round" />
          <path
            d="M13 11h7M13 14h7M13 17h7"
            stroke="var(--bg)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-heading text-lg">Woodshed</span>
      </Link>

      <nav className="hidden items-center gap-5 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive ? 'page' : undefined}
              className={`text-sm transition-colors ${
                isActive ? 'text-accent' : 'text-text/70 hover:text-accent'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <ModeToggle mode={mode} onChange={setMode} />
      <SettingsPopover />
    </header>
  )
}

export function AppBottomTabs() {
  const location = useLocation()
  return (
    <nav className="flex border-t border-divider bg-bg px-3 pb-5 pt-2 md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname.startsWith(item.to)
        return (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isActive ? 'page' : undefined}
            className={`flex min-h-[52px] flex-1 flex-col items-center justify-center gap-1 text-[11px] ${
              isActive ? 'text-accent' : 'text-text/60'
            }`}
          >
            <item.icon size={20} strokeWidth={2.75} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
