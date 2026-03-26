import { useState } from 'react'
import './App.css'
import Terminal from './pages/Terminal'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      {!isLoading && <Terminal />}
    </>
  )
}

export default App
