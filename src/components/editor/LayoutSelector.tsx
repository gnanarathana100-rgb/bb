import React from 'react';
import { Layout, Columns, Code } from 'lucide-react';

interface LayoutSelectorProps {
  selected: '1-column' | '2-column' | 'custom';
  onChange: (layout: '1-column' | '2-column' | 'custom') => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selected, onChange }) => {
  const layouts = [
    {
      id: '1-column' as const,
      name: '1-Column',
      icon: Layout,
      description: 'Single column layout'
    },
    {
      id: '2-column' as const,
      name: '2-Columns',
      icon: Columns,
      description: 'Two column layout'
    },
    {
      id: 'custom' as const,
      name: 'Custom HTML',
      icon: Code,
      description: 'Custom HTML template'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Select a Layout</h3>
      <div className="grid grid-cols-3 gap-3">
        {layouts.map((layout) => {
          const Icon = layout.icon;
          return (
            <button
              key={layout.id}
              onClick={() => onChange(layout.id)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                selected === layout.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Icon className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">{layout.name}</div>
              <div className="text-xs text-gray-500 mt-1">{layout.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};