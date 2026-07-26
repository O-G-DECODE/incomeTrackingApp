import Products from "@/app/(tabs)/products";
import { getDatabase } from "./db";
import type { Product } from "@/types/product";
export async function addProduct(
  productName: string,
  fullPrice: number,
  halfPrice: number | null,
  quarterPrice: number | null
) {
  const db = await getDatabase();

  await db.runAsync(
    `
      INSERT INTO Products (
        productName,
        fullPrice,
        halfPrice,
        quarterPrice,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?);
    `,
    productName,
    fullPrice,
    halfPrice,
    quarterPrice,
    new Date().toISOString()
  );
}
export async function getAllProducts(): Promise<Product[]> {
  const db = await getDatabase();

  console.log("Database opened");

  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table';"
  );

  console.log("Tables:", tables);

  const products = await db.getAllAsync<Product>(
    "SELECT * FROM Products"
  );

  console.log("Products:", products);

  return products;
}

export async function deleteProduct(id: number) {
  const db = getDatabase();

  (await db).runAsync(
    `DELETE FROM Products WHERE id = ?;` , id
  );
}