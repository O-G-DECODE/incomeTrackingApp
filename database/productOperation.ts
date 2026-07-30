import Products from "@/app/(tabs)/products";
import { getDatabase } from "./db";
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


// Get All Products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const db = await getDatabase();

    console.log("Fetching products...");

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

// open shop

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


// fetch data from the openShop

export async function getOpenShopProducts(){
  const db = await getDatabase()

  console.log("going to fetch data from openShop Products")

  const rows = await db.getAllAsync(`
    SELECT * FROM OpenShopProducts
    `)
  console.log(rows)
  return rows
}