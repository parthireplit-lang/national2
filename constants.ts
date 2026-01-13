import { IdCardData } from './types';

// A professional SVG Letterhead with Green/Orange theme (NFITU style)
const DEFAULT_TEMPLATE_IMAGE = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2480' height='3508' viewBox='0 0 2480 3508'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23f0fdf4'/%3E%3Cstop offset='100%25' stop-color='%23dcfce7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='2480' height='3508' fill='white'/%3E%3Crect width='2480' height='750' fill='url(%23g)'/%3E%3Crect y='750' width='2480' height='20' fill='%23ea580c'/%3E%3Crect y='730' width='2480' height='20' fill='%23166534'/%3E%3Ccircle cx='300' cy='375' r='180' fill='%23166534' opacity='0.1'/%3E%3Ctext x='1240' y='320' font-family='serif' font-weight='bold' font-size='110' text-anchor='middle' fill='%23166534'%3ENATIONAL TRADE UNION CENTER%3C/text%3E%3Ctext x='1240' y='450' font-family='sans-serif' font-weight='400' font-size='60' text-anchor='middle' fill='%23374151'%3EGovernment Recognized Organization | Reg. No. 12345/GOVT%3C/text%3E%3Ctext x='1240' y='550' font-family='sans-serif' font-weight='bold' font-size='50' text-anchor='middle' fill='%23ea580c'%3ESTATE COMMITTEE - TAMIL NADU%3C/text%3E%3Crect y='3358' width='2480' height='150' fill='%23166534'/%3E%3Ctext x='1240' y='3455' font-family='sans-serif' font-size='45' text-anchor='middle' fill='white'%3EHead Office: No. 123, Gandhi Road, Chennai, Tamil Nadu - 600001 | Phone: +91 98765 43210%3C/text%3E%3Cg transform='translate(1240, 1900)' opacity='0.03'%3E%3Ccircle r='600' fill='%23166534'/%3E%3C/g%3E%3C/svg%3E";

// Digital Seal recreating the user's stamp
const DEFAULT_SEAL_IMAGE = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Cstyle%3E.text%7Bfont-family:sans-serif;fill:%23166534;text-anchor:middle%7D.bold%7Bfont-weight:700%7D%3C/style%3E%3Cpath d='M150 50q30-30 50 10t50-20' stroke='%23166534' stroke-width='2' fill='none'/%3E%3Ctext x='200' y='80' class='text bold' font-size='20'%3EM. சீனிவாசன்%3C/text%3E%3Ctext x='200' y='105' class='text bold' font-size='16'%3Eதமிழ்நாடு மாநில தலைவர்%3C/text%3E%3Ctext x='200' y='128' class='text' font-size='12'%3Eநேஷனல் பிரண்ட் ஆஃப் இந்தியன் டிரேட் யூனியன்%3C/text%3E%3Ctext x='200' y='145' class='text' font-size='9'%3ERecognized by Govt of India Vide Order No. L-52025/202003-IR%3C/text%3E%3C/svg%3E";

export const DEFAULT_CARD_DATA: IdCardData = {
  firstName: 'M. Srinivasan',
  lastName: '',
  fatherName: 'Govindasamy',
  role: 'State President of Tamil Nadu',
  idNumber: 'NFITU-TN-001',
  district: 'Thiruvallur',
  bloodGroup: 'O+',
  issueDate: new Date().toISOString().split('T')[0],
  expiryDate: '2025-12-31',
  phone: '93815 66777',
  email: 'nfitunp@gmail.com',
  address: 'No 1053, 6th Street, Yamuna Nagar, Nazarathpettai',
  postOffice: 'Nazarathpettai Post',
  pincode: '600123',
  aadhar: 'XXXX XXXX XXXX',
  profileImage: null, 
  templateImage: DEFAULT_TEMPLATE_IMAGE,
  printTemplate: true, 
  signatureImage: DEFAULT_SEAL_IMAGE, // Set default seal
  orgLogo: null, 
  themeColor: '#166534', // NFITU Green
  accentColor: '#ea580c', // NFITU Orange
  orgName: 'National Front of Indian Trade Unions (DHN)',
  tagline: 'Global Coalition for Social Justice',
  refNumber: 'NFITU/TN/2024/01',
  specialHeader: 'APPOINTMENT ORDER',
  letterContent: '', 
};

export const SAMPLE_PROFILE_IMAGES = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/300?random=2',
  'https://picsum.photos/300/300?random=3',
];