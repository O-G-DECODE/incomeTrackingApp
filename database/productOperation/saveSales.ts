import { getDatabase } from "../db";

export async function saveSales(
    businessDate: string,
    productId: number,
    size: string,
    count: number
) {
    const db = await getDatabase();

    await db.runAsync(
        `
        INSERT INTO Sales(
            businessDate,
            productId,
            size,
            count,
            createdAt
        )
        VALUES(?,?,?,?,?);
        `,
        businessDate,
        productId,
        size,
        count,
        new Date().toISOString()
    );
}