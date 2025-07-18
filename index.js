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
const ai = new GoogleGenAI({});

async function chatbot(prompt) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
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