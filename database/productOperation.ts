import { getDatabase } from "./db";

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