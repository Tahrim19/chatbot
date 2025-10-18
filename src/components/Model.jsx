import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY, 
});

export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // console.log(response.text); 
    return response.text;
  } catch (err) {
    console.error("Error generating content:", err);
    throw err;
  }
};

