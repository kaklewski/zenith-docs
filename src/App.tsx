import { useEffect } from 'react'
import './App.scss'
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

  return <TextEditor />
}
