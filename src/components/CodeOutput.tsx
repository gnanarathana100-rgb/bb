import React, { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { TemplateData } from '../types/template';

interface CodeOutputProps {
  templateData: TemplateData;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ templateData }) => {
  const [copied, setCopied] = useState(false);
  
  const generateHTML = () => {
    const { colors, content, layout } = templateData;
    
    const imagesHTML = content.images.length > 0 
      ? content.images.map(img => `<img src="${img.url}" alt="${img.alt}" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 5px;">`).join('\n    ')
      : '<div style="background: #f0f0f0; padding: 20px; text-align: center; border-radius: 5px;">No images added</div>';

    const featuresHTML = content.features.length > 0
      ? `<ul style="list-style-type: none; padding: 0; margin: 10px 0;">
    ${content.features.map(feature => `<li style="margin: 5px 0; padding-left: 15px; position: relative;">
      <span style="position: absolute; left: 0; color: #22c55e;">•</span>
      ${feature}
    </li>`).join('\n    ')}
  </ul>`
      : '';

    const layoutHTML = layout === '2-column' 
      ? `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div>
      <h3 style="color: ${colors.accentColor}; margin-bottom: 10px;">Product Images</h3>
      ${imagesHTML}
    </div>
    <div>
      <h3 style="color: ${colors.accentColor}; margin-bottom: 10px;">Description</h3>
      <p style="line-height: 1.6; margin-bottom: 15px;">${content.description}</p>
      ${content.features.length > 0 ? `<h3 style="color: ${colors.accentColor}; margin-bottom: 10px;">Key Features</h3>${featuresHTML}` : ''}
    </div>
  </div>`
      : `<div style="margin: 20px 0;">
    ${content.images.length > 0 ? `<div style="margin-bottom: 20px;">${imagesHTML}</div>` : ''}
    <h3 style="color: ${colors.accentColor}; margin-bottom: 10px;">Description</h3>
    <p style="line-height: 1.6; margin-bottom: 15px;">${content.description}</p>
    ${content.features.length > 0 ? `<h3 style="color: ${colors.accentColor}; margin-bottom: 10px;">Key Features</h3>${featuresHTML}` : ''}
  </div>`;

    return `<div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
  <!-- Header -->
  <div style="background-color: ${colors.navBackground}; color: ${colors.navText}; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: bold;">${content.title}</h1>
  </div>

  <!-- Content Area -->
  <div style="background-color: ${colors.contentBackground}; color: ${colors.contentText}; padding: 30px;">
    ${layoutHTML}

    <!-- Footer Info -->
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="display: flex; align-items: center; font-size: 14px;">
        <span style="margin-right: 8px; color: ${colors.accentColor};">🚚</span>
        <span>Fast & reliable shipping</span>
      </div>
      <div style="display: flex; align-items: center; font-size: 14px;">
        <span style="margin-right: 8px; color: ${colors.accentColor};">✉️</span>
        <span>Contact us for questions</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: ${colors.navBackground}; color: ${colors.navText}; padding: 15px; text-align: center; font-size: 12px;">
    Professional eBay template by Avency Seller Helper
  </div>
</div>`;
  };

  const htmlCode = generateHTML();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ebay-template.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">HTML Source Code</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy HTML'}</span>
          </button>
          <button
            onClick={downloadHTML}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-gray-300 text-sm">ebay-template.html</span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto max-h-96 overflow-y-auto">
          <code>{htmlCode}</code>
        </pre>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">How to use this code:</h4>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Copy the HTML code above</li>
          <li>2. Go to your eBay listing creation page</li>
          <li>3. Switch to HTML view in the description editor</li>
          <li>4. Paste the code into the description field</li>
          <li>5. Preview and publish your listing</li>
        </ol>
      </div>
    </div>
  );
};