import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { css } from "@emotion/css";

import Nav from "./Common/Nav";

import Products from "./Products/Products";
import ProductsIndex from "./Products/ProductsIndex";
import { Product } from "./Products/Product";
import Admin from "./Admin/Admin";

const AppStyle = css`
  margin: 50px auto;
  width: 380px;
  .Container {
    background: #1d1e26;
    border: 4px solid #9580ff;
    padding: 20px;
    border-radius: 4px;
  }
`;

const App = () => {
  return (
    <div className={AppStyle}>
      <Router>
        <div className="Container">
          <Nav />
          <Routes>
            <Route path="/" element={<Products />}>
              <Route path="/" element={<ProductsIndex />} />
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;