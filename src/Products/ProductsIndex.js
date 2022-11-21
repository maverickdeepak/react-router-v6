import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { listProducts } from "./ProductsService";
import ProductCard from "./ProductCard";

const ProductsIndex = () => {
  const [products, setProducts] = useState(null);
  const location = useLocation();

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

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductsIndex;
