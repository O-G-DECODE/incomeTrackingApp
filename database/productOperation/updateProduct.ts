import { getDatabase } from "../db";
import type { Product } from "@/types/product";

// Update Product
export async function updateProduct(
  id: number,
  productName: string,
  fullPrice: number,
  halfPrice: number | null,
  quarterPrice: number | null
) {
  try {
    const db = await getDatabase();

    console.log("Updating product:", id);

    const result = await db.runAsync(
      `
      UPDATE Products
      SET
        productName = ?,
        fullPrice = ?,
        halfPrice = ?,
        quarterPrice = ?,
        createdAt = ?
      WHERE id = ?;
      `,
      productName,
      fullPrice,
      halfPrice,
      quarterPrice,
      new Date().toISOString(),
      id
    );

    console.log(
      "✅ Update completed. Rows affected:",
      result.changes
    );

  } catch (error) {
    console.error("❌ updateProduct failed:", error);
    throw error;
  }
}
