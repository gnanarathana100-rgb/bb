import React, { useState } from 'react';
import { X, Upload, Link, Image as ImageIcon } from 'lucide-react';

interface ImageInsertModalProps {
  onInsert: (url: string, alt: string, width?: string, height?: string) => void;
  onClose: () => void;
}

export const ImageInsertModal: React.FC<ImageInsertModalProps> = ({ onInsert, onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'advanced'>('general');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('Product Image');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [alignment, setAlignment] = useState('none');
  const [border, setBorder] = useState('0');
  const [margin, setMargin] = useState('5');

  const handleInsert = () => {
    if (imageUrl.trim()) {
      onInsert(
        imageUrl.trim(),
        altText.trim() || 'Product Image',
        width || undefined,
        height || undefined
      );
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Insert/Edit Image
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'general'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'advanced'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Advanced
            </button>
          </nav>
        </div>

        <div className="p-4 space-y-4">
          {activeTab === 'general' && (
            <>
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-1" />
                  How to upload an image
                </h4>
                <ol className="space-y-1 text-xs">
                  <li>1. Visit <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">postimages.org</a> or <a href="https://imgur.com" target=\"_blank" rel="noopener noreferrer\" className="text-blue-600 underline">imgur.com</a></li>
                  <li>2. Upload your image</li>
                  <li>3. Copy the "direct link" to the clipboard</li>
                  <li>4. Paste the direct link into the URL field below</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <div className="flex items-center space-x-2">
                  <Link className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Images (Click to use)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors"
                      onClick={() => setImageUrl(url)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative Text (Alt)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the image for accessibility"
                />
              </div>

              {imageUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="border border-gray-300 rounded p-2 bg-gray-50">
                    <img
                      src={imageUrl}
                      alt={altText}
                      className="max-w-full h-auto max-h-32 mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alignment
                </label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border (px)
                  </label>
                  <input
                    type="number"
                    value={border}
                    onChange={(e) => setBorder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Margin (px)
                  </label>
                  <input
                    type="number"
                    value={margin}
                    onChange={(e) => setMargin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Style Preview</h4>
                <div className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                  {`style="max-width: 100%; height: auto;${width ? ` width: ${width}px;` : ''}${height ? ` height: ${height}px;` : ''}${alignment !== 'none' ? ` display: block; margin: 0 auto;` : ''}${border !== '0' ? ` border: ${border}px solid #ddd;` : ''}${margin !== '0' ? ` margin: ${margin}px;` : ''}"`}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!imageUrl.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};