import React, { useState } from 'react';
import { Header } from './components/Header';
import { TemplateEditor } from './components/TemplateEditor';
import { PreviewPanel } from './components/PreviewPanel';
import { CodeOutput } from './components/CodeOutput';
import { GuideModal } from './components/GuideModal';
import { TemplateData } from './types/template';

function App() {
  const [templateData, setTemplateData] = useState<TemplateData>({
    layout: '1-column',
    colors: {
      navBackground: '#2A0948',
      navText: '#ffffff',
      contentBackground: '#f5f5f5',
      contentText: '#000000',
      accentColor: '#0064d2'
    },
    content: {
      title: 'Insert item title here (click on text)',
      description: 'Add your product description here...',
      features: [],
      images: []
    }
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'code'>('editor');
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onShowGuide={() => setShowGuide(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor Panel */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-6 py-4 font-semibold transition-colors ${
                      activeTab === 'editor'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-6 py-4 font-semibold transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-6 py-4 font-semibold transition-colors ${
                      activeTab === 'code'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    HTML Code
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'editor' && (
                  <TemplateEditor
                    templateData={templateData}
                    onChange={setTemplateData}
                  />
                )}
                {activeTab === 'preview' && (
                  <div className="lg:hidden">
                    <PreviewPanel templateData={templateData} />
                  </div>
                )}
                {activeTab === 'code' && (
                  <div className="lg:hidden">
                    <CodeOutput templateData={templateData} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview/Code Panel - Hidden on mobile, always visible on desktop */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-6 py-4 font-semibold transition-colors flex-1 ${
                      activeTab === 'preview' || activeTab === 'editor'
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-6 py-4 font-semibold transition-colors flex-1 ${
                      activeTab === 'code'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    HTML Source
                  </button>
                </nav>
              </div>

              <div className="p-6 max-h-screen overflow-y-auto">
                {(activeTab === 'preview' || activeTab === 'editor') && (
                  <PreviewPanel templateData={templateData} />
                )}
                {activeTab === 'code' && (
                  <CodeOutput templateData={templateData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGuide && (
        <GuideModal onClose={() => setShowGuide(false)} />
      )}
    </div>
  );
}

export default App;