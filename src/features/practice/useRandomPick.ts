import { useCallback, useState } from 'react'
import { pickRandom, pickRandomExcluding } from '../../domain/random'

export function useRandomPick<T>(items: T[]): [T, () => void] {
  const [current, setCurrent] = useState<T>(() => pickRandom(items))

  const next = useCallback(() => {
    setCurrent((previous) => pickRandomExcluding(items, previous))
  }, [items])

  return [current, next]
}
