import { useState } from 'react'
import { useEffect } from 'react'

import './App.css'

function App() {
  const [fields, setFields] = useState([])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'findPasswordFields' }, (response) => {
        setFields(response)
      })
    })
  }, [])

  return (
    <>
      <h1>WokVault</h1>
      <div className="card">
        <button onClick={() => chrome.runtime.sendMessage({ action: 'findPasswordFields' })}>
          Find Password Fields
        </button>
        <p>Found fields: {fields.length}</p>
      </div>
    </>
  )
}

export default App
