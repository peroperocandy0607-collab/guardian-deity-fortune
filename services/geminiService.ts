/// <reference types="vite/client" />

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, FortuneResult } from "../types";

// Schema definition for strict JSON output
const fortuneSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    deityName: {
      type: Type.STRING,
      description: "Name of the Guardian Deity. Selected from 156 types. Must be SHORT and COOL (e.g., '白銀の龍神', '月読命', '大天使ガブリエル'). Max 10 characters.",
    },
    deityTitle: {
      type: Type.STRING,
      description: "A short, mystical title for the deity.",
    },
    deityDescription: {
      type: Type.STRING,
      description: "A description of the deity's personality and cute appearance.",
    },
    deityVisualDescription: {
      type: Type.STRING,
      description: "A detailed visual description for image generation.",
    },
    essence: {
      type: Type.STRING,
      description: "【本質】Long text. Negative 80%, Positive 20%. MUST END with '【本質のまとめ】' followed by 3 distinct bullet points exposing subconscious patterns.",
    },
    love: {
      type: Type.STRING,
      description: "【恋愛】Long text. Negative 80%, Positive 20%. MUST END with '【恋愛アドバイス】' followed by 3 distinct bullet points focusing on fate and ending.",
    },
    work: {
      type: Type.STRING,
      description: "【仕事】Long text. Negative 80%, Positive 20%. MUST END with '【向いている仕事・才能】' followed by 3 distinct bullet points on qualities and environment.",
    },
    destiny: {
      type: Type.STRING,
      description: "【命運】Long text. Negative 80%, Positive 20%. MUST END with '【運命の傾向】' followed by 3 distinct bullet points on trials and salvation.",
    },
    timeline: {
      type: Type.ARRAY,
      description: "【運命の転機】Detailed life timeline. MUST follow the strict '80 Patterns' and 'Yi Jing' rules defined in the system prompt.",
      items: {
        type: Type.OBJECT,
        properties: {
          period: { type: Type.STRING, description: "Specific age (e.g., '7歳')." },
          description: { type: Type.STRING, description: "Must include a UNIQUE HEADER followed by the event description." }
        },
        required: ["period", "description"]
      }
    },
    luckyColor: { type: Type.STRING },
    guardianItem: { type: Type.STRING },
    soulConnection: { type: Type.STRING }
  },
  required: [
    "deityName",
    "deityTitle",
    "deityDescription",
    "deityVisualDescription",
    "essence",
    "love",
    "work",
    "destiny",
    "timeline",
    "luckyColor",
    "guardianItem",
    "soulConnection"
  ],
};

// Helper function
const formatText = (text: string): string => {
  if (!text) return "";
  return text.replace(/。(\s*)/g, "。\n\n");
};

export const generateFortune = async (
  input: UserInput
): Promise<FortuneResult> => {

  const apiKey = import.meta.env.VITE_API_KEY as string;

if (!apiKey) {
  throw new Error("API Key is missing.");
}

const ai = new GoogleGenAI({ apiKey });


  const textPrompt = `
（※ここから下のプロンプトは一切変更していません）
あなたは「守護神占い」の最高級鑑定エンジンです。
（中略：あなたが書いた全文そのまま）
JSON形式で出力。
`;

  let fortuneResult: FortuneResult;

  try {
    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: fortuneSchema,
        temperature: 1.0,
      },
    });

    if (!textResponse.text) throw new Error("No text response");
    fortuneResult = JSON.parse(textResponse.text) as FortuneResult;

    fortuneResult.essence = formatText(fortuneResult.essence);
    fortuneResult.love = formatText(fortuneResult.love);
    fortuneResult.work = formatText(fortuneResult.work);
    fortuneResult.destiny = formatText(fortuneResult.destiny);

  } catch (error) {
    console.error("Text Generation Error:", error);
    throw error;
  }

  try {
    const imagePrompt = `
Create a unique, high-quality "Original Character Design" of a Japanese Deity named "${fortuneResult.deityName}".
${fortuneResult.deityVisualDescription}
`;

    const imageResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts: [{ text: imagePrompt }] },
    });

    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        fortuneResult.deityImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (imageError) {
    console.error("Image Generation Error:", imageError);
  }

  return fortuneResult;
};
