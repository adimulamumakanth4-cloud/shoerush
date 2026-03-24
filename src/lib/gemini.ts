import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getShoeRecommendations(userPreferences: string, products: Product[]) {
  const productList = products.map(p => `${p.name} (${p.brand}) - ${p.category} - ₹${p.price}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert luxury shoe stylist for "Shoe Rush". 
    User preferences: ${userPreferences}
    Available products:
    ${productList}
    
    Recommend 3 shoes from the list that best match the user's style. Provide a brief, premium-sounding reason for each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["productName", "reason"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse AI recommendations", e);
    return [];
  }
}
