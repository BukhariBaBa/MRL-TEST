import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
const TextEditor = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

function _Editor({onchange, editorData}) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
 
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const formats = [
    'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
    ]

  return (
    <div>
        <TextEditor
          value={editorData}
          modules={modules}
          formats={formats}
          onChange={(editor) => {onchange(editor)}}
          theme="snow"
        />
    </div>
  );
}

export default _Editor;
