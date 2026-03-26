import { useState } from 'react'
import type { LetterData, KeyStatus } from '../types/game'

const WORD_LENGTH = 6
const SECRET_WORD = 'VULCAN'

function useGame() {
  const [guesses, setGuesses] = useState<LetterData[]>(
    Array.from({ length: WORD_LENGTH }, () => ({
      letter: '',
      status: 'empty' as const,
    })),
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({})

  function handleKeyPress(key: string) {
    if (currentIndex >= WORD_LENGTH) return

    const newGuesses = [...guesses]

    if (currentIndex > 0) {
      newGuesses[currentIndex - 1] = {
        ...newGuesses[currentIndex - 1],
        status: 'empty',
      }
    }

    newGuesses[currentIndex] = { letter: key, status: 'filled' }

    if (currentIndex + 1 < WORD_LENGTH) {
      newGuesses[currentIndex + 1] = {
        ...newGuesses[currentIndex + 1],
        status: 'active',
      }
    }

    setGuesses(newGuesses)
    setCurrentIndex(currentIndex + 1)
  }

  function handleBackspace() {
    if (currentIndex <= 0) return

    const newIndex = currentIndex - 1
    const newGuesses = [...guesses]
    newGuesses[newIndex] = { letter: '', status: 'active' }

    if (currentIndex < WORD_LENGTH) {
      newGuesses[currentIndex] = { letter: '', status: 'empty' }
    }

    setGuesses(newGuesses)
    setCurrentIndex(newIndex)
  }

  function handleEnter() {
    if (currentIndex < WORD_LENGTH) return

    const newGuesses = [...guesses]
    const newKeyStatuses = { ...keyStatuses }

    newGuesses.forEach((slot, index) => {
      const correctLetter = SECRET_WORD[index]

      if (slot.letter === correctLetter) {
        newGuesses[index] = { ...slot, status: 'correct' }
        newKeyStatuses[slot.letter] = 'correct'
      } else if (SECRET_WORD.includes(slot.letter)) {
        newGuesses[index] = { ...slot, status: 'misplaced' }
        if (newKeyStatuses[slot.letter] !== 'correct') {
          newKeyStatuses[slot.letter] = 'misplaced'
        }
      } else {
        newGuesses[index] = { ...slot, status: 'wrong' }
        newKeyStatuses[slot.letter] = 'wrong'
      }
    })

    setGuesses(newGuesses)
    setKeyStatuses(newKeyStatuses)
  }

  return {
    guesses,
    currentIndex,
    keyStatuses,
    handleKeyPress,
    handleBackspace,
    handleEnter,
  }
}

export default useGame
