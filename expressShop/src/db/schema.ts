import { pgTable, serial, text, integer, decimal, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// --- Таблиця Брендів (Brands) ---
export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // Наприклад: "Apple", "Dell"
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Таблиця Ноутбуків (Laptops) ---
export const laptops = pgTable('laptops', {
  id: serial('id').primaryKey(),
  brandId: integer('brand_id').references(() => brands.id).notNull(), // Зовнішній ключ
  model: text('model').notNull(),         // Наприклад: "MacBook Pro 14"
  price: integer('price').notNull(),      // Ціна в цент/копійках, щоб уникнути помилок float (10000 = 100.00 грн)
  cpu: text('cpu').notNull(),             // Наприклад: "M3 Pro"
  ram: integer('ram').notNull(),          // RAM в ГБ
  storage: integer('storage').notNull(),  // SSD в ГБ
  imageUrl: text('image_url'),            // Посилання на фото
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Зв'язки (Relations) ---
// Це потрібно для Drizzle query builder (щоб робити запити типу "знайти ноут і його бренд")

export const brandsRelations = relations(brands, ({ many }) => ({
  laptops: many(laptops),
}));

export const laptopsRelations = relations(laptops, ({ one }) => ({
  brand: one(brands, {
    fields: [laptops.brandId],
    references: [brands.id],
  }),
}));

// --- Zod Schemas ---
// Генеруємо схеми для валідації вхідних даних (insert) та вихідних (select)

// Схема для створення бренду (id генерується базою, тому він не потрібен при вставці)
export const insertBrandSchema = createInsertSchema(brands);

// Схема для створення ноутбука (валідція даних, що приходять з фронтенду)
export const insertLaptopSchema = createInsertSchema(laptops, {
  price: (schema) => schema.positive(), // Додаткова перевірка Zod: ціна > 0
  ram: (schema) => schema.positive(),
  storage: (schema) => schema.positive(),
});

// Типи TypeScript, виведені з бази даних
export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type Laptop = typeof laptops.$inferSelect;
export type NewLaptop = typeof laptops.$inferInsert;