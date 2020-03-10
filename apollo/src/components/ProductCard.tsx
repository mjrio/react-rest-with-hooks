import React from "react";
import Card from "antd/es/card";
import { IProduct } from "../models/product";

const { Meta } = Card;

interface IProductCardProps {
  product: IProduct;
}

export default ({ product, ...props }: IProductCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={product.image} />}
      {...props}
    >
      <Meta
        title={product.title}
        description={`${product.desc.substring(1, 140)}`}
      />
    </Card>
  );
};
