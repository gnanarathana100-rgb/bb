import React from 'react';
import { Palette } from 'lucide-react';

interface ColorCustomizerProps {
  colors: {
    navBackground: string;
    navText: string;
    contentBackground: string;
    contentText: string;
    accentColor: string;
  };
  onChange: (colors: any) => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({ colors, onChange }) => {
  const colorFields = [
    { key: 'navBackground', label: 'Header Background', section: 'Navigation/Footer' },
    { key: 'navText', label: 'Header Text', section: 'Navigation/Footer' },
    { key: 'contentBackground', label: 'Content Background', section: 'Content Area' },
    { key: 'contentText', label: 'Content Text', section: 'Content Area' },
    { key: 'accentColor', label: 'Accent Color', section: 'Content Area' }
  ];

  const updateColor = (key: string, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Palette className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Color Customization</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Navigation/Footer</h4>
          <div className="space-y-4">
            {colorFields.filter(field => field.section === 'Navigation/Footer').map((field) => (
              <div key={field.key} className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {field.label}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={colors[field.key as keyof typeof colors]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors[field.key as keyof typeof colors]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Content Area</h4>
          <div className="space-y-4">
            {colorFields.filter(field => field.section === 'Content Area').map((field) => (
              <div key={field.key} className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {field.label}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={colors[field.key as keyof typeof colors]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors[field.key as keyof typeof colors]}
                      onChange={(e) => updateColor(field.key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};