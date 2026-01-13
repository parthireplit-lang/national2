import React from 'react';
import { IdCardData } from '../types';
import Barcode from './Barcode';
import { ShieldCheck } from 'lucide-react';

interface IdCardProps {
  data: IdCardData;
  scale?: number;
  className?: string;
}

const IdCard: React.FC<IdCardProps> = ({ data, scale = 1, className = '' }) => {
  // Dimensions for a CR80 card
  const BASE_WIDTH = 320; 
  const BASE_HEIGHT = 512; 

  const style = {
    width: `${BASE_WIDTH}px`,
    height: `${BASE_HEIGHT}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  };

  return (
    <div 
      className={`relative overflow-hidden shadow-xl flex flex-col ${className}`} 
      style={style}
    >
        {/* Watermark Logo */}
        {data.orgLogo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none z-0">
                <img src={data.orgLogo} className="w-64 h-64 object-contain grayscale" alt="" />
            </div>
        )}

        {/* Top Header Strip */}
        <div 
            className="w-full text-center py-1 z-10"
            style={{ backgroundColor: data.accentColor }}
        >
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/80">
                Identity Card
             </span>
        </div>

        {/* Main Brand Header */}
        <div 
            className="w-full flex flex-col items-center justify-center pt-3 pb-8 px-4 relative z-10"
            style={{ 
                backgroundColor: data.themeColor,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' 
            }}
        >
            <div className="flex items-center gap-3 mb-1">
                {data.orgLogo ? (
                    <img src={data.orgLogo} alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shadow-sm" />
                ) : (
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                        <ShieldCheck size={20} />
                    </div>
                )}
                <div className="flex flex-col items-start">
                    <h1 className="text-white font-black text-lg uppercase leading-none tracking-tight text-left">
                        {data.orgName}
                    </h1>
                    <span className="text-white/80 text-[9px] uppercase font-medium tracking-wide">
                        {data.tagline}
                    </span>
                </div>
            </div>
        </div>

        {/* Profile Photo Area - Overlapping the header */}
        <div className="flex justify-center -mt-8 relative z-20 mb-2">
            <div className="p-1.5 bg-white rounded-lg shadow-md">
                <div className="w-32 h-36 bg-gray-200 overflow-hidden rounded border border-gray-200 relative">
                     <img 
                        src={data.profileImage || `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random&size=256`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50"></div>
                </div>
            </div>
        </div>

        {/* Name & Role */}
        <div className="text-center px-4 mb-4 z-10">
            <h2 
                className="text-2xl font-black uppercase tracking-tight leading-none mb-1"
                style={{ color: data.themeColor }}
            >
                {data.firstName} {data.lastName}
            </h2>
            <div 
                className="inline-block px-4 py-1 rounded text-xs font-bold text-white uppercase shadow-sm"
                style={{ backgroundColor: data.themeColor }}
            >
                {data.role}
            </div>
        </div>

        {/* Details Table */}
        <div className="flex-1 px-5 z-10">
            <div className="border-t-2 border-b-2 border-gray-100 py-3 space-y-2">
                <DetailRow label="ID Number" value={data.idNumber} />
                <DetailRow label="District" value={data.district} />
                <DetailRow label="Phone" value={data.phone} />
                <DetailRow label="Blood Grp" value={data.bloodGroup} />
                <DetailRow label="Valid Upto" value={data.expiryDate} />
            </div>
            
            {/* Address Section */}
            <div className="mt-3 text-center">
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">Official Address</p>
                <p className="text-[10px] text-gray-700 font-medium leading-tight line-clamp-2">
                    {data.address}
                </p>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 pb-5 pt-2 flex items-end justify-between z-10">
            <div className="flex flex-col items-center">
                 <Barcode value={data.idNumber} className="h-6 w-20 opacity-90" color="#000" />
            </div>
            <div className="flex flex-col items-end">
                {/* Simulated Signature */}
                <div className="h-8 w-24 mb-1 border-b border-gray-400 flex items-end justify-center">
                     <span className="font-cursive text-gray-600 text-sm italic" style={{ fontFamily: 'cursive' }}>
                        Director
                     </span>
                </div>
                <span 
                    className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: data.themeColor }}
                >
                    Auth. Signature
                </span>
            </div>
        </div>
        
        {/* Bottom Strip */}
        <div 
            className="h-3 w-full"
            style={{ backgroundColor: data.themeColor }}
        />
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center text-left">
        <span className="w-20 text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
        <span className="flex-1 text-sm font-bold text-gray-800 truncate">{value}</span>
    </div>
);

export default IdCard;