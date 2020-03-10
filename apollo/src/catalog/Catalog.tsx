import React, { useState } from "react";
import styled from "styled-components";
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import ProductModal from "../components/ProductModal";

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

interface IProductResult {
  products: {
    total: number;
    page: number;
    pageSize: number;
    selectedProducts: IProduct[];
  }
}

interface IProduct {
  id: number;
  title: string;
  price: number;
  stocked: boolean;
  desc: string;
  image: string;
}

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct: publish(productId: $productId)
      @rest(
        type: "Post"
        path: "/products/{args.productId}"
        method: "DELETE"
      ) {
      id
      title
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($productId: ID!, $input: PublishablePostInput!) {
    updateProduct: publish(productId: $productId, body: $input)
      @rest(
        type: "Post"
        path: "/products/{args.productId}"
        method: "PUT"
        bodyKey: "body"
      ) {
        id
        title
        price
        stocked
        desc
        sku
        basePrice
        image
    }
  }
`

export const GET_PRODUCTS = gql`
  query getAllProducts($page: Int, $pageSize: Int) {
    products(page: $page, pageSize: $pageSize) @rest(type: "Products", path: "/products?page={args.page}&pageSize={args.pageSize}") {
      total
      page
      pageSize
      selectedProducts @type(name: "Product") {
        id
        title
        price
        stocked
        desc
        sku
        basePrice
        image
      }
    }
    basket @rest(type: "Basket", path: "/basket/xyz") {
      id
      productId @export(as: "id")
      product @rest(type: "Basket", path: "/products/{exportVariables.id}", type: "Product") {
        id
        title
        price
        stocked
        desc
        image
      }
      quantity
    }
  }
`;

export default () => {
  let [page, setPage] = useState(0);
  let [selectedProduct, setSelectedProduct] = useState();
  const { data } = useQuery<IProductResult>(GET_PRODUCTS, {
    variables: { page, pageSize: 5 }
  })

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT_MUTATION);
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT_MUTATION)

  console.log('data', data)

  const confirmProduct = async (updatedProduct: IProduct) => {
    await updateProductMutation({
      variables: {
        input: updatedProduct,
        productId: updatedProduct.id
      },
      refetchQueries: ['getAllProducts']
    })
    setSelectedProduct(null);
  };

  const deleteProduct = async () => {
    await deleteProductMutation({
      variables: { productId: selectedProduct.id},
      refetchQueries: ['getAllProducts']
    })
    setSelectedProduct(null);
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
        pageSize={data?.products.pageSize || 0}
        totalItems={data?.products.total || 0}
        currentPage={data?.products.page || 0}
        changePage={onPageChange}
      ></Navbar>
      <ProductGrid>{productList(data?.products.selectedProducts)}</ProductGrid>
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
