import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

import { retrievProduct } from "./ProductsService";

const ProductStyle = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 4px;
  padding: 15px;
  .Product {
    &-Icon {
      width: 50px;
      margin-right: 15px;
    }
    &-Title {
      display: flex;
    }
    &-Name {
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
    &-Price {
      color: #50fa7b;
      font-weight: 600;
      font-size: 1rem;
      margin: 0;
    }
    &-Button {
      border: 2px solid #50fa7b;
      color: #50fa7b;
      background: none;
      padding: 10px 15px;
      margin-right: 5px;
      border-radius: 4px;
      outline: 0;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const product = await retrievProduct(id);
        setProduct(product);
      } catch (error) {
        console.warn(error);
        navigate("/", { replace: true, state: { id } });
      }
    })();
  }, [id]);

  if (product === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className={ProductStyle}>
      <div className="Product-Title">
        <img
          src={`/assets/img/products/${id}.svg`}
          alt={product.name}
          className="Product-Icon"
        />
        <div>
          <h1 className="Product-Name">{product.name}</h1>
          <p className="Product-Price">{`$${product.price / 100}`}</p>
        </div>
      </div>
      <div className="Product-Description">
        <p>{product.description}</p>
        <button
          type="button"
          className="Product-Button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};
