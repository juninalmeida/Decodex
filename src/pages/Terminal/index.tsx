import './styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WordDisplay from '../../components/WordDisplay'
import Keyboard from '../../components/Keyboard'

function Terminal() {
  return (
    <div className="terminal">
      <Header />
      <main className="terminal__content">
        <WordDisplay />
        <Keyboard />
      </main>
      <Footer />
    </div>
  )
}

export default Terminal
