import { Action } from "react-fetching-library";

export interface IDeleteProductResult {
  id: number;
}

export const deleteProduct = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/products/${id}`
});
