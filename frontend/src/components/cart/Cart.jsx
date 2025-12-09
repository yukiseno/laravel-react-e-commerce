import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQ,
  incrementQ,
  removeFromCart,
} from "../../store/cart/cartSlice";
import Alert from "../layouts/Alert";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/price";
export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  return (
    <div className="my-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            {cartItems.length > 0 ? (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead className="border-b border-gray-200">
                      <tr className="text-sm font-semibold text-gray-600">
                        <th className="py-3 px-2">#</th>
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Name</th>
                        <th className="py-3 px-2">Qty</th>
                        <th className="py-3 px-2">Price</th>
                        <th className="py-3 px-2">Color</th>
                        <th className="py-3 px-2">Size</th>
                        <th className="py-3 px-2">Subtotal</th>
                        <th className="py-3 px-2"></th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {cartItems.map((item, index) => (
                        <tr key={index} className="text-sm text-gray-700">
                          <td className="py-4 px-2">{index + 1}</td>

                          <td className="py-4 px-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-14 w-14 rounded-md object-cover"
                            />
                          </td>

                          <td className="py-4 px-2 font-medium">{item.name}</td>

                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => dispatch(incrementQ(item))}
                                className="text-gray-500 hover:text-gray-900"
                              >
                                ▲
                              </button>
                              <span className="font-medium">{item.qty}</span>
                              <button
                                onClick={() => dispatch(decrementQ(item))}
                                className="text-gray-500 hover:text-gray-900"
                              >
                                ▼
                              </button>
                            </div>
                          </td>

                          <td className="py-4 px-2">
                            {formatPrice(item.price)}
                          </td>

                          <td className="py-4 px-2">
                            <div
                              className="h-5 w-5 rounded border border-gray-300"
                              style={{
                                backgroundColor: item.color.toLowerCase(),
                              }}
                            />
                          </td>

                          <td className="py-4 px-2">
                            <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                              {item.size}
                            </span>
                          </td>

                          <td className="py-4 px-2 font-semibold">
                            {formatPrice(item.qty * item.price)}
                          </td>

                          <td className="py-4 px-2">
                            <button
                              onClick={() => dispatch(removeFromCart(item))}
                              className="text-gray-400 hover:text-red-600"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="mt-6 flex justify-center">
                  <div className="rounded-lg border-2 border-gray-900 px-4 py-2 font-bold">
                    Total: {formatPrice(total)}
                  </div>
                </div>
              </>
            ) : (
              <Alert content="Your cart is empty" type="info" />
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-4">
            <Link
              to="/"
              className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
            >
              Continue Shopping
            </Link>

            {cartItems.length > 0 && (
              <Link
                to="/checkout"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
