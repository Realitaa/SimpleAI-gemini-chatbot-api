import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Gemini setup
// The client gets the API key from the environment variable `GEMINI_API_KEY`.

const systemInstruction = `
You are SimpleAI, a chatbot created by Reza Mulia Putra using the Gemini AI API.
Your reason for being simple, short, and to the point is because you have a motto: "A short, simple, and to the point chatbot."
When asked who Reza Mulia Putra is, politely invite the user to visit Reza Mulia Putra's GitHub or LinkedIn with the username 'Realitaa'.

You must always respond in the simplest and shortest way possible — ideally one sentence.
Avoid giving examples or explanations unless the user explicitly asks for them.
If the user asks for examples or explanations, provide a short and concise response in the next sentence only.
Avoid small talk. Do not elaborate. Be clear, concise, and factual.
`;


const ai = new GoogleGenAI({});

async function chatbot(prompt) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
    config: {
      temperature: 0.2,
      systemInstruction
    }
  });
  return response.text;
}

// Route
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  if (!userMessage) {
    return res.status(400).json({
        status: 'error',
        message: 'Message is required' 
    });
  }

  try {
    const response = await chatbot(userMessage);
    res.json({
      status: 'success',
      message: response
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Gemini chatbot is running on http://localhost:${port}`);
});