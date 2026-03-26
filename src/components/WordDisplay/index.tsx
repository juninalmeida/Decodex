import type { LetterData } from '../../types/game'
import LetterSlot from '../LetterSlot'
import './styles.css'

type WordDisplayProps = {
  guesses: LetterData[]
}

function WordDisplay({ guesses }: WordDisplayProps) {
  return (
    <section className="word-display">
      <span className="word-display__subtitle">Node Extraction Protocol</span>
      <h1 className="word-display__title">DECODE_STRING</h1>
      <div className="word-display__slots">
        {guesses.map((slot, index) => (
          <LetterSlot key={index} letter={slot.letter} status={slot.status} />
        ))}
      </div>
    </section>
  )
}

export default WordDisplay
