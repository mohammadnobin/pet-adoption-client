// tiptap editor page 
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import 'prosemirror-view/style/prosemirror.css'

import {
  FaBold, FaItalic, FaUnderline, FaLink, FaListUl, FaListOl,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaUndo, FaRedo, FaQuoteRight, FaHeading, FaMinus
} from 'react-icons/fa'
import { useEffect } from 'react'

export default function TextEditor({ value, onChange }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: false,  
        underline: false,  
      }),
      Underline,  
      Link,       
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value])

  if (!editor) return null

  return (
    <div className=" text-secondary dark:text-white p-4 rounded-lg">
      <div className="flex flex-wrap gap-3 mb-4">
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleBold().run()}><FaBold /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleItalic().run()}><FaItalic /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleUnderline().run()}><FaUnderline /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><FaHeading /></button>
        <button type='button' className='cursor-pointer' onClick={() => {
          const url = window.prompt('Enter URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}><FaLink /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleBulletList().run()}><FaListUl /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleOrderedList().run()}><FaListOl /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().setTextAlign('left').run()}><FaAlignLeft /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().setTextAlign('center').run()}><FaAlignCenter /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().setTextAlign('right').run()}><FaAlignRight /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().setTextAlign('justify').run()}><FaAlignJustify /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().toggleBlockquote().run()}><FaQuoteRight /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().setHorizontalRule().run()}><FaMinus /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().undo().run()}><FaUndo /></button>
        <button type='button' className='cursor-pointer' onClick={() => editor.chain().focus().redo().run()}><FaRedo /></button>
      </div>
      <div className="w-full border-2 dark:border-white border-secondary/15 p-2  rounded min-h-[150px]">
        <EditorContent editor={editor} className="prose text-secondary min-h-[150px] focus:outline-none" />
      </div>
    </div>
  )
}
