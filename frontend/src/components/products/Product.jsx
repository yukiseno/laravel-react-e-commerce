import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import Alert from "../layouts/Alert";
import parse from "html-react-parser";
import Slider from "./images/Slider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";
import { formatPrice } from "../../helpers/price";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductBySlug = async () => {
      setLoading(true);
      try {
        const response = await axiosRequest.get(`product/${slug}/show`);
        setProduct(response.data.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("The product you are looking for does not exist.");
        }
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductBySlug();
  }, [slug]);

  const makeUniqueId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  return (
    <div className="my-3">
      {error ? (
        <Alert content={error} type="danger" />
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT COLUMN - SLIDER */}
          <div className="p-2">
            <Slider product={product} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 space-y-4">
            {/* NAME + PRICE */}
            <div className="flex items-center justify-between">
              <h5 className="text-xl font-semibold text-gray-800">
                {product?.name}
              </h5>

              <span className="px-3 py-1 text-sm">
                {formatPrice(product?.price)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="prose max-w-none">{parse(product?.desc)}</div>

            {/* SIZES + STOCK */}
            <div className="flex items-center justify-between">
              {/* SIZES */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes?.map((size) => (
                  <span
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 py-1 rounded-md text-sm font-semibold cursor-pointer border 
              ${
                selectedSize?.id === size.id
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
                  >
                    {size.name}
                  </span>
                ))}
              </div>

              {/* STOCK BADGE */}
              <div>
                {product.status ? (
                  <span className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg">
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* COLORS */}
            <div className="flex items-center gap-2">
              {product.colors?.map((color) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`h-5 w-5 rounded-full cursor-pointer border 
            ${
              selectedColor?.id === color.id ? "ring-2 ring-gray-900" : "ring-0"
            }`}
                  style={{ backgroundColor: color.name.toLowerCase() }}
                ></div>
              ))}
            </div>

            {/* QTY + ADD TO CART */}
            <div className="mt-6 space-y-4">
              {/* QTY INPUT */}
              <div className="max-w-xs mx-auto">
                <input
                  type="number"
                  min={1}
                  max={product?.qty > 1 ? product.qty : 1}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-black/20 rounded-lg focus:ring focus:ring-gray-300"
                  placeholder="Qty"
                />
              </div>

              {/* ADD TO CART BUTTON */}
              <div className="flex justify-center">
                <button
                  disabled={
                    !selectedColor || !selectedSize || product?.qty == 0
                  }
                  onClick={() => {
                    dispatch(
                      addToCart({
                        product_id: product.id,
                        ref: makeUniqueId(10),
                        name: product.name,
                        slug: product.slug,
                        qty: qty,
                        price: parseInt(product.price),
                        color_id: selectedColor.id,
                        color: selectedColor.name,
                        size_id: selectedSize.id,
                        size: selectedSize.name,
                        maxQty: parseInt(product.qty),
                        image: product.thumbnail,
                      })
                    );
                    setSelectedColor(null);
                    setSelectedSize(null);
                    setQty(1);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2
            ${
              !selectedColor || !selectedSize || product?.qty == 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
                >
                  <span className="bi bi-cart-plus-fill"></span>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
