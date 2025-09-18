import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image, 
  List, 
  ListOrdered,
  Type,
  Palette,
  Undo,
  Redo,
  Code,
  Eye
} from 'lucide-react';

interface RichTextToolbarProps {
  onFormatText: (command: string, value?: string) => void;
  onInsertImage: () => void;
  onInsertLink: () => void;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({ 
  onFormatText, 
  onInsertImage, 
  onInsertLink 
}) => {
  const handleCommand = (command: string, value?: string) => {
    onFormatText(command, value);
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
      {/* Menu Bar */}
      <div className="flex items-center space-x-6 mb-2 text-sm">
        <button className="text-gray-700 hover:text-blue-600 transition-colors">File</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Edit</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">View</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Insert</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Format</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Tools</button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center space-x-1 flex-wrap gap-y-2">
        {/* Code/Source View */}
        <div className="flex items-center space-x-1 mr-2">
          <button
            onClick={() => handleCommand('viewSource')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="View Source"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('preview')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Undo/Redo */}
        <div className="flex items-center space-x-1 mr-2">
          <button
            onClick={() => handleCommand('undo')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('redo')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Font Family */}
        <select 
          className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
          onChange={(e) => handleCommand('fontName', e.target.value)}
          defaultValue="system-ui"
        >
          <option value="system-ui">system-ui-ap...</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Font Size */}
        <select 
          className="px-3 py-1 border border-gray-300 rounded text-sm bg-white ml-2"
          onChange={(e) => handleCommand('fontSize', e.target.value)}
          defaultValue="3"
        >
          <option value="1">8px</option>
          <option value="2">10px</option>
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
          <option value="7">36px</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Text Formatting */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleCommand('bold')}
            className="p-2 rounded hover:bg-gray-200 transition-colors font-bold"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('italic')}
            className="p-2 rounded hover:bg-gray-200 transition-colors italic"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('underline')}
            className="p-2 rounded hover:bg-gray-200 transition-colors underline"
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            onClick={onInsertLink}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Alignment */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleCommand('justifyLeft')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('justifyCenter')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('justifyRight')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Insert Image */}
        <button
          onClick={onInsertImage}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Lists */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleCommand('insertUnorderedList')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCommand('insertOrderedList')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Text Color */}
        <div className="flex items-center space-x-1">
          <div className="relative">
            <button
              className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center"
              title="Text Color"
            >
              <Type className="h-4 w-4" />
              <div className="w-3 h-1 bg-black mt-1 ml-1"></div>
            </button>
          </div>
          <div className="relative">
            <button
              className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center"
              title="Background Color"
            >
              <Palette className="h-4 w-4" />
              <div className="w-3 h-1 bg-yellow-400 mt-1 ml-1"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};