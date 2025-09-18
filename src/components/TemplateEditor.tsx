import React from 'react';
import { LayoutSelector } from './editor/LayoutSelector';
import { ColorCustomizer } from './editor/ColorCustomizer';
import { ContentEditor } from './editor/ContentEditor';
import { ImageManager } from './editor/ImageManager';
import { TemplateData } from '../types/template';

interface TemplateEditorProps {
  templateData: TemplateData;
  onChange: (data: TemplateData) => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ templateData, onChange }) => {
  return (
    <div className="space-y-8">
      <LayoutSelector
        selected={templateData.layout}
        onChange={(layout) => onChange({ ...templateData, layout })}
      />
      
      <ColorCustomizer
        colors={templateData.colors}
        onChange={(colors) => onChange({ ...templateData, colors })}
      />
      
      <ContentEditor
        content={templateData.content}
        onChange={(content) => onChange({ ...templateData, content })}
      />
      
      <ImageManager
        images={templateData.content.images}
        onChange={(images) => onChange({ 
          ...templateData, 
          content: { ...templateData.content, images } 
        })}
      />
    </div>
  );
};