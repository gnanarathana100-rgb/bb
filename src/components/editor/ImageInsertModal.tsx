import React, { useState } from 'react';
import { X, Upload, Link } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Insert/Edit Image</h3>
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
                <h4 className="font-semibold mb-1">How to upload an image</h4>
                <ol className="space-y-1 text-xs">
                  <li>1. Visit <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.postimages.org</a></li>
                  <li>2. Upload your image</li>
                  <li>3. Copy the "direct link" to the clipboard</li>
                  <li>4. Paste the direct link into the URL field above</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <div className="flex items-center space-x-2">
                  <Link className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://i.postimg.cc/7Z6XLxbS/default-image-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative description
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Product Image"
                />
              </div>
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                  />
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};