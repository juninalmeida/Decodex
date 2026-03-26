import './styles.css'

type SidePanelProps = {
  attempts: number
  maxAttempts: number
  wordsDecoded: number
}

function SidePanel({ attempts, maxAttempts, wordsDecoded }: SidePanelProps) {
  const tempPercentage = Math.min(40 + wordsDecoded * 20, 100)

  return (
    <aside className="side-panel">
      <div className="side-panel__header">
        <span className="side-panel__title">System Diagnostics</span>
        <div className="side-panel__line" />
      </div>

      <div className="side-panel__stats">
        <div className="side-panel__stat">
          <span className="side-panel__label">Core Temp</span>
          <span className="side-panel__value side-panel__value--primary">
            {800 + wordsDecoded * 200}°C
          </span>
        </div>
        <div className="side-panel__bar">
          <div
            className="side-panel__bar-fill"
            style={{ width: `${tempPercentage}%` }}
          />
        </div>

        <div className="side-panel__stat">
          <span className="side-panel__label">Decryption Depth</span>
          <span className="side-panel__value side-panel__value--secondary">
            LEVEL {String(wordsDecoded + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="side-panel__stat">
          <span className="side-panel__label">Remaining Attempts</span>
          <div className="side-panel__boxes">
            {Array.from({ length: maxAttempts }, (_, index) => (
              <div
                key={index}
                className={`side-panel__box ${index < attempts ? 'side-panel__box--active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidePanel
