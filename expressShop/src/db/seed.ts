import { db } from './index';
import { brands, laptops } from './schema';
import { sql } from 'drizzle-orm';

// Дані для брендів
const brandsData = [
  { name: 'Apple' },
  { name: 'Asus' },
  { name: 'Lenovo' },
  { name: 'Dell' },
  { name: 'HP' },
  { name: 'Acer' },
  { name: 'MSI' },
  { name: 'Razer' },
];

// Тип для сирих даних ноутбука (замість brandId ми використовуємо назву бренду для зручності)
type LaptopSeedData = {
  brandName: string;
  model: string;
  price: number; // у копійках
  cpu: string;
  ram: number;
  storage: number;
  imageUrl: string;
};

const laptopsData: LaptopSeedData[] = [
  // --- Apple ---
  { brandName: 'Apple', model: 'MacBook Air M1', price: 3800000, cpu: 'M1', ram: 8, storage: 256, imageUrl: 'https://placehold.co/600x400?text=MacBook+Air+M1' },
  { brandName: 'Apple', model: 'MacBook Air M2', price: 4900000, cpu: 'M2', ram: 8, storage: 512, imageUrl: 'https://placehold.co/600x400?text=MacBook+Air+M2' },
  { brandName: 'Apple', model: 'MacBook Pro 14 M3', price: 7500000, cpu: 'M3 Pro', ram: 18, storage: 512, imageUrl: 'https://placehold.co/600x400?text=MacBook+Pro+14' },
  { brandName: 'Apple', model: 'MacBook Pro 16 M3 Max', price: 14000000, cpu: 'M3 Max', ram: 36, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=MacBook+Pro+16' },

  // --- Asus ---
  { brandName: 'Asus', model: 'ROG Strix G16', price: 6200000, cpu: 'Intel i7-13650HX', ram: 16, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=ROG+Strix+G16' },
  { brandName: 'Asus', model: 'TUF Gaming F15', price: 3500000, cpu: 'Intel i5-11400H', ram: 16, storage: 512, imageUrl: 'https://placehold.co/600x400?text=TUF+Gaming' },
  { brandName: 'Asus', model: 'ZenBook 14 OLED', price: 4200000, cpu: 'Intel Core Ultra 7', ram: 16, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=ZenBook+14' },

  // --- Lenovo ---
  { brandName: 'Lenovo', model: 'Legion 5 Pro', price: 6800000, cpu: 'AMD Ryzen 7 7745HX', ram: 32, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=Legion+5+Pro' },
  { brandName: 'Lenovo', model: 'ThinkPad X1 Carbon', price: 8500000, cpu: 'Intel i7-1355U', ram: 16, storage: 512, imageUrl: 'https://placehold.co/600x400?text=ThinkPad+X1' },
  { brandName: 'Lenovo', model: 'IdeaPad Gaming 3', price: 2900000, cpu: 'AMD Ryzen 5 5600H', ram: 8, storage: 512, imageUrl: 'https://placehold.co/600x400?text=IdeaPad+Gaming' },

  // --- Dell ---
  { brandName: 'Dell', model: 'XPS 13 Plus', price: 7200000, cpu: 'Intel i7-1260P', ram: 16, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=Dell+XPS+13' },
  { brandName: 'Dell', model: 'Alienware m16', price: 9500000, cpu: 'Intel i9-13900HX', ram: 32, storage: 2000, imageUrl: 'https://placehold.co/600x400?text=Alienware+m16' },

  // --- Acer ---
  { brandName: 'Acer', model: 'Nitro 5', price: 3100000, cpu: 'Intel i5-12500H', ram: 16, storage: 512, imageUrl: 'https://placehold.co/600x400?text=Acer+Nitro+5' },
  { brandName: 'Acer', model: 'Predator Helios 300', price: 5800000, cpu: 'Intel i7-12700H', ram: 16, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=Predator+Helios' },

  // --- MSI ---
  { brandName: 'MSI', model: 'Katana GF66', price: 3400000, cpu: 'Intel i5-12450H', ram: 16, storage: 512, imageUrl: 'https://placehold.co/600x400?text=MSI+Katana' },
  { brandName: 'MSI', model: 'Raider GE78', price: 11000000, cpu: 'Intel i9-13980HX', ram: 64, storage: 2000, imageUrl: 'https://placehold.co/600x400?text=MSI+Raider' },
  
   // --- Razer ---
  { brandName: 'Razer', model: 'Blade 14', price: 9200000, cpu: 'AMD Ryzen 9 7940HS', ram: 16, storage: 1000, imageUrl: 'https://placehold.co/600x400?text=Razer+Blade+14' },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. Очищення таблиць (Laptops видаляємо першими через foreign key constraints)
    console.log('🧹 Cleaning old data...');
    await db.delete(laptops);
    await db.delete(brands);
    
    // Опціонально: скидання лічильників ID (працює в PostgreSQL)
    // await db.execute(sql`TRUNCATE TABLE brands, laptops RESTART IDENTITY CASCADE`);

    // 2. Вставка брендів
    console.log('🏷️ Inserting brands...');
    const insertedBrands = await db.insert(brands).values(brandsData).returning();
    
    // Створюємо мапу: "Назва бренду" -> ID (щоб легко знаходити ID для ноутбуків)
    const brandMap = new Map<string, number>();
    insertedBrands.forEach((b) => brandMap.set(b.name, b.id));

    // 3. Підготовка даних ноутбуків з правильними brandId
    console.log('💻 Preparing laptop data...');
    const laptopsToInsert = laptopsData.map((laptop) => {
      const brandId = brandMap.get(laptop.brandName);
      if (!brandId) {
        throw new Error(`Brand not found: ${laptop.brandName}`);
      }
      
      return {
        brandId: brandId,
        model: laptop.model,
        price: laptop.price,
        cpu: laptop.cpu,
        ram: laptop.ram,
        storage: laptop.storage,
        imageUrl: laptop.imageUrl
      };
    });

    // 4. Вставка ноутбуків
    console.log(`📦 Inserting ${laptopsToInsert.length} laptops...`);
    await db.insert(laptops).values(laptopsToInsert);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();