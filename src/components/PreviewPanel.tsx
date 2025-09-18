import React from 'react';
import { TemplateData } from '../types/template';
import { Truck, Mail } from 'lucide-react';

interface PreviewPanelProps {
  templateData: TemplateData;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ templateData }) => {
  const { colors, content, layout } = templateData;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
      
      <div className="border rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div 
          style={{ 
            backgroundColor: colors.navBackground,
            color: colors.navText 
          }}
          className="px-6 py-4 text-center"
        >
          <h1 className="text-xl font-bold">{content.title}</h1>
        </div>

        {/* Content Area */}
        <div 
          style={{ 
            backgroundColor: colors.contentBackground,
            color: colors.contentText 
          }}
          className="p-6"
        >
          {layout === '2-column' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Images Column */}
              <div className="space-y-4">
                {content.images.length > 0 ? (
                  <div className="grid gap-2">
                    {content.images.slice(0, 3).map((image) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x150?text=Image';
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-500">
                    No images added
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: colors.accentColor }}>
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed">{content.description}</p>
                </div>

                {content.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: colors.accentColor }}>
                      Key Features
                    </h3>
                    <ul className="space-y-1">
                      {content.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Single column layout */}
              {content.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {content.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-24 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100?text=Image';
                      }}
                    />
                  ))}
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2" style={{ color: colors.accentColor }}>
                  Description
                </h3>
                <p className="text-sm leading-relaxed">{content.description}</p>
              </div>

              {content.features.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: colors.accentColor }}>
                    Key Features
                  </h3>
                  <ul className="space-y-1">
                    {content.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4" style={{ color: colors.accentColor }} />
              <span>Fast & reliable shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4" style={{ color: colors.accentColor }} />
              <span>Contact us for questions</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          style={{ 
            backgroundColor: colors.navBackground,
            color: colors.navText 
          }}
          className="px-6 py-3 text-center text-sm"
        >
          Professional eBay template by Avency Seller Helper
        </div>
      </div>
    </div>
  );
};