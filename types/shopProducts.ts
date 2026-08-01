export interface ShopProduct {
  productId: number;
  productName: string;
  fullPrice: number;
  halfPrice: number | null;
  quarterPrice: number | null;
}