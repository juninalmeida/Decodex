import LetterSlot from '../LetterSlot'
import './styles.css'

function WordDisplay() {
  return (
    <section className="word-display">
      <span className="word-display__subtitle">Node Extraction Protocol</span>
      <h1 className="word-display__title">DECODE_STRING</h1>
      <div className="word-display__slots">
        <LetterSlot letter="V" status="correct" />
        <LetterSlot letter="O" status="correct" />
        <LetterSlot letter="" status="active" />
        <LetterSlot letter="" status="empty" />
        <LetterSlot letter="" status="empty" />
        <LetterSlot letter="" status="empty" />
      </div>
    </section>
  )
}

export default WordDisplay
