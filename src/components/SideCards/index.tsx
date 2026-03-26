import './styles.css'

type SideCardsProps = {
  wordsDecoded: number
  showHint: boolean
  hint: string
  onShowHint: () => void
}

function SideCards({
  wordsDecoded,
  showHint,
  hint,
  onShowHint,
}: SideCardsProps) {
  return (
    <aside className="side-cards">
      <div className="side-cards__card side-cards__card--streak">
        <span className="side-cards__icon">🔥</span>
        <div className="side-cards__info">
          <span className="side-cards__label">Encryption Streak</span>
          <span className="side-cards__value">
            {String(wordsDecoded).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        className="side-cards__card side-cards__card--hint"
        onClick={!showHint ? onShowHint : undefined}
      >
        <span className="side-cards__icon">💡</span>
        <div className="side-cards__info">
          {!showHint && (
            <>
              <span className="side-cards__label">Dica Disponivel</span>
              <span className="side-cards__action">REVELAR</span>
            </>
          )}
          {showHint && (
            <>
              <span className="side-cards__label">Dica</span>
              <span className="side-cards__hint-text">{hint}</span>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default SideCards
