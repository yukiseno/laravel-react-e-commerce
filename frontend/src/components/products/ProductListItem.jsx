import React from "react";
import { Link } from "react-router-dom";
export default function ProductListItem({ product }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <img src={product.thumbnail} alt={product.name} />
      <div>{product.name}</div>
      <div>{product.price}</div>
    </Link>
  );
}
