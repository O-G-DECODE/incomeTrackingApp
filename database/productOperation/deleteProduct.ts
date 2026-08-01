import { getDatabase } from "../db";
import type { Product } from "@/types/product";

// Delete Product
export async function deleteProduct(id: number) {
  try {
    const db = await getDatabase();

    console.log("Deleting product ID:", id);

    const result = await db.runAsync(
      "DELETE FROM Products WHERE id = ?;",
      id
    );

    console.log(
      "✅ Delete completed. Rows affected:",
      result.changes
    );

  } catch (error) {
    console.error("❌ deleteProduct failed:", error);
    throw error;
  }
}
