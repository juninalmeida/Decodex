type LetterStatus =
  | 'empty'
  | 'active'
  | 'filled'
  | 'correct'
  | 'wrong'
  | 'misplaced'

type LetterData = {
  letter: string
  status: LetterStatus
}

type KeyStatus = 'default' | 'correct' | 'wrong' | 'misplaced'

type GameStatus = 'playing' | 'won' | 'lost'

export type { LetterStatus, LetterData, KeyStatus, GameStatus }
