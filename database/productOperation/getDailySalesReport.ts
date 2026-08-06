import { getDatabase } from "../db";

export async function getDailySalesReport(
  businessDate: string
) {
  const db = await getDatabase();

  return await db.getAllAsync(
    `
    SELECT
      s.productId,
      p.productName,
      s.size,
      s.count,
      CASE
        WHEN s.size = 'full' THEN p.fullPrice
        WHEN s.size = 'half' THEN p.halfPrice
        WHEN s.size = 'quarter' THEN p.quarterPrice
      END AS price,

      s.count *
      CASE
        WHEN s.size = 'full' THEN p.fullPrice
        WHEN s.size = 'half' THEN p.halfPrice
        WHEN s.size = 'quarter' THEN p.quarterPrice
      END AS total

    FROM Sales s
    INNER JOIN Products p
      ON s.productId = p.id

    WHERE s.businessDate = ?

    ORDER BY p.productName, s.size;
    `,
    businessDate
  );
}