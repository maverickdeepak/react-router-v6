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
    &-Radios {
      display: flex;
      align-items: center;
      span {
        width: 35px;
        color: #fff;
        font-size: 0.8rem;
        margin-right: 10px;
      }
      label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
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
      const params = Object.fromEntries([...searchParams]);
      sortProductFromParams(data, params);
    })();
  }, []);

  const sortProductFromParams = (data, params) => {
    if (!Object.keys(params).length) {
      setProducts(data);
      return;
    }
    const sortedData = [...data].sort((x, y) => {
      const { sort, order } = params;
      switch (order) {
        case "asc":
          return x[sort] > y[sort] ? 1 : -1;
        case "des":
          return x[sort] < y[sort] ? 1 : -1;

        default:
          return 0;
      }
    });
    setProducts(sortedData);
  };

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
    sortProductFromParams(products, newParams);
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
            defaultChecked={searchParams.get("sort") === "name"}
          />
        </label>{" "}
        <label>
          Price{" "}
          <input
            type="radio"
            name="sort"
            value="price"
            onChange={updateParams}
            defaultChecked={searchParams.get("sort") === "price"}
          />
        </label>
      </div>
      <div className="ProductIndex-Radios">
        <span>Order: </span>
        <label>
          ASC{" "}
          <input
            type="radio"
            name="order"
            value="asc"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "asc"}
          />
        </label>{" "}
        <label>
          DES{" "}
          <input
            type="radio"
            name="order"
            value="dsc"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "dsc"}
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
