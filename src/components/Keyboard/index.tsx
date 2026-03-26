import KeyButton from '../KeyButton'
import './styles.css'

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

function Keyboard() {
  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard__row" key={rowIndex}>
          {row.map((key) => (
            <KeyButton
              key={key}
              label={key}
              status="default"
              isWide={key === 'ENTER' || key === '⌫'}
              onClick={() => console.log(key)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
