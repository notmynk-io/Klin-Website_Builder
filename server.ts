import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Shared Gemini client setup
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Endpoints
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Block Generator
  app.post('/api/ai/generate-block', async (req, res) => {
    try {
      const { prompt, category } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getGenAI();
      const systemInstruction = `You are an expert HTML and Tailwind CSS UI designer building blocks for a visual drag-and-drop website builder.
Return ONLY a valid JSON object matching this TypeScript schema, with NO markdown code block wrappers around the JSON:
{
  "name": "Component Name",
  "tagName": "section" | "div" | "header" | "footer",
  "classes": "tailwind classes",
  "children": [
    {
      "tagName": "div" | "h1" | "h2" | "h3" | "p" | "button" | "img" | "a" | "span" | "input",
      "name": "Element name",
      "classes": "tailwind classes",
      "attributes": { "src": "...", "href": "...", "alt": "...", "placeholder": "..." },
      "content": "Text inside leaf node if applicable",
      "children": []
    }
  ]
}

Guidelines:
- Use modern, beautiful Tailwind CSS utility classes (e.g. flex, grid, bg-slate-900, text-white, px-6, py-12, rounded-xl, shadow-lg, transition, hover:bg-indigo-600).
- Make sure images use valid Unsplash placeholders (e.g. https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80).
- Ensure semantic tags and clean structure.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Generate a web block for category "${category || 'General'}": ${prompt}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const rawText = response.text || '{}';
      const cleanJson = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const nodeData = JSON.parse(cleanJson);

      res.json({ success: true, block: nodeData });
    } catch (error: any) {
      console.error('AI Generate Block Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to generate AI component',
      });
    }
  });

  // AI Copy Refiner / Text Rewriter
  app.post('/api/ai/refine-copy', async (req, res) => {
    try {
      const { text, instruction } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text content is required' });
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Original copy: "${text}"\nInstruction: ${instruction || 'Rewrite to be more engaging, clear, and professional.'}`,
        config: {
          systemInstruction: 'You are a professional web copywriter. Output ONLY the refined final text string with no quotes or explanation.',
          temperature: 0.7,
        },
      });

      const refinedText = (response.text || text).trim();
      res.json({ success: true, text: refinedText });
    } catch (error: any) {
      console.error('AI Refine Copy Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to refine text',
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
