import { getDatabase } from "../db";
import type { Product } from "@/types/product";


// Get All Products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const db = await getDatabase();

    console.log("Fetching products...");

    const tables = await db.getAllAsync(
  "SELECT name FROM sqlite_master WHERE type='table';"
);

console.log("Tables:", tables);

    const products = await db.getAllAsync<Product>(
      "SELECT * FROM Products ORDER BY id DESC;"
    );

    console.log(`✅ Products loaded: ${products.length}`);

    return products;

  } catch (error) {
    console.error("❌ getAllProducts failed:", error);
    throw error;
  }
}
