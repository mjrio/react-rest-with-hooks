import { Action } from "react-fetching-library";
import { IProduct } from "../../models/product";

export interface IProductResult {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: IProduct[];
}

export const fetchProducts = (page: number, pageSize: number): Action => ({
  method: "GET",
  endpoint: `/products?page=${page}&pageSize=${pageSize}`
});
