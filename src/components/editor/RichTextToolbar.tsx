import React, { useState } from 'react';
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
  Eye,
  Table,
  Minus,
  ChevronDown,
  Strikethrough,
  Subscript,
  Superscript
} from 'lucide-react';

interface RichTextToolbarProps {
  onFormatText: (command: string, value?: string) => void;
  onInsertImage: () => void;
  onInsertLink: () => void;
  onTextColor: (color: string) => void;
  onBackgroundColor: (color: string) => void;
  onFontSize: (size: string) => void;
  onFontFamily: (font: string) => void;
  onInsertTable: (rows: number, cols: number) => void;
  onInsertHorizontalRule: () => void;
  isSourceView: boolean;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({ 
  onFormatText, 
  onInsertImage, 
  onInsertLink,
  onTextColor,
  onBackgroundColor,
  onFontSize,
  onFontFamily,
  onInsertTable,
  onInsertHorizontalRule,
  isSourceView
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTableSelector, setShowTableSelector] = useState(false);

  const handleCommand = (command: string, value?: string) => {
    onFormatText(command, value);
  };

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
    '#ff0000', '#ff6600', '#ffcc00', '#33cc00', '#0066cc', '#6600cc',
    '#cc0066', '#ff3366', '#ff9933', '#ffff33', '#66ff33', '#33ccff',
    '#9933ff', '#ff33cc'
  ];

  const fontSizes = [
    { label: '8px', value: '1' },
    { label: '10px', value: '2' },
    { label: '12px', value: '3' },
    { label: '14px', value: '4' },
    { label: '18px', value: '5' },
    { label: '24px', value: '6' },
    { label: '36px', value: '7' }
  ];

