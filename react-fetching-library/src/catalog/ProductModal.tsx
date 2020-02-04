import React, { useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { IProduct } from "../models/product";
import styled from "styled-components";

const DeleteButton = styled(Button)`
  margin-bottom: 20px;
  width: 100%;
`;

interface IProductModalProps {
  product: IProduct;
  visible: boolean;
  onConfirm: (product: IProduct) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export default ({
  product,
  visible = false,
  onConfirm,
  onDelete,
  onCancel
}: IProductModalProps) => {
  const [title, setTitle] = useState();

  return (
    <Modal
      title={product?.title}
      visible={visible}
      onOk={() => onConfirm({ ...product, title })}
      onCancel={onCancel}
    >
      <DeleteButton type="danger" onClick={onDelete}>
        Delete product
      </DeleteButton>
      <Input placeholder="New title" onChange={e => setTitle(e.target.value)} />
    </Modal>
  );
};
