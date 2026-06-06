// app/api/research/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize securely with a fallback check
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    summary: { type: Type.STRING },
    keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
    trends: { type: Type.ARRAY, items: { type: Type.STRING } },
    challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
    references: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          url: { type: Type.STRING },
        },
        required: ['title', 'url'],
      },
    },
  },
  required: ['topic', 'summary', 'keyInsights', 'trends', 'challenges', 'references'],
};

export async function POST(request: Request) {
  try {
    // Check key presence immediately before firing the heavy API task
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Missing GEMINI_API_KEY inside .env.local file. Please check your root environment variables.' 
      }, { status: 401 });
    }

    const { topic } = await request.json();
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a comprehensive, high-quality research report about: ${topic}. Provide real or highly reliable domain-specific references with placeholder URLs if needed.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const reportText = response.text;
    if (!reportText) {
      throw new Error('No response content received from Gemini.');
    }

    return NextResponse.json(JSON.parse(reportText));

  } catch (error: any) {
    console.error('CRITICAL BACKEND ERROR:', error);
    // Return the real deep stack error directly to the UI instead of a generic string
    return NextResponse.json({ 
      error: `API Route internal error: ${error.message || error}` 
    }, { status: 500 });
  }
}