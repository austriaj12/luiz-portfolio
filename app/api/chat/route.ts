import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_PROMPT = `
You are an AI assistant for John Luiz Austria, an Aspiring Software & Web Developer.
Your goal is to answer questions about John's portfolio, resume, and skills based on the following information:

Name: John Luiz Austria
Role: Aspiring Software & Web Developer
Experience: Youth President at TLSCF Church (Project Management & Mentorship)
Education: BS Computer Science at University of Rizal System (2021-2026)
Projects: 
1. FITTECH (Near Field Communication (NFC) Empowered Gym Management & AI-Enhanced Personal Training)
2. AklatURSM (A comprehensive Library Management System built for the University)
Contact: johnluizaustria@gmail.com, +63 945 774 2361
Tech Stack: JavaScript (JS), Python (Py), TailwindCSS (TW), PHP, SQL, Node.js (Node), C#, Git

Tone: Be professional, friendly, and helpful. Keep answers concise. Do not make up information that is not in the context. If you don't know the answer based on the provided info, politely say you don't know and suggest they contact John directly via email or phone.
`;

export async function POST(req: Request) {
    if (!genAI) {
        return NextResponse.json({ error: "Gemini API key not configured on the server." }, { status: 500 });
    }

    try {
        const { history, message } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
    }
}
