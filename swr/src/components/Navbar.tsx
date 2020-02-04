import React from "react";
import styled from "styled-components";
import Pagination from "antd/es/pagination";

const StyledNavbar = styled.div`
  padding: 30px;
`;

interface INavbarProps {
  pageSize: number;
  totalItems: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export default ({
  pageSize,
  totalItems,
  currentPage,
  changePage,
  ...props
}: INavbarProps) => {
  return (
    <StyledNavbar>
      <Pagination
        total={totalItems}
        pageSize={pageSize}
        current={currentPage + 1}
        onChange={changePage}
      />
    </StyledNavbar>
  );
};
