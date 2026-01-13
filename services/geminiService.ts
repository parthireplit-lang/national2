import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedProfile } from "../types";

export const generateRandomProfile = async (): Promise<GeneratedProfile | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a realistic Tamil profile for a political appointment order. All string values MUST be in Tamil language script. Return JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            firstName: { type: Type.STRING, description: "Name in Tamil (e.g. திரு. முருகன்)" },
            fatherName: { type: Type.STRING, description: "Father's name in Tamil" },
            role: { type: Type.STRING, description: "Political Role in Tamil (e.g. ஒன்றிய செயலாளர்)" },
            district: { type: Type.STRING, description: "Tamil Nadu District in Tamil" },
            address: { type: Type.STRING, description: "Street address in Tamil" },
            postOffice: { type: Type.STRING, description: "Post office name in Tamil" },
            pincode: { type: Type.STRING, description: "6 digit pincode" },
            aadhar: { type: Type.STRING, description: "12 digit number formatted 0000 0000 0000" },
            specialHeader: { type: Type.STRING, description: "Header like 'தலைமை நிலைய அறிவிப்பு'" },
          },
          required: ["firstName", "fatherName", "role", "district", "address", "postOffice", "pincode", "aadhar", "specialHeader"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedProfile;
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};