  const fontFamilies = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Times New Roman, serif',
    'Georgia, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Impact, sans-serif',
    'Comic Sans MS, cursive'
  ];

  const TableSelector = () => {
    const [hoveredCell, setHoveredCell] = useState({ row: 0, col: 0 });
    
    return (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
        <div className="text-xs text-gray-600 mb-2">Select table size</div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }, (_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isHovered = row <= hoveredCell.row && col <= hoveredCell.col;
            
            return (
              <div
                key={i}
                className={`w-4 h-4 border border-gray-300 cursor-pointer ${
                  isHovered ? 'bg-blue-200' : 'bg-white hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredCell({ row, col })}
                onClick={() => {
                  onInsertTable(row + 1, col + 1);
                  setShowTableSelector(false);
                }}
              />
            );
          })}
        </div>
        <div className="text-xs text-gray-600 mt-2">
          {hoveredCell.row + 1} x {hoveredCell.col + 1}
        </div>
      </div>
    );
  };

  const ColorPicker = ({ onColorSelect, show, onClose }: { 
    onColorSelect: (color: string) => void; 
    show: boolean; 
    onClose: () => void; 
  }) => {
    if (!show) return null;
    
    return (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
        <div className="grid grid-cols-6 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 border border-gray-300 rounded cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => {
                onColorSelect(color);
                onClose();
              }}
              title={color}
            />
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <input
            type="color"
            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            onChange={(e) => {
              onColorSelect(e.target.value);
              onClose();
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50">
      {/* Menu Bar */}
      <div className="flex items-center space-x-6 px-4 py-2 text-sm border-b border-gray-200">
        <button className="text-gray-700 hover:text-blue-600 transition-colors">File</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Edit</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">View</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Insert</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Format</button>
        <button className="text-gray-700 hover:text-blue-600 transition-colors">Tools</button>
      </div>

      {/* Main Toolbar */}
      <div className="px-4 py-2">
        <div className="flex items-center space-x-1 flex-wrap gap-y-2">
          {/* Code/Source View */}
          <div className="flex items-center space-x-1 mr-2">
            <button
              onClick={() => handleCommand('viewSource')}
              className={`p-2 rounded transition-colors ${
                isSourceView ? 'bg-blue-200 text-blue-700' : 'hover:bg-gray-200'
              }`}
              title="View Source"
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('preview')}
              className={`p-2 rounded transition-colors ${
                !isSourceView ? 'bg-green-200 text-green-700' : 'hover:bg-gray-200'
              }`}
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
              title="Undo (Ctrl+Z)"
              disabled={isSourceView}
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('redo')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Redo (Ctrl+Shift+Z)"
              disabled={isSourceView}
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Font Family */}
          <select 
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white min-w-32"
            onChange={(e) => onFontFamily(e.target.value)}
            disabled={isSourceView}
            title="Font Family"
          >
            <option value="">Font Family</option>
            {fontFamilies.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font.split(',')[0]}
              </option>
            ))}
          </select>

          {/* Font Size */}
          <select 
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white ml-2"
            onChange={(e) => onFontSize(e.target.value)}
            disabled={isSourceView}
            title="Font Size"
          >
            <option value="">Size</option>
            {fontSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Text Formatting */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleCommand('bold')}
              className="p-2 rounded hover:bg-gray-200 transition-colors font-bold"
              title="Bold (Ctrl+B)"
              disabled={isSourceView}
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('italic')}
              className="p-2 rounded hover:bg-gray-200 transition-colors italic"
              title="Italic (Ctrl+I)"
              disabled={isSourceView}
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('underline')}
              className="p-2 rounded hover:bg-gray-200 transition-colors underline"
              title="Underline (Ctrl+U)"
              disabled={isSourceView}
            >
              <Underline className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('strikeThrough')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Strikethrough"
              disabled={isSourceView}
            >
              <Strikethrough className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('subscript')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Subscript"
              disabled={isSourceView}
            >
              <Subscript className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('superscript')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Superscript"
              disabled={isSourceView}
            >
              <Superscript className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Text Colors */}
          <div className="flex items-center space-x-1">
            <div className="relative">
              <button
                onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center"
                title="Text Color"
                disabled={isSourceView}
              >
                <Type className="h-4 w-4" />
                <div className="w-3 h-1 bg-black mt-1 ml-1"></div>
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              <ColorPicker
                show={showTextColorPicker}
                onColorSelect={onTextColor}
                onClose={() => setShowTextColorPicker(false)}
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center"
                title="Background Color"
                disabled={isSourceView}
              >
                <Palette className="h-4 w-4" />
                <div className="w-3 h-1 bg-yellow-400 mt-1 ml-1"></div>
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              <ColorPicker
                show={showBgColorPicker}
                onColorSelect={onBackgroundColor}
                onClose={() => setShowBgColorPicker(false)}
              />
            </div>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Alignment */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleCommand('justifyLeft')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Align Left"
              disabled={isSourceView}
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('justifyCenter')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Align Center"
              disabled={isSourceView}
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('justifyRight')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Align Right"
              disabled={isSourceView}
            >
              <AlignRight className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Lists */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleCommand('insertUnorderedList')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Bullet List"
              disabled={isSourceView}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleCommand('insertOrderedList')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Numbered List"
              disabled={isSourceView}
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Insert Elements */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onInsertLink}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Insert Link"
              disabled={isSourceView}
            >
              <Link className="h-4 w-4" />
            </button>
            <button
              onClick={onInsertImage}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Insert Image"
              disabled={isSourceView}
            >
              <Image className="h-4 w-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowTableSelector(!showTableSelector)}
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Insert Table"
                disabled={isSourceView}
              >
                <Table className="h-4 w-4" />
              </button>
              {showTableSelector && <TableSelector />}
            </div>
            <button
              onClick={onInsertHorizontalRule}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Insert Horizontal Rule"
              disabled={isSourceView}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Format Options */}
          <div className="flex items-center space-x-1">
            <select 
              className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
              onChange={(e) => handleCommand('formatBlock', e.target.value)}
              disabled={isSourceView}
              title="Format"
            >
              <option value="">Format</option>
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
              <option value="pre">Preformatted</option>
              <option value="blockquote">Quote</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};