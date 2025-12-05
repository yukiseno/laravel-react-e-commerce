import React from "react";
import { Link } from "react-router-dom";
export default function ProductListItem({ product }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <img src={product.thumbnail} alt={product.name} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div className="">
        {product.sizes?.map((size) => (
          <span key={size.id} className="">
            <small>{size.name}</small>
          </span>
        ))}
      </div>
      <div>
        {product.status == 1 ? (
          <span className="badge bg-success p-2">In Stock</span>
        ) : (
          <span className="badge bg-danger p-2">Out of Stock</span>
        )}
      </div>
      <div className="">
        {product.colors?.map((color) => (
          <div
            key={color.id}
            className=""
            style={{
              backgroundColor: color.name.toLowerCase(),
              height: "20px",
              width: "20px",
            }}
          ></div>
        ))}
      </div>
    </Link>
  );
}
