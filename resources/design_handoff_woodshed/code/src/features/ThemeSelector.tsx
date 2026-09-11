import { SegmentedControl } from '../components/SegmentedControl'
import { useTheme } from '../state/theme'
import { THEMES, type ThemeId } from '../theme/themes'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  return (
    <SegmentedControl
      options={THEMES.map((option) => ({ value: option.value, label: option.label }))}
      value={theme}
      onChange={(value) => setTheme(value as ThemeId)}
      ariaLabel="Theme"
      size="sm"
    />
  )
}
