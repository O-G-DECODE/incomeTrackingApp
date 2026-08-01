import { getDatabase } from "../db";

export async function getTodaySales(
    businessDate: string
) {
    const db = await getDatabase();

    return await db.getAllAsync(
        `
        SELECT *
        FROM Sales
        WHERE businessDate = ?;
        `,
        businessDate
    );
}