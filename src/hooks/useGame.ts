import { useState, useEffect, useRef } from 'react'
import type { LetterData, KeyStatus, GameStatus } from '../types/game'
import { getRandomWord } from '../data/words'
import useLocalStorage from './useLocalStorage'

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
  const [isShaking, setIsShaking] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [streak, setStreak] = useLocalStorage<number>('decodex-streak', 0)
  const [bestStreak, setBestStreak] = useLocalStorage<number>('decodex-best-streak', 0)

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
    if (isRevealing) return
    if (currentIndex >= WORD_LENGTH) return

    const newGuesses = [...guesses]

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
    if (isRevealing) return
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
    if (isRevealing) return
    if (currentIndex < WORD_LENGTH) return

    setIsRevealing(true)

    const revealDelay = 200
    const totalRevealTime = WORD_LENGTH * revealDelay

    const results: Array<{ status: 'correct' | 'wrong' | 'misplaced'; letter: string }> = []
    let allCorrect = true

    const letterCounts: Record<string, number> = {}
    for (const char of wordData.word) {
      letterCounts[char] = (letterCounts[char] || 0) + 1
    }

    guesses.forEach((slot, index) => {
      if (slot.letter === wordData.word[index]) {
        results.push({ status: 'correct', letter: slot.letter })
        letterCounts[slot.letter]--
      } else {
        results.push({ status: 'wrong', letter: slot.letter })
      }
    })

    results.forEach((result, index) => {
      if (result.status !== 'correct') {
        if (letterCounts[result.letter] > 0) {
          results[index] = { status: 'misplaced', letter: result.letter }
          letterCounts[result.letter]--
        }
        allCorrect = false
      }
    })

    results.forEach((result, index) => {
      setTimeout(() => {
        setGuesses((prev) => {
          const updated = [...prev]
          updated[index] = { letter: result.letter, status: result.status }
          return updated
        })

        setKeyStatuses((prev) => {
          const updated = { ...prev }
          if (result.status === 'correct') {
            updated[result.letter] = 'correct'
          } else if (result.status === 'misplaced' && updated[result.letter] !== 'correct') {
            updated[result.letter] = 'misplaced'
          } else if (result.status === 'wrong' && !updated[result.letter]) {
            updated[result.letter] = 'wrong'
          }
          return updated
        })
      }, index * revealDelay)
    })

    setTimeout(() => {
      if (allCorrect) {
        const newDecoded = wordsDecoded + 1
        const newUsed = [...usedWords, wordData.word]
        setWordsDecoded(newDecoded)
        setUsedWords(newUsed)

        if (newDecoded >= WORDS_TO_WIN) {
          const newStreak = streak + 1
          setStreak(newStreak)
          if (newStreak > bestStreak) {
            setBestStreak(newStreak)
          }
          setIsRevealing(false)
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
          setIsRevealing(false)
        }, 1000)

        return
      }

      const newAttempts = attempts - 1
      setAttempts(newAttempts)

      if (newAttempts <= 0) {
        setStreak(0)
        setIsRevealing(false)
        setGameStatus('lost')
        return
      }

      setIsShaking(true)

      setTimeout(() => {
        setIsShaking(false)
        setGuesses(createEmptyGuesses())
        setCurrentIndex(0)
        setIsRevealing(false)
      }, 1500)
    }, totalRevealTime + 300)
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

  const handlersRef = useRef({ handleEnter, handleBackspace, handleKeyPress })

  useEffect(() => {
    handlersRef.current = { handleEnter, handleBackspace, handleKeyPress }
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toUpperCase()

      if (key === 'ENTER') {
        handlersRef.current.handleEnter()
      } else if (key === 'BACKSPACE') {
        handlersRef.current.handleBackspace()
      } else if (/^[A-Z]$/.test(key)) {
        handlersRef.current.handleKeyPress(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const revealedWord = gameStatus === 'lost' ? wordData.word : null

  return {
    guesses,
    currentIndex,
    keyStatuses,
    gameStatus,
    attempts,
    hint: wordData.hint,
    showHint,
    revealedWord,
    wordsDecoded,
    wordsToWin: WORDS_TO_WIN,
    isShaking,
    streak,
    bestStreak,
    handleKeyPress,
    handleBackspace,
    handleEnter,
    handleNewGame,
    handleShowHint,
  }
}

export default useGame
