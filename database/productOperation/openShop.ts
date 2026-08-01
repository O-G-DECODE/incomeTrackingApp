import { getDatabase } from "../db";
import type { Product } from "@/types/product";

export async function openShop(
  businessDate: string,
  productIds: number[]
) {
  const db = await getDatabase();

  console.log("Deleting old records...");

  await db.runAsync(
    "DELETE FROM OpenShopProducts WHERE businessDate = ?;",
    businessDate
  );

  console.log("Delete completed");

  for (const productId of productIds) {
    console.log("Inserting:", productId);

    await db.runAsync(
      `INSERT INTO OpenShopProducts
      (businessDate, productId, createdAt)
      VALUES (?, ?, ?);`,
      businessDate,
      productId,
      new Date().toISOString()
    );
  }

  console.log("Open shop completed");
}
