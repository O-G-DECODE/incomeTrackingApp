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

    const products = await db.getAllAsync<Product>(
        `SELECT * FROM Products`
    );

    return products;
}