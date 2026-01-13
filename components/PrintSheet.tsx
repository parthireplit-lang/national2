import React from 'react';
import { IdCardData } from '../types';
import { ShieldCheck } from 'lucide-react';

interface PrintSheetProps {
  data: IdCardData;
  copies?: number;
}

const PrintSheet: React.FC<PrintSheetProps> = ({ data }) => {
  return (
    <div 
      id="print-area"
      className="bg-white mx-auto shadow-2xl relative flex flex-col print:shadow-none print:w-full print:h-full print:absolute print:top-0 print:left-0"
      style={{
        width: '210mm',
        height: '297mm',
      }}
    >
        {/* Header (Letterhead) */}
        <div className="w-full relative shrink-0">
             {/* Header Content */}
             <div className="flex items-center justify-center p-6 pb-2 relative z-10 gap-4">
                 {/* Logo */}
                 <div className="shrink-0">
                     {data.orgLogo ? (
                        <img src={data.orgLogo} className="h-24 w-24 object-contain" alt="Logo" />
                    ) : (
                        <div 
                            className="h-24 w-24 rounded-full flex items-center justify-center border-4"
                            style={{ borderColor: data.themeColor, color: data.themeColor }}
                        >
                            <ShieldCheck size={48} />
                        </div>
                    )}
                 </div>

                 {/* Org Name */}
                 <div className="text-center">
                    <h1 
                        className="text-2xl font-black uppercase tracking-tight leading-tight"
                        style={{ color: data.themeColor }}
                    >
                        {data.orgName}
                    </h1>
                    <p className="text-sm font-bold mt-1" style={{ color: data.accentColor }}>
                        {data.tagline}
                    </p>
                 </div>
             </div>
             
             {/* Bottom Border of Header */}
             <div className="mx-6 h-0.5 bg-gray-300"></div>
        </div>

        {/* Body Content */}
        <div className="flex-1 px-12 py-8 flex flex-col relative font-sans text-gray-900 leading-relaxed">
            
            {/* Watermark */}
            {data.orgLogo && (
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
                    <img src={data.orgLogo} className="w-[120mm] grayscale" alt="Watermark" />
                </div>
            )}

            {/* Ref No & Date */}
            <div className="flex justify-between items-start mb-6 font-bold text-sm">
                <div>
                    <p>வ.எண்: {data.refNumber}</p>
                </div>
                <div>
                    <p>தேதி: {new Date(data.issueDate).toLocaleDateString('en-GB')}</p>
                </div>
            </div>

            {/* Special Header */}
            {data.specialHeader && (
                <div className="text-center mb-8">
                    <span 
                        className="inline-block px-4 py-1 rounded border-2 font-bold text-lg"
                        style={{ borderColor: data.themeColor, color: data.themeColor }}
                    >
                        {data.specialHeader}
                    </span>
                </div>
            )}

            {/* Main Text */}
            <div className="mb-12 relative z-10">
                <p className="text-lg text-justify leading-9 font-medium indent-12">
                    {data.orgName}யின் <span className="font-bold">{data.district}</span> மாவட்டம், <span className="font-bold">{data.role}</span> பொறுப்பில், <span className="font-bold">{data.firstName}</span> அவர்களை <span className="font-bold">{new Date(data.issueDate).toLocaleDateString('en-GB')}</span> முதல் நியமனம் செய்யப்படுகிறது.
                </p>
                <p className="text-lg text-justify leading-9 font-medium indent-12 mt-4">
                    தங்களது பணி சிறக்க மனதார வாழ்த்துகின்றேன்.
                </p>
            </div>

            {/* Bottom Section: Recipient & Photo/Sig */}
            <div className="mt-auto flex justify-between items-start relative z-10">
                
                {/* Recipient Block (Left) */}
                <div className="flex-1 max-w-[50%]">
                    <h3 className="font-bold text-lg mb-2 underline decoration-2 underline-offset-4">பெறுநர்</h3>
                    <div className="text-md font-semibold space-y-1.5 leading-snug">
                        <p>{data.firstName} {data.lastName}</p>
                        <p>த/பெ {data.fatherName}</p>
                        <p>{data.address}</p>
                        {data.postOffice && <p>{data.postOffice}</p>}
                        <p>{data.district} - {data.pincode}</p>
                        <div className="mt-3 pt-2 border-t border-gray-300 inline-block pr-4">
                            <p>ஆதார் எண்: {data.aadhar}</p>
                            <p>செல்: {data.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Photo & Signature */}
                <div className="flex flex-col items-center gap-6">
                    {/* Photo */}
                    <div className="p-1 bg-white border border-gray-300 shadow-sm rotate-1">
                        <div className="w-32 h-40 bg-gray-100 overflow-hidden">
                             {data.profileImage ? (
                                <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                    <span className="text-xs">PHOTO</span>
                                </div>
                             )}
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="text-center mt-4">
                        <div className="h-14 flex items-end justify-center mb-1">
                             <span className="font-cursive text-2xl text-blue-900 italic" style={{ fontFamily: 'cursive' }}>
                                (கையெழுத்து)
                             </span>
                        </div>
                        <p 
                            className="text-sm font-bold border-t border-gray-800 pt-1 px-2"
                            style={{ color: data.themeColor }}
                        >
                            பொதுச் செயலாளர்
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Footer Text */}
            <div className="mt-12 text-center text-[10px] text-gray-400">
                <p>This document is computer generated.</p>
            </div>
        </div>

        {/* Footer Strip */}
        <div 
            className="h-4 w-full shrink-0"
            style={{ backgroundColor: data.themeColor }}
        ></div>
    </div>
  );
};

export default PrintSheet;