export interface Product {
  id: number;
  productName: string;
  fullPrice: number;
  halfPrice: number | null;
  quarterPrice: number | null;
  createdAt: string;
}