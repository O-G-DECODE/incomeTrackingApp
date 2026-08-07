import { getDatabase } from "../db";

export async function loadMonthlyReport(year: number, month: number) {
  const db = await getDatabase();

  const report = await db.getAllAsync(
    `
    SELECT
      p.productName,
      s.size,
      SUM(s.count) AS totalCount,

      CASE
        WHEN s.size = 'FULL' THEN p.fullPrice
        WHEN s.size = 'HALF' THEN p.halfPrice
        WHEN s.size = 'QUARTER' THEN p.quarterPrice
      END AS price,

      SUM(
        s.count *
        CASE
          WHEN s.size = 'FULL' THEN p.fullPrice
          WHEN s.size = 'HALF' THEN p.halfPrice
          WHEN s.size = 'QUARTER' THEN p.quarterPrice
        END
      ) AS totalAmount

    FROM Sales s
    JOIN Products p
      ON p.id = s.productId

    WHERE strftime('%Y', s.businessDate) = ?
      AND strftime('%m', s.businessDate) = ?

    GROUP BY
      p.id,
      p.productName,
      s.size

    ORDER BY
      p.productName;
    `,
    
    [
      year.toString(),
      month.toString().padStart(2, "0"),
    ]
  );
  

  return report;
}