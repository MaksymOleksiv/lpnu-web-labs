import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

// Імпортуємо роути
import brandsRouter from './routes/brands';
import laptopsRouter from './routes/laptops';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Підключаємо роути
app.use('/brands', brandsRouter);
app.use('/laptops', laptopsRouter);

// Головна сторінка
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Laptop Shop API is running 🚀' });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});