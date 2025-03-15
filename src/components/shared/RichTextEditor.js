import React from 'react';
import {
  Editor,
  EditorTools
} from "@progress/kendo-react-editor";


const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
} = EditorTools;

const constraints = {
  minWidth: 555,
  minHeight: 400
};
const resize = {
  // resize: 'both'
};

// This component will be used with the Field component from KendoReact Form
const RichTextEditor = (fieldProps) => {
  const { value, onChange, validationMessage, visited } = fieldProps;

  
  const tools = [
    [Bold, Italic, Underline, Strikethrough],
    [Undo, Redo],
    [AlignLeft, AlignCenter, AlignRight],
    [Indent, Outdent],
    [OrderedList, UnorderedList],
    [Link, Unlink, InsertImage, ViewHtml]
  ];

  const handleChange = (event) => {
    if (onChange) {
      // Get the HTML content from the editor
      const htmlContent = event.html;
      // Update the form field value
      onChange({
        value: htmlContent,
      });
    }
  };

  return(
    <div className="editor-wrapper">
      <Editor 
        onChange={handleChange}
        resizable={true}
        style={{
          height: 360,
          ...constraints,
          ...resize
        }} 
        tools={tools}
      />
    </div>
  )
  
};

export default RichTextEditor;
