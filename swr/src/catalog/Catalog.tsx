import React, { useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { useQuery } from '../api/useQuery';

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import ProductModal from "../components/ProductModal";
import { IProduct } from "../models/product";
import fetcher, { save, deleteItem } from "../api/fetcher";
import {
  getProductsUrl,
  saveProductUrl,
  IProductResult,
  deleteProductUrl
} from "../api/products";

// !!! Should be used with Test-api: https://github.com/Euricom/euricom-test-api !!!

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
  let { data } = useSWR<IProductResult>(getProductsUrl(page, 20), fetcher);

  const url = `products?page=${page}&pageSize=20`;
  const { data, isLoading } = useQuery<IProductResult>(url);

  const confirmProduct = async (updatedProduct: IProduct) => {
    // Save product (with Fetch in this case)
    await save(updatedProduct, saveProductUrl(updatedProduct.id));
    // Let the cache know the data has been updated
    mutate(getProductsUrl(page, 20), {
      ...data,
      selectedProducts: updateProductList(updatedProduct)
    });
    // Deselect the product
    setSelectedProduct(null);
  };

  const updateProductList = (updatedProduct: IProduct): IProduct[] => {
    return (data?.selectedProducts || []).map((p: IProduct) => {
      if (p.id === updatedProduct.id) {
        return updatedProduct;
      }
      return p;
    });
  };

  const deleteProduct = async () => {
    await deleteItem(deleteProductUrl(selectedProduct.id));
    setSelectedProduct(null);
    mutate(getProductsUrl(page, 20), {
      ...data,
      selectedProducts: filterProductList(selectedProduct.id)
    });
  };

  const filterProductList = (selectedProductId: number): IProduct[] => {
    return (data?.selectedProducts || []).filter(
      p => p.id !== selectedProductId
    );
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
        pageSize={data?.pageSize || 0}
        totalItems={data?.total || 0}
        currentPage={data?.page || 0}
        changePage={onPageChange}
      ></Navbar>
      <ProductGrid>{productList(data?.selectedProducts)}</ProductGrid>
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
