import React from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">eBay Listing Guide</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Create Professional eBay Listings in Minutes
            </h3>
            <p className="text-gray-600">
              Follow this step-by-step guide to create stunning eBay descriptions that convert browsers into buyers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Step 1: Choose Your Layout</h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-1 ml-7">
                  <li>• <strong>1-Column:</strong> Simple, focused design for single products</li>
                  <li>• <strong>2-Column:</strong> Professional layout with images and details side-by-side</li>
                  <li>• <strong>Custom:</strong> Advanced option for HTML experts</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-purple-800">Step 2: Customize Colors</h4>
                </div>
                <ul className="text-sm text-purple-700 space-y-1 ml-7">
                  <li>• Match your brand colors</li>
                  <li>• Use high contrast for readability</li>
                  <li>• Keep it professional and clean</li>
                  <li>• Test colors with different backgrounds</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-800">Step 3: Add Content</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1 ml-7">
                  <li>• Write a compelling title</li>
                  <li>• Add detailed product description</li>
                  <li>• List key features and benefits</li>
                  <li>• Include dimensions, materials, etc.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-2" />
                  <h4 className="font-semibold text-orange-800">Step 4: Upload Images</h4>
                </div>
                <ul className="text-sm text-orange-700 space-y-1 ml-7">
                  <li>• Use high-quality, well-lit photos</li>
                  <li>• Show multiple angles</li>
                  <li>• Include close-ups of details</li>
                  <li>• Add lifestyle or in-use shots</li>
                </ul>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-indigo-800">Step 5: Generate & Use</h4>
                </div>
                <ul className="text-sm text-indigo-700 space-y-1 ml-7">
                  <li>• Preview your template</li>
                  <li>• Copy the HTML code</li>
                  <li>• Paste into eBay's HTML editor</li>
                  <li>• Test before publishing</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Pro Tips</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 ml-7">
                  <li>• Keep descriptions concise but informative</li>
                  <li>• Use bullet points for easy scanning</li>
                  <li>• Include shipping and return policies</li>
                  <li>• Test on mobile devices</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <ArrowRight className="h-5 w-5 mr-2" />
              Ready to Create Your First Template?
            </h4>
            <p className="text-yellow-700 text-sm">
              Start by selecting a layout above, then customize the colors to match your brand. 
              Add your product information and images, then generate your professional eBay listing HTML code!
            </p>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Got It, Let's Start Creating!
          </button>
        </div>
      </div>
    </div>
  );
};