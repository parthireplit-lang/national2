import React from 'react';

interface BarcodeProps {
  value: string;
  color?: string;
  className?: string;
}

// Pseudorandom bars based on string hash to make it look consistent for the same ID
const generateBars = (str: string, count: number = 30) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const bars = [];
  const absHash = Math.abs(hash);
  for (let i = 0; i < count; i++) {
    const width = (absHash >> (i % 30)) & 1 ? 2 : 1;
    bars.push(width);
  }
  return bars;
};

const Barcode: React.FC<BarcodeProps> = ({ value, color = "#000", className = "" }) => {
  const bars = generateBars(value, 40);
  
  return (
    <div className={`flex items-end justify-center h-8 gap-[1px] ${className}`}>
        {bars.map((width, i) => (
            <div 
                key={i} 
                style={{ 
                    width: `${width * 2}px`, 
                    height: '100%', 
                    backgroundColor: color 
                }} 
            />
        ))}
    </div>
  );
};

export default Barcode;