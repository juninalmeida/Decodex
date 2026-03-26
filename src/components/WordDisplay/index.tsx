import type { LetterData } from '../../types/game'
import LetterSlot from '../LetterSlot'
import './styles.css'

type WordDisplayProps = {
  guesses: LetterData[]
  isShaking: boolean
}

function WordDisplay({ guesses, isShaking }: WordDisplayProps) {
  return (
    <section className="word-display">
      <span className="word-display__subtitle">Node Extraction Protocol</span>
      <h1 className="word-display__title">DECODE_STRING</h1>
      <div className={`word-display__slots ${isShaking ? 'word-display__slots--shake' : ''}`}>
        {guesses.map((slot, index) => (
          <LetterSlot key={index} letter={slot.letter} status={slot.status} />
        ))}
      </div>
    </section>
  )
}

export default WordDisplay
