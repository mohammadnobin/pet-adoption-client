// // components/TextEditor.jsx
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import { FaBold, FaItalic, FaUnderline, FaLink } from 'react-icons/fa'

// export default function TextEditor() {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Link,
//     ],
//     content: '<p>Write Something Awesome...</p>',
//   })

//   if (!editor) return null

//   return (
//     <div className="bg-[#1a1a2e] text-white p-4 rounded-lg w-full max-w-2xl mx-auto">
//       <div className="flex gap-2 mb-2">
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className="hover:text-blue-400"><FaBold /></button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className="hover:text-blue-400"><FaItalic /></button>
//         <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="hover:text-blue-400"><FaUnderline /></button>
//         <button
//           onClick={() => {
//             const url = window.prompt('Enter URL');
//             if (url) {
//               editor.chain().focus().setLink({ href: url }).run()
//             }
//           }}
//           className="hover:text-blue-400"
//         >
//           <FaLink />
//         </button>
//       </div>

//       <div className="bg-[#0f0f1a] p-3 rounded min-h-[120px]">
//         <EditorContent editor={editor} />
//       </div>

//       <button
//         onClick={() => console.log(editor.getHTML())}
//         className="mt-4 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
//         disabled={editor.getText().trim().length === 0}
//       >
//         Save Note
//       </button>
//     </div>
//   )
// }



// components/TextEditor.jsx
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Link from '@tiptap/extension-link'
// import Underline from '@tiptap/extension-underline'
// import TextAlign from '@tiptap/extension-text-align'

// import {
//   FaBold, FaItalic, FaUnderline, FaLink, FaListUl, FaListOl,
//   FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
//   FaUndo, FaRedo, FaQuoteRight, FaHeading, FaMinus
// } from 'react-icons/fa'

// export default function TextEditor() {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//       }),
//       Underline,
//       Link,
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//     ],
//     content: '<p>Write Something Awesome...</p>',
//   })

//   if (!editor) return null

//   return (
//     <div className="bg-[#1a1a2e] text-white p-4 rounded-lg w-full max-w-2xl mx-auto">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-3 mb-4">
//         {/* Formatting */}
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className="hover:text-blue-400"><FaBold /></button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className="hover:text-blue-400"><FaItalic /></button>
//         <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="hover:text-blue-400"><FaUnderline /></button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="hover:text-blue-400"><FaHeading /></button>
//         <button
//           onClick={() => {
//             const url = window.prompt('Enter URL')
//             if (url) {
//               editor.chain().focus().setLink({ href: url }).run()
//             }
//           }}
//           className="hover:text-blue-400"
//         >
//           <FaLink />
//         </button>

//         {/* Lists */}
//         <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="hover:text-blue-400"><FaListUl /></button>
//         <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="hover:text-blue-400"><FaListOl /></button>

//         {/* Alignment */}
//         <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="hover:text-blue-400"><FaAlignLeft /></button>
//         <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="hover:text-blue-400"><FaAlignCenter /></button>
//         <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="hover:text-blue-400"><FaAlignRight /></button>
//         <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className="hover:text-blue-400"><FaAlignJustify /></button>

//         {/* Others */}
//         <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="hover:text-blue-400"><FaQuoteRight /></button>
//         <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="hover:text-blue-400"><FaMinus /></button>
//         <button onClick={() => editor.chain().focus().undo().run()} className="hover:text-blue-400"><FaUndo /></button>
//         <button onClick={() => editor.chain().focus().redo().run()} className="hover:text-blue-400"><FaRedo /></button>
//       </div>

//       {/* Editor Area */}
//       <div className="bg-[#0f0f1a] p-3 rounded min-h-[150px]">
//         <EditorContent editor={editor} />
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={() => console.log(editor.getHTML())}
//         className="mt-4 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
//         disabled={editor.getText().trim().length === 0}
//       >
//         Save Note
//       </button>
//     </div>
//   )
// }



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
    <div className=" text-secondary p-4 rounded-lg">
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
      <div className="w-full border-2 border-secondary/15 p-2  rounded min-h-[150px]">
        <EditorContent editor={editor} className="prose text-secondary min-h-[150px] focus:outline-none" />
      </div>
    </div>
  )
}
