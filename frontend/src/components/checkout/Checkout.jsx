import React from "react";
import { useSelector } from "react-redux";
export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalOfCartItems = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white">
      <div className="p-6">
        <div className="my-5 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-7"></div>

          {/* Right column */}
          <div className="md:col-span-5 space-y-4">
            <ul className="divide-y rounded-lg border border-gray-200">
              {cartItems.map((item) => (
                <li key={item.ref} className="flex items-start gap-4 p-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-[60px] w-[60px] rounded object-cover"
                  />

                  <div className="flex flex-col">
                    <h5 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h5>
                    <span className="text-xs text-gray-500">
                      Color: <strong>{item.color}</strong>
                    </span>
                    <span className="text-xs text-gray-500">
                      Size: <strong>{item.size}</strong>
                    </span>
                  </div>

                  <div className="ml-auto flex flex-col items-end">
                    <span className="text-sm text-gray-500">
                      ${item.price} × {item.qty}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${item.price * item.qty}
                    </span>
                  </div>
                </li>
              ))}

              {/* Total */}
              <li className="flex justify-between p-3 text-base font-semibold">
                <span>Total</span>
                <span>${totalOfCartItems}</span>
              </li>
            </ul>

            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
