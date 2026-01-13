import React, { useState } from 'react';
import { IdCardData } from '../types';
import { generateRandomProfile } from '../services/geminiService';
import { Wand2, Upload, Trash2, Printer, FileText } from 'lucide-react';

interface EditorProps {
  data: IdCardData;
  onChange: (data: IdCardData) => void;
  onPrint: () => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, onPrint }) => {
  const [loadingAi, setLoadingAi] = useState(false);

  const handleChange = (field: keyof IdCardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'orgLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...data, [field]: url });
    }
  };

  const handleAiGenerate = async () => {
    setLoadingAi(true);
    const profile = await generateRandomProfile();
    setLoadingAi(false);
    if (profile) {
      onChange({
        ...data,
        firstName: profile.firstName,
        fatherName: profile.fatherName,
        role: profile.role,
        district: profile.district,
        address: profile.address,
        postOffice: profile.postOffice,
        pincode: profile.pincode,
        aadhar: profile.aadhar,
        specialHeader: profile.specialHeader || data.specialHeader,
      });
    } else {
        alert("Failed to generate profile. Check your API key or try again.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide">
      
      {/* Header Actions */}
      <div className="p-6 border-b border-gray-100 bg-gray-50 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Appointment Editor</h2>
        <p className="text-sm text-gray-500 mb-4">தமிழ்நாடு தியாகத் தலைவி சின்னம்மா பேரவை</p>
        
        <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={handleAiGenerate}
                disabled={loadingAi}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
                {loadingAi ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    <Wand2 size={16} />
                )}
                Tamil Auto-Fill
            </button>
            <button 
                onClick={onPrint}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
            >
                <Printer size={16} />
                Print Letter
            </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Document Info */}
        <section className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FileText size={12} /> Header Info
             </h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ref Number (வ.எண்)</label>
                <input type="text" value={data.refNumber || ''} onChange={(e) => handleChange('refNumber', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Header (e.g. அறிவிப்பு)</label>
                <input type="text" value={data.specialHeader || ''} onChange={(e) => handleChange('specialHeader', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date (தேதி)</label>
                <input type="date" value={data.issueDate} onChange={(e) => handleChange('issueDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
        </section>

        {/* Personal Info */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Details</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (பெயர்)</label>
                <input type="text" value={data.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father/Husband Name (தந்தை/கணவர்)</label>
                <input type="text" value={data.fatherName || ''} onChange={(e) => handleChange('fatherName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role (பொறுப்பு)</label>
                <input type="text" value={data.role} onChange={(e) => handleChange('role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District (மாவட்டம்)</label>
                <input type="text" value={data.district} onChange={(e) => handleChange('district', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
            </div>
        </section>

        {/* Address Block */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address & Contact</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (முகவரி)</label>
                <textarea 
                    value={data.address} 
                    onChange={(e) => handleChange('address', e.target.value)} 
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none" 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Office (அஞ்சல்)</label>
                <input type="text" value={data.postOffice || ''} onChange={(e) => handleChange('postOffice', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (பின் கோடு)</label>
                    <input type="text" value={data.pincode || ''} onChange={(e) => handleChange('pincode', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                 </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mobile (கைபேசி)</label>
                     <input type="text" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                 </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar (ஆதார் எண்)</label>
                <input type="text" value={data.aadhar || ''} onChange={(e) => handleChange('aadhar', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
        </section>

        {/* Branding */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Organization & Branding</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                <input type="text" value={data.orgName} onChange={(e) => handleChange('orgName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline/Address</label>
                <input type="text" value={data.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                         <input type="color" value={data.themeColor} onChange={(e) => handleChange('themeColor', e.target.value)} className="h-9 w-9 p-0.5 rounded border border-gray-300 cursor-pointer" />
                         <span className="text-xs text-gray-500">{data.themeColor}</span>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                    <div className="flex items-center gap-2">
                        <input type="color" value={data.accentColor} onChange={(e) => handleChange('accentColor', e.target.value)} className="h-9 w-9 p-0.5 rounded border border-gray-300 cursor-pointer" />
                        <span className="text-xs text-gray-500">{data.accentColor}</span>
                    </div>
                 </div>
             </div>
        </section>

        {/* Media */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Images</h3>
             
             {/* Profile Image */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Photo (PHOTO)</label>
                <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        {data.profileImage ? (
                            <img src={data.profileImage} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <UserIcon />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer w-fit mb-2">
                            <Upload size={14} />
                            Upload Photo
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
                        </label>
                        {data.profileImage && (
                            <button 
                                onClick={() => onChange({...data, profileImage: null})}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                                <Trash2 size={12} /> Remove
                            </button>
                        )}
                    </div>
                </div>
             </div>

             {/* Org Logo */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Logo</label>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                     {data.orgLogo && (
                         <img src={data.orgLogo} alt="Logo" className="h-10 w-10 object-contain" />
                     )}
                     <div className="flex-1">
                        <label className="block w-full text-center text-sm text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">
                            {data.orgLogo ? 'Change Logo' : 'Upload Logo File'}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'orgLogo')} />
                        </label>
                     </div>
                </div>
             </div>
        </section>
        
        <div className="h-12"></div> {/* Spacer */}
      </div>
    </div>
  );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Editor;