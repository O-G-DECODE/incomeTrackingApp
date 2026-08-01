import { getDatabase } from "../db";
import type { Product } from "@/types/product";


// Add Product
export async function addProduct(
  productName: string,
  fullPrice: number,
  halfPrice: number | null,
  quarterPrice: number | null
) {
  try {
    const db = await getDatabase();

    console.log("ADD PRODUCT:", {
      productName,
      fullPrice,
      halfPrice,
      quarterPrice,
    });

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

    console.log("✅ Product added successfully");

  } catch (error) {
    console.error("❌ addProduct failed:", error);
    throw error;
  }
}
