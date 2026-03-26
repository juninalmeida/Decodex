import './styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WordDisplay from '../../components/WordDisplay'
import Keyboard from '../../components/Keyboard'
import GameStatus from '../../components/GameStatus'
import useGame from '../../hooks/useGame'

function Terminal() {
  const {
    guesses,
    keyStatuses,
    gameStatus,
    attempts,
    hint,
    showHint,
    secretWord,
    wordsDecoded,
    wordsToWin,
    handleKeyPress,
    handleBackspace,
    handleEnter,
    handleNewGame,
    handleShowHint,
  } = useGame()

  return (
    <div className="terminal">
      <Header />
      <main className="terminal__content">
        <WordDisplay guesses={guesses} />
        <GameStatus
          gameStatus={gameStatus}
          attempts={attempts}
          maxAttempts={3}
          hint={hint}
          showHint={showHint}
          secretWord={secretWord}
          wordsDecoded={wordsDecoded}
          wordsToWin={wordsToWin}
          onNewGame={handleNewGame}
          onShowHint={handleShowHint}
        />
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
