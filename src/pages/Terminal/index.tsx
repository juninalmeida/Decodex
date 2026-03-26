import './styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WordDisplay from '../../components/WordDisplay'
import Keyboard from '../../components/Keyboard'
import useGame from '../../hooks/useGame'

function Terminal() {
  const { guesses, keyStatuses, handleKeyPress, handleBackspace, handleEnter } =
    useGame()

  return (
    <div className="terminal">
      <Header />
      <main className="terminal__content">
        <WordDisplay guesses={guesses} />
        <Keyboard
          keyStatuses={keyStatuses}
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Terminal
