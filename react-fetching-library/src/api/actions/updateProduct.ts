import { Action } from "react-fetching-library";
import { IProduct } from "../../models/product";

export interface IProductUpdateResult {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: IProduct[];
}

export const updateProduct = (product: IProduct): Action => ({
  method: "PUT",
  endpoint: `/products/${product.id}`,
  body: product
});
