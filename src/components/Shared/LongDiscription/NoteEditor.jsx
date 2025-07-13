import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

// Icons
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaIndent,
  FaOutdent,
  FaLink,
  FaCode,
} from 'react-icons/fa';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const iconClass = (isActive) =>
    isActive ? 'text-white' : 'text-gray-400 hover:text-white';

  return (
    <div className="flex flex-wrap gap-4 text-lg mt-4">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={iconClass(editor.isActive('bold'))}>
        <FaBold />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={iconClass(editor.isActive('italic'))}>
        <FaItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={iconClass(editor.isActive('underline'))}>
        <FaUnderline />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={iconClass(editor.isActive('strike'))}>
        <FaStrikethrough />
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={iconClass(editor.isActive('bulletList'))}>
        <FaListUl />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={iconClass(editor.isActive('orderedList'))}>
        <FaListOl />
      </button>
      <button onClick={() => editor.chain().focus().sinkListItem().run()} className="text-gray-400 hover:text-white">
        <FaIndent />
      </button>
      <button onClick={() => editor.chain().focus().liftListItem().run()} className="text-gray-400 hover:text-white">
        <FaOutdent />
      </button>

      <button
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
        className="text-gray-400 hover:text-white"
      >
        <FaLink />
      </button>

      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={iconClass(editor.isActive('codeBlock'))}>
        <FaCode />
      </button>
    </div>
  );
};

const NoteEditor = () => {
  const [isEmpty, setIsEmpty] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit, // No need to disable bulletList or orderedList
      Underline,
      Link,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-[8rem] outline-none text-white placeholder-gray-400 prose prose-invert',
      },
    },
    onUpdate: ({ editor }) => {
      setIsEmpty(editor.getText().trim().length === 0);
    },
  });

  return (
    <div className="bg-[#1E1E2A] p-4 rounded-md w-full max-w-xl mx-auto">
      <EditorContent editor={editor} />
      <MenuBar editor={editor} />
      <div className="flex justify-end mt-4">
        <button
          disabled={isEmpty}
          className={`px-4 py-1 rounded ${
            isEmpty
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;