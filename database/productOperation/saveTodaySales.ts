import { getDatabase } from "../db";

export async function saveTodaySales(
  businessDate: string,
  counts: Record<string, number>
) {

  const db = await getDatabase();

  // Delete today's sales
  await db.runAsync(
    `
    DELETE FROM Sales
    WHERE businessDate = ?;
    `,
    businessDate
  );

  // Insert latest sales
  for (const key in counts) {

    const count = counts[key];

    if (count <= 0) continue;

    const [productId, size] = key.split("-");

    await db.runAsync(
      `
      INSERT INTO Sales(
        businessDate,
        productId,
        size,
        count,
        createdAt
      )
      VALUES(?,?,?,?,?)
      `,
      businessDate,
      Number(productId),
      size,
      count,
      new Date().toISOString()
    );

  }

}