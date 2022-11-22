import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { listProducts } from "./ProductsService";
import ProductCard from "./ProductCard";
import { css } from "@emotion/css";

const ProductIndexStyle = css`
  .ProductIndex {
    &-List {
      margin-top: 10px;
    }
  }
`;

const ProductsIndex = () => {
  const [products, setProducts] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (location.state) {
      console.warn(`Noting found for ${location.state.id}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      setProducts(data);
    })();
  }, []);

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
  };

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ProductIndexStyle}>
      <div className="ProductIndex-Radios">
        <span>Sort:</span>
        <label>
          Name{" "}
          <input
            type="radio"
            name="sort"
            value="name"
            onChange={updateParams}
          />
        </label>{" "}
        <label>
          Price{" "}
          <input
            type="radio"
            name="sort"
            value="price"
            onChange={updateParams}
          />
        </label>
      </div>
      <div className="ProductIndex-Radios">
        <span>order:</span>
        <label>
          ASC{" "}
          <input
            type="radio"
            name="order"
            value="asc"
            onChange={updateParams}
          />
        </label>{" "}
        <label>
          DES{" "}
          <input
            type="radio"
            name="order"
            value="dec"
            onChange={updateParams}
          />
        </label>
      </div>
      <div className="ProductIndex-List">
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsIndex;
