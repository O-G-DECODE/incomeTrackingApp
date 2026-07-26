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
}