import { ModeToggle } from '../components/ModeToggle'
import { SidebarTrigger } from '../components/ui/sidebar'
import { useSettings } from '../state/settings'
import { SettingsPopover } from './SettingsPopover'

export function TopBar() {
  const { mode, setMode } = useSettings()

  return (
    <div className="flex items-center gap-3 border-b border-border bg-surface px-3 py-2">
      <SidebarTrigger />
      <ModeToggle mode={mode} onChange={setMode} />
      <div className="ml-auto">
        <SettingsPopover />
      </div>
    </div>
  )
}
