
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', text: string }[] = []) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    })),
    config: {
      systemInstruction: 'You are an expert college admissions counselor and tutor. Help high school students with subject questions, college applications, and writing tips. Keep responses encouraging and educational.',
    },
  });

  const response = await chat.sendMessage({ message: prompt });
  return response.text;
};

export const rateEssay = async (essay: string) => {
  const ai = getAI();
  const prompt = `Please rate this college admissions essay based on narrative strength, clarity, and impact. Provide a score out of 10 and specific improvement points.\n\nEssay:\n${essay}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const expandIdeasToEssay = async (ideas: string) => {
  const ai = getAI();
  const prompt = `Help me structure a college essay based on these initial ideas. Create an outline and a strong opening paragraph suggestion.\n\nIdeas:\n${ideas}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const spotMistakes = async (text: string) => {
  const ai = getAI();
  const prompt = `Please find and explain grammar mistakes, logic gaps, or tone inconsistencies in the following text. Suggest better alternatives.\n\nText:\n${text}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const getSubjectHelp = async (subject: string, topic: string) => {
  const ai = getAI();
  const prompt = `Act as an elite high school tutor. Explain "${topic}" in the context of "${subject}". 
  Provide exactly 5 distinct sections of explanation, each separated by the delimiter "---SLIDE---". 
  Section 1: Introduction and simple overview. 
  Section 2: First core concept with details. 
  Section 3: Second core concept or mechanism. 
  Section 4: Advanced insights or common pitfalls to avoid. 
  Section 5: A clear, step-by-step practical example. 
  Do not include headers like "Slide 1", just the content. Focus on clarity for high schoolers.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const generateQuiz = async (subject: string, topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 3-question multiple choice quiz about ${topic} in ${subject}. Include tricky but fair options.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: 'Four multiple choice options.'
            },
            correctAnswerIndex: { 
              type: Type.INTEGER,
              description: 'The 0-indexed position of the correct answer.'
            },
            explanation: { 
              type: Type.STRING,
              description: 'A brief explanation of why the answer is correct.'
            }
          },
          propertyOrdering: ['question', 'options', 'correctAnswerIndex', 'explanation']
        }
      }
    }
  });
  
  try {
    const jsonStr = response.text?.trim() || '[]';
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return null;
  }
};
