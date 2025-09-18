import React from 'react';
import { Type, List, FileText } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

interface ContentEditorProps {
  content: {
    title: string;
    description: string;
    features: string[];
  };
  onChange: (content: any) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ content, onChange }) => {
  const addFeature = () => {
    onChange({
      ...content,
      features: [...content.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    onChange({ ...content, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_, i) => i !== index);
    onChange({ ...content, features: newFeatures });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Type className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Content Editor</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Item Title
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => onChange({ ...content, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            placeholder="Enter your product title here..."
          />
          <p className="text-xs text-gray-500 mt-2">
            This will be the main heading of your eBay listing
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Product Description
          </label>
          <RichTextEditor
            value={content.description}
            onChange={(e) => onChange({ ...content, description: e.target.value })}
            placeholder="Write a detailed description of your product. You can use the toolbar above to format text, add images, links, and more..."
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-2">
            Use the rich text editor to create professional descriptions with formatting, images, and links
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <List className="h-4 w-4 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700">
                Key Features & Specifications
              </label>
            </div>
            <button
              onClick={addFeature}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Feature
            </button>
          </div>
          
          <div className="space-y-3">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
                </div>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a key feature or specification..."
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                  title="Remove feature"
                >
                  ×
                </button>
              </div>
            ))}
            
            {content.features.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <List className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">No features added yet</p>
                <p className="text-sm">Click "Add Feature" to start listing key product features</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 text-sm mb-1">💡 Pro Tips for Features:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Include dimensions, weight, and materials</li>
              <li>• Mention compatibility and requirements</li>
              <li>• Highlight unique selling points</li>
              <li>• Use specific technical details when relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};