import React from "react";
import ProductListItem from "./ProductListItem";

export default function ProductsList({ products }) {
  return (
    <div>
      {products?.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
