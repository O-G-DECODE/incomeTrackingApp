import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {

  try {

    if (database) {
      return database;
    }

    console.log("Opening SQLite database...");

    database = await SQLite.openDatabaseAsync(
      "billing_v2.db"
    );


    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        fullPrice REAL NOT NULL,
        halfPrice REAL,
        quarterPrice REAL,
        createdAt TEXT NOT NULL
      );
    `);


    console.log("✅ Database ready");

    return database;


  } catch(error) {

    console.error(
      "❌ Database initialization error:",
      error
    );

    throw error;
  }
}