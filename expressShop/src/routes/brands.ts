import { Router, Request, Response } from 'express';
import { db } from '../db';
import { brands, insertBrandSchema } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /brands - Отримати всі бренди
router.get('/', async (req: Request, res: Response) => {
  try {
    const allBrands = await db.select().from(brands);
    res.json(allBrands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// POST /brands - Створити бренд
router.post('/', async (req: Request, res: Response) => {
  try {
    // Валідація даних через Zod
    const newBrandData = insertBrandSchema.parse(req.body);
    
    const result = await db.insert(brands).values(newBrandData).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error });
  }
});

export default router;