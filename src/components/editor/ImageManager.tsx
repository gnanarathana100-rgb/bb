import React, { useState } from 'react';
import { ImagePlus, Upload, Link, X } from 'lucide-react';
import { TemplateImage } from '../../types/template';

interface ImageManagerProps {
  images: TemplateImage[];
  onChange: (images: TemplateImage[]) => void;
}

export const ImageManager: React.FC<ImageManagerProps> = ({ images, onChange }) => {
  const [showAddImage, setShowAddImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const addImage = () => {
    if (imageUrl.trim()) {
      const newImage: TemplateImage = {
        id: Date.now().toString(),
        url: imageUrl.trim(),
        alt: imageAlt.trim() || 'Product Image'
      };
      onChange([...images, newImage]);
      setImageUrl('');
      setImageAlt('');
      setShowAddImage(false);
    }
  };

  const removeImage = (id: string) => {
    onChange(images.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ImagePlus className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">Image Manager</h3>
        </div>
        <button
          onClick={() => setShowAddImage(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Add Image</span>
        </button>
      </div>

      {showAddImage && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-3">Add New Image</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Product Image"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={addImage}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add Image
              </button>
              <button
                onClick={() => setShowAddImage(false)}
                className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=Image+Not+Found';
                }}
              />
            </div>
            <button
              onClick={() => removeImage(image.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs text-gray-600 mt-1 truncate">{image.alt}</p>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImagePlus className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>No images added yet</p>
          <p className="text-sm">Click "Add Image" to start building your gallery</p>
        </div>
      )}
    </div>
  );
};