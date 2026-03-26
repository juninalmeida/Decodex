import { SettingsIcon, UserIcon } from '../icons'
import './styles.css'

function Header() {
  return (
    <nav className="header">
      <div className="header__logo">
        <span>DECODEX</span>
      </div>

      <div className="header__nav">
        <a href="#">STATIONS</a>
        <a href="#" className="active">
          TERMINAL
        </a>
        <a href="#">DECRYPT</a>
      </div>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="Settings">
          <SettingsIcon />
        </button>
        <button className="header__icon-btn" aria-label="Profile">
          <UserIcon />
        </button>
      </div>
    </nav>
  )
}

export default Header
