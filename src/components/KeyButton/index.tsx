import type { KeyStatus } from '../../types/game'
import './styles.css'

type KeyButtonProps = {
  label: string
  status: KeyStatus
  isWide: boolean
  onClick: () => void
}

function KeyButton({ label, status, isWide, onClick }: KeyButtonProps) {
  return (
    <button
      className={`key-button key-button--${status} ${isWide ? 'key-button--wide' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default KeyButton
