import { ShopProduct } from "@/types/shopProducts";
import { getDatabase } from "../db";
import type { Product } from "@/types/product";

export async function getOpenShopProducts(businessDate: string):Promise<ShopProduct[]> {
  const db = await getDatabase();

  console.log("Fetching Open Shop Products...");

  const rows = await db.getAllAsync<ShopProduct>(
    `
    SELECT
      OpenShopProducts.id,
      OpenShopProducts.businessDate,
      Products.id AS productId,
      Products.productName,
      Products.fullPrice,
      Products.halfPrice,
      Products.quarterPrice
    FROM OpenShopProducts
    INNER JOIN Products
      ON OpenShopProducts.productId = Products.id
    WHERE OpenShopProducts.businessDate = ?
    ORDER BY Products.productName;
    `,
    businessDate
  );

  console.log(rows);

  return rows as ShopProduct[];
}