import React, { useRef, useState, useEffect } from 'react';
import { RichTextToolbar } from './RichTextToolbar';
import { ImageInsertModal } from './ImageInsertModal';
import { LinkInsertModal } from './LinkInsertModal';

interface RichTextEditorProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [isSourceView, setIsSourceView] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isSourceView]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setCurrentSelection(selection.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    if (currentSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(currentSelection);
      }
    }
  };

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
      restoreSelection();
      
      try {
        document.execCommand(command, false, value);
      } catch (error) {
        console.warn('Command not supported:', command);
      }
      
      // Update the content after formatting
      setTimeout(() => {
        if (editorRef.current) {
          onChange({ target: { value: editorRef.current.innerHTML } });
        }
      }, 10);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current && !isSourceView) {
      onChange({ target: { value: editorRef.current.innerHTML } });
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ target: { value: e.target.value } });
  };

  const handleInsertImage = (url: string, alt: string, width?: string, height?: string) => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      restoreSelection();
      
      let imgHtml = `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;`;
      if (width) imgHtml += ` width: ${width}px;`;
      if (height) imgHtml += ` height: ${height}px;`;
      imgHtml += `">`;
      
      document.execCommand('insertHTML', false, imgHtml);
      onChange({ target: { value: editorRef.current.innerHTML } });
    }
    setShowImageModal(false);
  };

  const handleInsertLink = (url: string, text: string) => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      restoreSelection();
      
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        document.execCommand('createLink', false, url);
      } else {
        const linkHtml = `<a href="${url}" target="_blank">${text}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      }
      
      onChange({ target: { value: editorRef.current.innerHTML } });
    }
    setShowLinkModal(false);
  };

  const handleTextColor = (color: string) => {
    handleFormatText('foreColor', color);
  };

  const handleBackgroundColor = (color: string) => {
    handleFormatText('backColor', color);
  };

  const handleFontSize = (size: string) => {
    handleFormatText('fontSize', size);
  };

  const handleFontFamily = (font: string) => {
    handleFormatText('fontName', font);
  };

  const insertTable = (rows: number, cols: number) => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      restoreSelection();
      
      let tableHtml = '<table border="1" style="border-collapse: collapse; width: 100%;">';
      for (let i = 0; i < rows; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < cols; j++) {
          tableHtml += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
        }
        tableHtml += '</tr>';
      }
      tableHtml += '</table>';
      
      document.execCommand('insertHTML', false, tableHtml);
      onChange({ target: { value: editorRef.current.innerHTML } });
    }
  };

  const insertHorizontalRule = () => {
    if (editorRef.current && !isSourceView) {
      editorRef.current.focus();
      restoreSelection();
      document.execCommand('insertHorizontalRule', false);
      onChange({ target: { value: editorRef.current.innerHTML } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          handleFormatText('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormatText('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormatText('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handleFormatText('redo');
          } else {
            handleFormatText('undo');
          }
          break;
      }
    }
  };

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <RichTextToolbar
        onFormatText={handleFormatText}
        onInsertImage={() => {
          saveSelection();
          setShowImageModal(true);
        }}
        onInsertLink={() => {
          saveSelection();
          setShowLinkModal(true);
        }}
        onTextColor={handleTextColor}
        onBackgroundColor={handleBackgroundColor}
        onFontSize={handleFontSize}
        onFontFamily={handleFontFamily}
        onInsertTable={insertTable}
        onInsertHorizontalRule={insertHorizontalRule}
        isSourceView={isSourceView}
      />
      
      {isSourceView ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleSourceChange}
          className="w-full h-64 p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-900 text-green-400"
          placeholder="HTML source code..."
          spellCheck={false}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-64 p-4 focus:outline-none bg-white"
          onInput={handleContentChange}
          onMouseUp={saveSelection}
          onKeyUp={saveSelection}
          onKeyDown={handleKeyDown}
          style={{ minHeight: '256px' }}
          suppressContentEditableWarning={true}
        />
      )}

      {!isSourceView && (
        <style jsx>{`
          [contenteditable]:empty:before {
            content: "${placeholder}";
            color: #9ca3af;
            pointer-events: none;
            font-style: italic;
          }
        `}</style>
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
    </div>
  );
};