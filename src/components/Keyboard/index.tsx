import './styles.css'

function Keyboard() {
  return (
    <div className="keyboard">
      <div className="keyboard__row">
        <button className="keyboard__key">Q</button>
        <button className="keyboard__key">W</button>
        <button className="keyboard__key">E</button>
        <button className="keyboard__key">R</button>
        <button className="keyboard__key">T</button>
        <button className="keyboard__key">Y</button>
        <button className="keyboard__key">U</button>
        <button className="keyboard__key">I</button>
        <button className="keyboard__key">O</button>
        <button className="keyboard__key">P</button>
      </div>

      <div className="keyboard__row">
        <button className="keyboard__key">A</button>
        <button className="keyboard__key">S</button>
        <button className="keyboard__key">D</button>
        <button className="keyboard__key">F</button>
        <button className="keyboard__key">G</button>
        <button className="keyboard__key">H</button>
        <button className="keyboard__key">J</button>
        <button className="keyboard__key">K</button>
        <button className="keyboard__key">L</button>
      </div>

      <div className="keyboard__row">
        <button className="keyboard__key keyboard__key--wide">ENTER</button>
        <button className="keyboard__key">Z</button>
        <button className="keyboard__key">X</button>
        <button className="keyboard__key">C</button>
        <button className="keyboard__key">V</button>
        <button className="keyboard__key">B</button>
        <button className="keyboard__key">N</button>
        <button className="keyboard__key">M</button>
        <button className="keyboard__key keyboard__key--wide">⌫</button>
      </div>
    </div>
  )
}

export default Keyboard
