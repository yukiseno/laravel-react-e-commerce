import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/price";
export default function ProductListItem({ product }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="block border rounded-xl p-4 shadow hover:shadow-lg transition"
    >
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-3 font-semibold">{product.name}</div>
      <div className="text-gray-600">{formatPrice(product.price)}</div>
      <div className="flex gap-2 mt-2">
        {product.sizes?.map((size) => (
          <span key={size.id} className="text-xs border px-2 py-1 rounded">
            {size.name}
          </span>
        ))}
      </div>
      <div className="mt-2">
        {product.status == 1 ? (
          <span className="text-green-600 text-sm font-medium">In Stock</span>
        ) : (
          <span className="text-red-600 text-sm font-medium">Out of Stock</span>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {product.colors?.map((color) => (
          <div
            key={color.id}
            className="h-5 w-5 rounded-full border"
            style={{ backgroundColor: color.name.toLowerCase() }}
          ></div>
        ))}
      </div>
    </Link>
  );
}
