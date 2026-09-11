import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group'
import { useTheme } from '../state/theme'
import { THEMES, type ThemeId } from '../theme/themes'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  return (
    <ToggleGroup
      type="single"
      spacing={0}
      value={theme}
      onValueChange={(value) => {
        if (value) {
          setTheme(value as ThemeId)
        }
      }}
      className="border border-border p-1"
    >
      {THEMES.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
