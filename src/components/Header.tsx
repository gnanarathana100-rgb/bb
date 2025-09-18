import React from 'react';
import { Store, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onShowGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowGuide }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Avency Seller Helper</h1>
              <p className="text-blue-100">Professional eBay Description Creator</p>
            </div>
          </div>
          
          <button
            onClick={onShowGuide}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};