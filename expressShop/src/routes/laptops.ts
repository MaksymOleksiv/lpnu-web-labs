import { Router, Request, Response } from 'express';
import { db } from '../db';
import { laptops, insertLaptopSchema } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /laptops - Отримати всі ноутбуки (разом з брендом)
// Query параметри: ?priceFrom=10000&priceTo=50000&ram=16&brandId=1
router.get('/', async (req: Request, res: Response) => {
  try {
    const { priceFrom, priceTo, ram, brandId } = req.query;

    // Використовуємо query API для зручного join-у з таблицею брендів
    const allLaptops = await db.query.laptops.findMany({
      with: {
        brand: true,
      },
      where: (laptops, { and, gte, lte, eq }) => {
        const conditions = [];
        
        // Фільтр за мінімальною ціною
        if (priceFrom) {
          conditions.push(gte(laptops.price, Number(priceFrom)));
        }
        
        // Фільтр за максимальною ціною
        if (priceTo) {
          conditions.push(lte(laptops.price, Number(priceTo)));
        }
        
        // Фільтр за оперативною пам'яттю
        if (ram) {
          conditions.push(eq(laptops.ram, Number(ram)));
        }
        
        // Фільтр за брендом
        if (brandId) {
          conditions.push(eq(laptops.brandId, Number(brandId)));
        }
        
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      orderBy: (laptops, { desc }) => [desc(laptops.id)],
    });
    res.json(allLaptops);
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch laptops' });
  }
});

// GET /laptops/:id - Отримати один ноутбук
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const laptop = await db.query.laptops.findFirst({
      where: eq(laptops.id, Number(id)),
      with: { brand: true },
    });

    if (!laptop) {
      return res.status(404).json({ error: 'Laptop not found' });
    }
    res.json(laptop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /laptops - Додати ноутбук
router.post('/', async (req: Request, res: Response) => {
  try {
    // Валідуємо вхідні дані через Zod схему
    const newLaptopData = insertLaptopSchema.parse(req.body);

    const result = await db.insert(laptops).values(newLaptopData).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    // Якщо помилка валідації Zod або бази даних
    res.status(400).json({ error: 'Invalid data', details: error });
  }
});

// DELETE /laptops/:id - Видалити ноутбук
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(laptops).where(eq(laptops.id, Number(id)));
    res.json({ message: 'Laptop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete laptop' });
  }
});

export default router;