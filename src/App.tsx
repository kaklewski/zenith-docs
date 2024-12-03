import { useEffect } from 'react'
import './App.css'
import { auth } from './firebase-config'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import TextEditor from './components/TextEditor'

export default function App() {
  useEffect(() => {
    signInAnonymously(auth)
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(`User signed in: ${user.uid}`)
      }
    })
  }, [])

  return (
    <div className='app'>
      <header>
        <h1>Zenith Docs</h1>
      </header>
      <TextEditor />
    </div>
  )
}
