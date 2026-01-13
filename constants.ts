import { IdCardData } from './types';

export const DEFAULT_CARD_DATA: IdCardData = {
  firstName: 'திரு. இராமச்சந்திரன்',
  lastName: '',
  fatherName: 'கிருஷ்ணசாமி',
  role: 'மாவட்ட செயலாளர்',
  idNumber: 'TN-2024-001',
  district: 'மதுரை',
  bloodGroup: 'O+',
  issueDate: new Date().toISOString().split('T')[0],
  expiryDate: '2025-12-31',
  phone: '98765 43210',
  email: '',
  address: 'எண் 12, வடக்கு தெரு, அவனியாபுரம்',
  postOffice: 'அவனியாபுரம் அஞ்சல்',
  pincode: '625012',
  aadhar: '1234 5678 9012',
  profileImage: null, 
  orgLogo: null, 
  themeColor: '#006400', // Dark Green
  accentColor: '#fbbf24', // Amber
  orgName: 'தமிழ்நாடு தியாகத் தலைவி சின்னம்மா பேரவை',
  tagline: 'மாநில தலைமை நிலையம்',
  refNumber: 'தலைமை/01/2024',
  specialHeader: 'தலைமை நிலைய அறிவிப்பு',
  letterContent: '', // Using template structure instead of free text
};

export const SAMPLE_PROFILE_IMAGES = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/300?random=2',
  'https://picsum.photos/300/300?random=3',
];