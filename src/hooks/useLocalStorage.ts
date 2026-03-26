import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      console.warn(`Erro ao salvar "${key}" no localStorage`)
    }
  }, [key, storedValue])

  function reset() {
    setStoredValue(initialValue)
    window.localStorage.removeItem(key)
  }

  return [storedValue, setStoredValue, reset]
}

export default useLocalStorage
