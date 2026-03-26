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
        <button>⚙</button>
        <button>👤</button>
      </div>
    </nav>
  )
}
export default Header
