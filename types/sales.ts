export interface Sale {
    id: number;
    businessDate: string;
    productId: number;
    size: "FULL" | "HALF" | "QUARTER";
    count: number;
    createdAt: string;
}