import React from "react";
import ProductListItem from "./ProductListItem";

export default function ProductsList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products?.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
