import React, { useRef, useState } from 'react';
import { RichTextToolbar } from './RichTextToolbar';
import { ImageInsertModal } from './ImageInsertModal';
import { LinkInsertModal } from './LinkInsertModal';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your content here...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [isSourceView, setIsSourceView] = useState(false);

  const handleFormatText = (command: string, value?: string) => {
    if (command === 'viewSource') {
      setIsSourceView(!isSourceView);
      return;
    }

    if (command === 'preview') {
      setIsSourceView(false);
      return;
    }

    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      
      // Update the content after formatting
      setTimeout(() => {
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML);
        }
      }, 10);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current && !isSourceView) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleInsertImage = (url: string, alt: string, width?: string, height?: string) => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      if (width) img.style.width = width + 'px';
      if (height) img.style.height = height + 'px';
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(img);
        range.collapse(false);
      } else {
        editorRef.current.appendChild(img);
      }
      
      onChange(editorRef.current.innerHTML);
    }
    setShowImageModal(false);
  };

  const handleInsertLink = (url: string, text: string) => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        document.execCommand('createLink', false, url);
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = text;
        link.target = '_blank';
        
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(link);
          range.collapse(false);
        } else {
          editorRef.current.appendChild(link);
        }
      }
      
      onChange(editorRef.current.innerHTML);
    }
    setShowLinkModal(false);
  };

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <RichTextToolbar
        onFormatText={handleFormatText}
        onInsertImage={() => setShowImageModal(true)}
        onInsertLink={() => setShowLinkModal(true)}
      />
      
      {isSourceView ? (
        <textarea
          value={value}
          onChange={handleSourceChange}
          className="w-full h-64 p-4 font-mono text-sm border-0 resize-none focus:outline-none"
          placeholder="HTML source code..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-64 p-4 focus:outline-none"
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: value }}
          style={{ minHeight: '256px' }}
          data-placeholder={placeholder}
        />
      )}

      {showImageModal && (
        <ImageInsertModal
          onInsert={handleInsertImage}
          onClose={() => setShowImageModal(false)}
        />
      )}

      {showLinkModal && (
        <LinkInsertModal
          onInsert={handleInsertLink}
          onClose={() => setShowLinkModal(false)}
        />
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};