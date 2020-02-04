import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";
import { useQuery, useMutation } from "react-fetching-library";
import {
  fetchProducts,
  updateProduct as updateProductAction,
  deleteProduct as deleteProductAction
} from "../api/actions";
import { IProduct } from "../models/product";
import { IProductResult } from "../api/actions/fetchProducts";
import Navbar from "../components/Navbar";
import ProductModal from "./ProductModal";

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 10%;
  justify-content: space-evenly;
`;

const ProductGridCard = styled(ProductCard)`
  margin: 10px 5px;
`;

export default () => {
  let [page, setPage] = useState(0);
  let [selectedProduct, setSelectedProduct] = useState();
  let { payload, query: getProducts } = useQuery<IProductResult>(
    fetchProducts(page, 20)
  );
  const { mutate: updateProductMutation } = useMutation(updateProductAction);
  const { mutate: deleteProductMutation } = useMutation(deleteProductAction);

  const confirmProduct = (updatedProduct: IProduct) => {
    updateProductMutation(updatedProduct);
    setSelectedProduct(null);
    getProducts();
  };

  const deleteProduct = () => {
    deleteProductMutation(selectedProduct.id);
    setSelectedProduct(null);
    getProducts();
  };

  const productList = (productList?: IProduct[]) => {
    if (!productList) {
      return <p>No products found</p>;
    }
    return productList.map((product, i) => (
      <div key={i} onClick={() => setSelectedProduct(product)}>
        <ProductGridCard product={product} />
      </div>
    ));
  };

  const onPageChange = async (newPage: number) => {
    setPage(newPage - 1);
  };

  return (
    <div>
      <Navbar
        pageSize={payload?.pageSize || 0}
        totalItems={payload?.total || 0}
        currentPage={payload?.page || 0}
        changePage={onPageChange}
      ></Navbar>
      <ProductGrid>{productList(payload?.selectedProducts)}</ProductGrid>
      <ProductModal
        product={selectedProduct}
        visible={!!selectedProduct}
        onCancel={() => setSelectedProduct(null)}
        onConfirm={confirmProduct}
        onDelete={deleteProduct}
      ></ProductModal>
    </div>
  );
};
