import { GoogleGenAI } from "@google/genai";

export const generateBlogContent = async (topic: string, context: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are an expert technical writer for a blog about Software Testing, Playwright, and JavaScript.
      Write a blog post section about: "${topic}".
      Context/Notes: ${context}.
      
      Format the output in clean Markdown. 
      Do not include a preamble or postscript, just the content.
      Keep it professional, technical, and concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || '';
  } catch (error) {
    console.error("Gemini generation failed:", error);
    throw error;
  }
};

export const generateBlogIdeas = async (): Promise<string[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "List 5 engaging blog post titles for a Senior SDET specialized in Playwright and TypeScript. Return as a simple JSON array of strings.",
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const text = response.text || '[]';
        return JSON.parse(text);
    } catch (e) {
        console.error("Failed to generate ideas", e);
        return [];
    }
}