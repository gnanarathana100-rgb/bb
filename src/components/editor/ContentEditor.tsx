import React from 'react';
import { Type, List } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Type className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Content Editor</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Title
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => onChange({ ...content, title: e.target.value })}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            placeholder="Insert item title here"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <RichTextEditor
            value={content.description}
            onChange={(e) => onChange({ ...content, description: e.target.value })}
            placeholder="Add your detailed product description here..."
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <List className="h-4 w-4 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700">
                Key Features
              </label>
            </div>
            <button
              onClick={addFeature}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Feature
            </button>
          </div>
          
          <div className="space-y-2">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a key feature..."
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800 px-2 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            
            {content.features.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                Click "Add Feature" to start adding key product features
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};