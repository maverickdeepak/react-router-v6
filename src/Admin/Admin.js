import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { css } from "@emotion/css";

import ProductsIndex from "../Products/ProductsIndex";
import ProductEdit from "../Products/ProductEdit";

const AdminStyle = css`
  .Admin {
    &-Header {
      display: flex;
      align-items: center;
    }
    &-New {
      text-decoration: none;
      border: 2px solid #fff;
      color: #fff;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: auto;
    }
  }
`;

const Admin = () => {
  return (
    <div className={AdminStyle}>
      <div className="Admin-Header">
        <h1>Admin</h1>
        <Link to="new" className="Admin-New">
          New
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<ProductsIndex />} />
        <Route path="/new" element={<ProductEdit isEdit={false} />} />
        <Route path="/:id" element={<ProductEdit isEdit={true} />} />
      </Routes>
    </div>
  );
};

export default Admin;
