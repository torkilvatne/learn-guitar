import { Button } from '../../components/ui/button'

export interface MultipleChoiceOptionsProps<T> {
  options: T[]
  getKey: (option: T) => string
  getLabel: (option: T) => string
  correctOption: T
  wrongKeys: Set<string>
  solved: boolean
  onSelect: (option: T) => void
}

export function MultipleChoiceOptions<T>({
  options,
  getKey,
  getLabel,
  correctOption,
  wrongKeys,
  solved,
  onSelect,
}: MultipleChoiceOptionsProps<T>) {
  const correctKey = getKey(correctOption)

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const key = getKey(option)
        const isCorrect = key === correctKey
        const isWrong = wrongKeys.has(key)

        let variant: 'outline' | 'success' | 'destructive' = 'outline'
        if (solved && isCorrect) {
          variant = 'success'
        } else if (isWrong) {
          variant = 'destructive'
        }

        return (
          <Button
            key={key}
            type="button"
            variant={variant}
            className="justify-center py-6 text-lg"
            disabled={solved || isWrong}
            onClick={() => onSelect(option)}
          >
            {getLabel(option)}
          </Button>
        )
      })}
    </div>
  )
}
