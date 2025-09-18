import React, { useState } from 'react';
import { X, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface LinkInsertModalProps {
  onInsert: (url: string, text: string) => void;
  onClose: () => void;
}

export const LinkInsertModal: React.FC<LinkInsertModalProps> = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('_blank');
  const [linkType, setLinkType] = useState('url');

  const handleInsert = () => {
    if (url.trim()) {
      let finalUrl = url.trim();
      
      // Add protocol if missing
      if (linkType === 'url' && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      
      onInsert(finalUrl, title.trim() || finalUrl);
    }
  };

  const commonLinks = [
    { name: 'eBay Homepage', url: 'https://www.ebay.com' },
    { name: 'PayPal', url: 'https://www.paypal.com' },
    { name: 'Shipping Calculator', url: 'https://www.usps.com/ship/' },
    { name: 'Return Policy', url: '#returns' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <LinkIcon className="h-5 w-5 mr-2" />
            Insert/Edit Link
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={linkType === 'url'}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Web URL</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={linkType === 'email'}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="phone"
                  checked={linkType === 'phone'}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Phone</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {linkType === 'email' ? 'Email Address' : linkType === 'phone' ? 'Phone Number' : 'URL'}
            </label>
            <input
              type={linkType === 'email' ? 'email' : linkType === 'phone' ? 'tel' : 'url'}
              value={url}
              onChange={(e) => {
                let value = e.target.value;
                if (linkType === 'email' && !value.startsWith('mailto:') && value.includes('@')) {
                  value = 'mailto:' + value.replace('mailto:', '');
                } else if (linkType === 'phone' && !value.startsWith('tel:') && value) {
                  value = 'tel:' + value.replace('tel:', '');
                }
                setUrl(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={
                linkType === 'email' ? 'example@email.com' : 
                linkType === 'phone' ? '+1-234-567-8900' : 
                'https://example.com'
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Text
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Text to display"
            />
          </div>

          {linkType === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Open link in...
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="_blank">New window/tab</option>
                <option value="_self">Current window</option>
                <option value="_parent">Parent frame</option>
                <option value="_top">Full window</option>
              </select>
            </div>
          )}

          {linkType === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Links
              </label>
              <div className="grid grid-cols-1 gap-1">
                {commonLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUrl(link.url);
                      setTitle(link.name);
                    }}
                    className="text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {url && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-1">Preview</h4>
              <a
                href={url}
                target={target}
                className="text-blue-600 underline hover:text-blue-800"
                onClick={(e) => e.preventDefault()}
              >
                {title || url}
              </a>
            </div>
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
            disabled={!url.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Insert Link
          </button>
        </div>
      </div>
    </div>
  );
};