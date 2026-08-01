import type { Product } from "@/types/product";
import { showError } from "@/utils/alert";
import { getAllProducts } from "./productOperation/getAllProduct";

export async function loadProducts(
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) {
  try {
    const productList = await getAllProducts();
    setProducts(productList);
  } catch (error) {
    showError(error);
    console.log(error)
  }
}