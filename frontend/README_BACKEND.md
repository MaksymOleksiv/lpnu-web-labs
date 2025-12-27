# API README — для фронтенд-розробника

Коротко: цей README описує REST ендпоінти бекенду Laptop Shop, їх методи, очікувані тіла запитів і приклади відповідей.

Base URL
- Локально: http://localhost:<PORT>
- Порт: задається через змінну оточення `PORT` або за замовчуванням `3000`.

Головна (sanity check)
- GET /
  - Опис: повертає простий статус, що API запущено
  - Успішна відповідь: 200
  - Тіло відповіді:

```json
{ "message": "Laptop Shop API is running 🚀" }
```

Роут `brands`
- Базовий путь: `/brands`

1) GET /brands
- Опис: повертає масив усіх брендів
- Статус: 200
- Відповідь: масив об'єктів бренду. Поля (звернути увагу на найменування полів у схемі):
  - id: number
  - name: string
  - createdAt: string (timestamp)

Приклад відповіді:

```json
[
  { "id": 1, "name": "Apple", "createdAt": "2025-12-16T12:34:56.000Z" },
  { "id": 2, "name": "Dell", "createdAt": "2025-12-15T09:00:00.000Z" }
]
```

2) POST /brands
- Опис: створити новий бренд
- Статус: 201 (створено) у разі успіху
- Запит (JSON body): тіло повинно відповідати схемі вставки бренду (декларовано через Drizzle/Drizzle-Zod). Поля для вставки:
  - name: string (обов'язково)

Приклад тіла запиту:

```json
{ "name": "Lenovo" }
```

Успішна відповідь (201):

```json
{ "id": 3, "name": "Lenovo", "createdAt": "2025-12-16T13:00:00.000Z" }
```

Помилки:
- 400 — некоректні дані (валідація Zod або інші помилки вставки)
- 500 — серверна помилка


Роут `laptops`
- Базовий путь: `/laptops`
- При відповіді для списку і окремого ноутбука бекенд підтягує пов'язаний `brand` як вкладений об'єкт (поля бренду такі ж, як у `brands`).

1) GET /laptops
- Опис: повертає список ноутбуків, кожен елемент містить поле `brand` (об'єкт бренду)
- Query параметри (опціональні):
  - `priceFrom` (number) — мінімальна ціна (включно)
  - `priceTo` (number) — максимальна ціна (включно)
  - `ram` (number) — фільтр за об'ємом оперативної пам'яті в ГБ (точна відповідність)
  - `brandId` (number) — фільтр за ID бренду (точна відповідність)
- Приклад запиту: `GET /laptops?priceFrom=100000&priceTo=200000&ram=16&brandId=1`
- Статус: 200
- Поля об'єкта ноутбука:
  - id: number
  - brandId: number
  - model: string
  - price: number (ціна у цілих одиницях, в коді зазначено, що це центові/копійкові значення — наприклад 10000 означає 100.00)
  - cpu: string
  - ram: number (GB)
  - storage: number (GB)
  - imageUrl: string | null
  - createdAt: string (timestamp)
  - brand: { id, name, createdAt }  — вкладений об'єкт бренду

Приклад відповіді (елемент масиву):

```json
{
  "id": 10,
  "brandId": 1,
  "model": "MacBook Pro 14",
  "price": 249900,
  "cpu": "M3 Pro",
  "ram": 16,
  "storage": 512,
  "imageUrl": "https://.../macbook.jpg",
  "createdAt": "2025-12-10T10:00:00.000Z",
  "brand": { "id": 1, "name": "Apple", "createdAt": "2025-12-01T08:00:00.000Z" }
}
```

2) GET /laptops/:id
- Опис: повертає один ноутбук за `id` з вкладеним `brand`
- Статус:
  - 200 — знайдено
  - 404 — якщо ноутбук не знайдено
- Приклад 404:

```json
{ "error": "Laptop not found" }
```

3) POST /laptops
- Опис: додати новий ноутбук
- Статус: 201 при успішному створенні
- Тіло запиту (JSON): має відповідати схемі вставки ноутбука (Drizzle-Zod). Обов'язкові поля згідно схеми:
  - brandId: number (існуючий id бренду)
  - model: string
  - price: number (positive)
  - cpu: string
  - ram: number (positive)
  - storage: number (positive)
  - imageUrl: string (опціонально)

Приклад тіла запиту:

```json
{
  "brandId": 2,
  "model": "XPS 15",
  "price": 149900,
  "cpu": "Intel i7",
  "ram": 16,
  "storage": 1024,
  "imageUrl": "https://.../xps15.jpg"
}
```

Успішна відповідь (201): повертає збережений запис з id.

Помилки:
- 400 — невірні/неповні дані (Zod validation або інша помилка вставки)
- 500 — серверна помилка

4) DELETE /laptops/:id
- Опис: видалити ноутбук за `id`
- Статус: 200 (повідомлення про успішне видалення)
- Відповідь (успіх):

```json
{ "message": "Laptop deleted successfully" }
```

Помилки:
- 500 — якщо видалення не вдалось або серверна помилка


Загальні вказівки для фронтенду
- Відправляйте `Content-Type: application/json` для POST-запитів.
- Для полів `price`, `ram`, `storage` бекенд очікує числові значення (ціни — у «копійках»/центрах згідно коментаря в схеми).
- Якщо потрібно оновлювати/додавати додаткові фільтри/сортування — поговоримо про додатковий API (зараз є прості GET list та GET by id).

Приклади fetch (JS)

GET список ноутбуків

```js
// Без фільтрів
fetch('http://localhost:3000/laptops')
  .then(res => res.json())
  .then(data => console.log(data));

// З фільтрами (ціна від 100000 до 200000, RAM 16 ГБ, бренд Apple - id=1)
fetch('http://localhost:3000/laptops?priceFrom=100000&priceTo=200000&ram=16&brandId=1')
  .then(res => res.json())
  .then(data => console.log(data));
```

POST створення бренду

```js
fetch('http://localhost:3000/brands', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Lenovo' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

Якщо потрібно — можу додати Swagger/OpenAPI опис або коротку Postman колекцію для швидкого тестування API.

---
Файл згенеровано автоматично на основі коду в `src/index.ts`, `src/routes/*` та `src/db/schema.ts`.

Якщо хочеш, я також додам приклади помилкових відповідей (400/500) або короткий OpenAPI spec YAML.
