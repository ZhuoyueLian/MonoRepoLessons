import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('Welcome!')

  const handleNameSubmit = () => {
    if (name.trim()) {
      setMessage(`Hello, ${name}! Welcome to CS 5500!`)
    }
  }

  const resetAll = () => {
    setName('')
    setMessage('Welcome!')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zhuoyue's React Vite Project</h1>
        <h2>CS 5500 - Foundations of Software Engineering</h2>
        
        <div className="interactive-section">
          <h3>{message}</h3>
          
          <div className="name-input-section">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
            <button onClick={handleNameSubmit} className="submit-btn">
              Submit Name
            </button>
          </div>

          <button onClick={resetAll} className="reset-btn">
            Reset Everything
          </button>
        </div>
      </header>
    </div>
  )
}

export default App