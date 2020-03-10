import { IProduct } from "../models/product";

const BASE_URL = "http://localhost:3000/api";

export interface IProductResult {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: IProduct[];
}

export function getProductsUrl(page: number, pageSize: number) {
  return `${BASE_URL}/products?page=${page}&pageSize=${pageSize}`;
}

export function saveProductUrl(id: number) {
  return `${BASE_URL}/products/${id}`;
}

export function deleteProductUrl(id: number) {
  // Same url as save
  return saveProductUrl(id);
}
