import type { LetterData } from '../../types/game'
import './styles.css'

function LetterSlot({ letter, status }: LetterData) {
  return (
    <div className={`letter-slot letter-slot--${status}`}>
      <span>{letter}</span>
      <div className="letter-slot__bar"></div>
    </div>
  )
}

export default LetterSlot
