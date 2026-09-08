import { Router, Request, Response } from 'express';
import { AIService } from '../services/ai.service.js';

const router = Router();

// AI Requirement Analysis
router.post('/analyze-requirement', async (req: Request, res: Response) => {
  try {
    const { title = '', problem_description = '' } = req.body;
    const result = await AIService.analyzeRequirement(title, problem_description);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'AI Analysis failed' });
  }
});

// Mahi Assistant Chatbot
router.post('/mahi/chat', async (req: Request, res: Response) => {
  try {
    const { message, context = { page: 'home' } } = req.body;
    const result = await AIService.mahiChat(message, context);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Mahi assistant query failed' });
  }
});

export default router;
