import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (history: {role: string, text: string}[], message: string): Promise<string> => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: chatHistory,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: `You are the virtual concierge for "A Cu" (formerly Restaurant Aktivist) in Eisenhüttenstadt.
        Your tone is polite, professional, and welcoming (in German).
        You can help with menu questions, reservation info, and general inquiries.
        The restaurant specializes in meat dishes and German cuisine.
        Address: Karl-Marx-Straße 45, 15890 Eisenhüttenstadt.
        Phone: +49 163 8866863.
        Email: rhekmati38@gmail.com.
        Open Tue-Sun from 11:30. Monday Closed.`,
      }
    });
    
    const result = await chat.sendMessage({ message });
    return result.text || "Entschuldigung, ich konnte das nicht verstehen.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ich habe derzeit Schwierigkeiten, eine Verbindung herzustellen. Bitte versuchen Sie es später erneut.";
  }
};

export const getSommelierRecommendation = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: message,
      config: {
        systemInstruction: `You are the AI Sommelier for "A Cu" restaurant. 
        You specialize in wine pairings for hearty German meat dishes.
        You are knowledgeable, polite, and brief.
        If the user asks about ingredients, describe them appetizingly.
        Menu highlights include: Soljanka, Schnitzel, Rumpsteak, Grillteller.
        Respond in the language of the user (German or English).`,
      }
    });
    return response.text || "Entschuldigung, ich habe gerade keine Empfehlung parat.";
  } catch (error) {
    console.error("Sommelier Error:", error);
    return "Ich kann gerade nicht auf den Weinkeller zugreifen.";
  }
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Audio
            }
          },
          { text: "Transcribe the spoken language in this audio to text. Return only the transcription, no other text." }
        ]
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Transcription Error:", error);
    return "";
  }
};

// Export the AI instance for Live API usage in components if needed, 
// though typically we create new instances or use the one here. 
// Since Live API connect is a method on the instance, we can export the instance.
export { ai };
