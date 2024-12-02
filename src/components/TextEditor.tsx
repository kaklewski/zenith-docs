import { useRef } from 'react'
import ReactQuill from 'react-quill'

export default function TextEditor() {
  const quillRef = useRef<any>(null)

  return (
    <div className='zenith-docs-editor'>
      <ReactQuill ref={quillRef} />
    </div>
  )
}
