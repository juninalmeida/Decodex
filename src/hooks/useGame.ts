import { useState, useEffect } from 'react'
import type { LetterData, KeyStatus, GameStatus } from '../types/game'
import { getRandomWord } from '../data/words'

const WORD_LENGTH = 6
const MAX_ATTEMPTS = 3
const WORDS_TO_WIN = 3

function useGame() {
  const [wordData, setWordData] = useState(getRandomWord)
  const [guesses, setGuesses] = useState<LetterData[]>(createEmptyGuesses)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({})
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS)
  const [showHint, setShowHint] = useState(false)
  const [wordsDecoded, setWordsDecoded] = useState(0)
  const [usedWords, setUsedWords] = useState<string[]>([])

  function createEmptyGuesses(): LetterData[] {
    return Array.from({ length: WORD_LENGTH }, (_, index) => ({
      letter: '',
      status: index === 0 ? ('active' as const) : ('empty' as const),
    }))
  }

  function getNewUniqueWord(used: string[]) {
    let newWord = getRandomWord()
    let attempts = 0
    while (used.includes(newWord.word) && attempts < 50) {
      newWord = getRandomWord()
      attempts++
    }
    return newWord
  }

  function handleKeyPress(key: string) {
    if (gameStatus !== 'playing') return
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
    if (gameStatus !== 'playing') return
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
    if (gameStatus !== 'playing') return
    if (currentIndex < WORD_LENGTH) return

    const newGuesses = [...guesses]
    const newKeyStatuses = { ...keyStatuses }
    let allCorrect = true

    newGuesses.forEach((slot, index) => {
      const correctLetter = wordData.word[index]

      if (slot.letter === correctLetter) {
        newGuesses[index] = { ...slot, status: 'correct' }
        newKeyStatuses[slot.letter] = 'correct'
      } else if (wordData.word.includes(slot.letter)) {
        newGuesses[index] = { ...slot, status: 'misplaced' }
        if (newKeyStatuses[slot.letter] !== 'correct') {
          newKeyStatuses[slot.letter] = 'misplaced'
        }
        allCorrect = false
      } else {
        newGuesses[index] = { ...slot, status: 'wrong' }
        newKeyStatuses[slot.letter] = 'wrong'
        allCorrect = false
      }
    })

    setGuesses(newGuesses)
    setKeyStatuses(newKeyStatuses)

    if (allCorrect) {
      const newDecoded = wordsDecoded + 1
      const newUsed = [...usedWords, wordData.word]
      setWordsDecoded(newDecoded)
      setUsedWords(newUsed)

      if (newDecoded >= WORDS_TO_WIN) {
        setGameStatus('won')
        return
      }

      setTimeout(() => {
        const nextWord = getNewUniqueWord(newUsed)
        setWordData(nextWord)
        setGuesses(createEmptyGuesses())
        setCurrentIndex(0)
        setKeyStatuses({})
        setShowHint(false)
      }, 1500)

      return
    }

    const newAttempts = attempts - 1
    setAttempts(newAttempts)

    if (newAttempts <= 0) {
      setGameStatus('lost')
      return
    }

    setTimeout(() => {
      setGuesses(createEmptyGuesses())
      setCurrentIndex(0)
    }, 1500)
  }

  function handleNewGame() {
    const firstWord = getRandomWord()
    setWordData(firstWord)
    setGuesses(createEmptyGuesses())
    setCurrentIndex(0)
    setKeyStatuses({})
    setGameStatus('playing')
    setAttempts(MAX_ATTEMPTS)
    setShowHint(false)
    setWordsDecoded(0)
    setUsedWords([firstWord.word])
  }

  function handleShowHint() {
    setShowHint(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (gameStatus !== 'playing') return

      const key = event.key.toUpperCase()

      if (key === 'ENTER') {
        handleEnter()
      } else if (key === 'BACKSPACE') {
        handleBackspace()
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return {
    guesses,
    currentIndex,
    keyStatuses,
    gameStatus,
    attempts,
    hint: wordData.hint,
    showHint,
    secretWord: wordData.word,
    wordsDecoded,
    wordsToWin: WORDS_TO_WIN,
    handleKeyPress,
    handleBackspace,
    handleEnter,
    handleNewGame,
    handleShowHint,
  }
}

export default useGame
