import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config'

export default function TextEditor() {
  const quillRef = useRef<any>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const documentRef = doc(db, 'documents', 'sample-doc')
  const saveContent = () => {
    if (quillRef.current) {
      const content = quillRef.current.getEditor().getContents()
      console.log(`Saving content to db: ${content}`)

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log('Content saved'))
        .catch(console.error)
    }
  }

  useEffect(() => {
    if (quillRef.current) {
      // Load initial content from the Firestore DB

      // Listen to Firestore for any updates and update locally in real time

      // Listen for Local text changes and save it to Firestore
      const editor = quillRef.current.getEditor()
      editor.on('text-change', () => {
        setIsEditing(true)
        saveContent()

        setTimeout(() => setIsEditing(false), 5000)
      })
    }
  }, [])

  return (
    <div className='zenith-docs-editor'>
      <ReactQuill ref={quillRef} />
    </div>
  )
}
