import { useState, useEffect } from 'react'
import './styles.css'

type LoadingScreenProps = {
  onFinish: () => void
}

function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2200)

    const finishTimer = setTimeout(() => {
      onFinish()
    }, 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div className={`loading ${fadeOut ? 'loading--fade-out' : ''}`}>
      <div className="loading__glow" />

      <main className="loading__content">
        <div className="loading__letters">
          <span className="loading__char loading__char--1">A</span>
          <span className="loading__char loading__char--2">B</span>
          <span className="loading__char loading__char--3">X</span>
          <span className="loading__char loading__char--4">Z</span>
          <span className="loading__char loading__char--5">0</span>
          <span className="loading__char loading__char--6">1</span>
        </div>

        <div className="loading__scanner">
          <div className="loading__lens">
            <div className="loading__crosshair-h" />
            <div className="loading__crosshair-v" />
          </div>
          <div className="loading__handle" />
        </div>

        <div className="loading__brand">
          <h1 className="loading__title">DECODEX</h1>
          <p className="loading__subtitle">Neural Decryption Protocol v4.0.2</p>
        </div>

        <div className="loading__progress-section">
          <div className="loading__progress-info">
            <span className="loading__progress-label">
              <span className="loading__pulse-dot" />
              SCANNING_ENCRYPTION...
            </span>
            <span className="loading__progress-value">1000%_BURST_MODE</span>
          </div>

          <div className="loading__progress-track">
            <div className="loading__progress-fill" />
          </div>

          <div className="loading__readout">
            <div className="loading__readout-card">
              <span className="loading__readout-label">Packet Hash</span>
              <span className="loading__readout-value">
                0x7F2B...E921_ALPHA
              </span>
            </div>
            <div className="loading__readout-card">
              <span className="loading__readout-label">Signal Strength</span>
              <span className="loading__readout-value">409.22 TH/s</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoadingScreen
