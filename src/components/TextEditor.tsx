import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import { setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'
import 'react-quill/dist/quill.snow.css'
import { throttle } from 'lodash'

export default function TextEditor() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const quillRef = useRef<any>(null)
  const isLocalChange = useRef<boolean>(false)
  const documentRef = doc(db, 'documents', 'sample-doc')

  const saveContent = throttle(() => {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents()
      console.log(`Saving content to db: `, content)

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log('Content saved'))
        .catch(console.error)

      isLocalChange.current = false
    }
  }, 1000)

  // Define toolbar and modules with history and handlers
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  }

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor()

      // Load initial content from Firestore
      getDoc(documentRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const savedContent = docSnap.data().content
            if (savedContent && Array.isArray(savedContent)) {
              editor.setContents(savedContent, 'silent')
            }
          } else {
            console.log('No document found. Starting with an empty editor.')
          }
        })
        .catch(console.error)

      // Listen for Firestore updates
      const unsubscribe = onSnapshot(documentRef, snapshot => {
        if (snapshot.exists()) {
          const newContent = snapshot.data().content
          if (!isEditing) {
            const currentCursorPosition = editor.getSelection()?.index || 0
            editor.setContents(newContent, 'silent')
            editor.setSelection(currentCursorPosition, 0, 'silent')
          }
        }
      })

      // Listen for local changes
      editor.on('text-change', (_delta: any, _oldDelta: any, source: any) => {
        if (source === 'user') {
          isLocalChange.current = true
          setIsEditing(true)
          saveContent()

          setTimeout(() => setIsEditing(false), 5000)
        }
      })

      return () => {
        unsubscribe()
        editor.off('text-change')
      }
    }
  }, [])

  return <ReactQuill modules={modules} ref={quillRef} />
}
