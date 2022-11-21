import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/css";

const NavStyle = css`
  margin-bottom: 15px;
  a {
    color: #fff;
    padding: 6px 12px;
    text-decoration: none;
    border-radius: 4px;
    &.active {
      color: #50fa7b;
      border: 2px solid #50fa7b;
    }
  }
`;

const Nav = () => {
  return (
    <nav className={NavStyle}>
      <NavLink to="/" end>
        Products
      </NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  );
};

export default Nav;
