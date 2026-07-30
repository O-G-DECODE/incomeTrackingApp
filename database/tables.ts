import { getDatabase } from "./db";

export async function createTables() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      fullPrice REAL NOT NULL,
      halfPrice REAL,
      quarterPrice REAL,
      createdAt TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS OpenShopProducts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    businessDate Text NOT NULL,
    ProductId INTERGER NOT NULL,
    createdAt Text NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Products(id)
    );
    `);
}