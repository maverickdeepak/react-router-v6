import React from "react";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/css";

const ProductStyles = css`
  display: flex;
  flex-direction: column;
  .Logo {
    width: 125px;
    margin: 0 auto 25px;
  }
`;

const Products = () => {
  return (
    <div className={ProductStyles}>
      <img src="/assets/img/logo.svg" alt="Burger App" className="Logo" />
      <Outlet />
    </div>
  );
};

export default Products;
