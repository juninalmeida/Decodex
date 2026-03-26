import type { GameStatus as GameStatusType } from '../../types/game'
import './styles.css'

type GameStatusProps = {
  gameStatus: GameStatusType
  attempts: number
  maxAttempts: number
  hint: string
  showHint: boolean
  secretWord: string
  wordsDecoded: number
  wordsToWin: number
  onNewGame: () => void
  onShowHint: () => void
}

function GameStatus({
  gameStatus,
  attempts,
  maxAttempts,
  hint,
  showHint,
  secretWord,
  wordsDecoded,
  wordsToWin,
  onNewGame,
  onShowHint,
}: GameStatusProps) {
  return (
    <div className="game-status">
      {gameStatus === 'playing' && (
        <div className="game-status__playing">
          <div className="game-status__progress">
            <span className="game-status__label">Decodificadas</span>
            <div className="game-status__boxes">
              {Array.from({ length: wordsToWin }, (_, index) => (
                <div
                  key={index}
                  className={`game-status__box ${index < wordsDecoded ? 'game-status__box--decoded' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="game-status__divider" />

          <div className="game-status__attempts">
            <span className="game-status__label">Tentativas</span>
            <div className="game-status__boxes">
              {Array.from({ length: maxAttempts }, (_, index) => (
                <div
                  key={index}
                  className={`game-status__box ${index < attempts ? 'game-status__box--active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="game-status__divider" />

          {!showHint && (
            <button className="game-status__hint-btn" onClick={onShowHint}>
              DICA
            </button>
          )}

          {showHint && (
            <p className="game-status__hint">
              <span>DICA:</span> {hint}
            </p>
          )}
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="game-status__result game-status__result--won">
          <span className="game-status__icon">✓</span>
          <h2>DECODEX COMPLETO</h2>
          <p>{wordsToWin} palavras decodificadas com sucesso</p>
          <button className="game-status__new-game" onClick={onNewGame}>
            NOVA TRANSMISSÃO
          </button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-status__result game-status__result--lost">
          <span className="game-status__icon">✕</span>
          <h2>SINAL PERDIDO</h2>
          <p>
            A palavra era: <strong>{secretWord}</strong>
          </p>
          <button className="game-status__new-game" onClick={onNewGame}>
            NOVA TRANSMISSÃO
          </button>
        </div>
      )}
    </div>
  )
}

export default GameStatus
