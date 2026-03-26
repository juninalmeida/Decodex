import type { KeyStatus } from '../../types/game'
import KeyButton from '../KeyButton'
import './styles.css'

type KeyboardProps = {
  keyStatuses: Record<string, KeyStatus>
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onEnter: () => void
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

function Keyboard({
  keyStatuses,
  onKeyPress,
  onBackspace,
  onEnter,
}: KeyboardProps) {
  function handleClick(key: string) {
    if (key === 'ENTER') return onEnter()
    if (key === '⌫') return onBackspace()
    return onKeyPress(key)
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard__row" key={rowIndex}>
          {row.map((key) => (
            <KeyButton
              key={key}
              label={key}
              status={keyStatuses[key] || 'default'}
              isWide={key === 'ENTER' || key === '⌫'}
              onClick={() => handleClick(key)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
