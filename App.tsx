import React, { useState } from 'react';
import { DEFAULT_CARD_DATA } from './constants';
import { IdCardData } from './types';
import Editor from './components/Editor';
import PrintSheet from './components/PrintSheet';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<IdCardData>(DEFAULT_CARD_DATA);
  const [zoom, setZoom] = useState(0.8);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      
      {/* Sidebar Editor - Hidden on Print */}
      <div className="w-[400px] flex-shrink-0 h-full border-r border-gray-300 shadow-xl z-30 print:hidden relative">
        <Editor 
            data={cardData} 
            onChange={setCardData} 
            onPrint={handlePrint}
        />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 h-full relative overflow-hidden bg-gray-200 flex flex-col">
        
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 print:hidden z-20 shadow-sm">
            <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <span className="text-indigo-600 bg-indigo-50 p-1 rounded">A4</span> 
                Sheet Preview
            </h1>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} 
                    className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all"
                    title="Zoom Out"
                >
                    <ZoomOut size={18} />
                </button>
                <span className="text-xs font-mono w-12 text-center text-gray-600">{Math.round(zoom * 100)}%</span>
                <button 
                    onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} 
                    className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all"
                    title="Zoom In"
                >
                    <ZoomIn size={18} />
                </button>
            </div>
        </div>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 print:p-0 print:overflow-visible">
            <div 
                className="transition-transform duration-200 origin-top shadow-2xl print:shadow-none print:transform-none"
                style={{ transform: `scale(${zoom})` }}
            >
                <PrintSheet data={cardData} />
            </div>
        </div>

        {/* Floating Help */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur border border-gray-200 p-4 rounded-xl shadow-lg max-w-xs text-xs text-gray-500 print:hidden z-10">
            <p className="font-semibold text-gray-800 mb-1">Printing Tips:</p>
            <ul className="list-disc pl-4 space-y-1">
                <li>Set paper size to <strong>A4</strong>.</li>
                <li>Set margins to <strong>None</strong> or Minimum.</li>
                <li>Enable <strong>Background Graphics</strong> in browser print settings.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default App;