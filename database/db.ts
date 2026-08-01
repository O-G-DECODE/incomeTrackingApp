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

      CREATE TABLE IF NOT EXISTS OpenShopProducts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    businessDate TEXT NOT NULL,
    productId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(id)
);

     CREATE TABLE IF NOT EXISTS Sales(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    businessDate TEXT NOT NULL,
    productId INTEGER NOT NULL,
    size TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(productId) REFERENCES Products(id)
);
    `);


    console.log("✅ Database ready");

    return database;


  } catch (error) {

    console.error(
      "❌ Database initialization error:",
      error
    );

    throw error;
  }
}