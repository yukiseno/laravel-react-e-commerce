import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "./partials/ProfileSidebar";
import Alert from "../layouts/Alert";
import { formatPrice } from "../../helpers/price";

export default function UserOrders() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [ordersToShow, setOrdersToShow] = useState(5);
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const loadMoreOrders = () => {
    if (ordersToShow > user?.orders?.length) {
      return;
    } else {
      setOrdersToShow((prev) => (prev += 5));
    }
  };
  console.log(user?.orders);
  return (
    <div className="flex my-8 gap-6">
      <ProfileSidebar />

      <div className="w-full md:w-2/3">
        <div className="bg-white shadow rounded-lg p-6">
          {user?.orders?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border-b">#</th>
                    <th className="px-3 py-2 text-left border-b">Product</th>
                    <th className="px-3 py-2 text-left border-b">Price</th>
                    <th className="px-3 py-2 text-left border-b">Qty</th>
                    <th className="px-3 py-2 text-left border-b">Total</th>
                    <th className="px-3 py-2 text-left border-b">Ordered</th>
                    <th className="px-3 py-2 text-left border-b">Delivered</th>
                  </tr>
                </thead>

                <tbody>
                  {user.orders.slice(0, ordersToShow).map((order, index) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">{index + 1}</td>

                      <td className="px-3 py-2 space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id}>
                            {item.product_name} ({item.color} / {item.size})
                          </div>
                        ))}
                      </td>

                      <td className="px-3 py-2 space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i}>{formatPrice(item.price)}</div>
                        ))}
                      </td>

                      <td className="px-3 py-2 space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i}>{item.qty}</div>
                        ))}
                      </td>

                      <td className="px-3 py-2">
                        <div className="font-semibold">
                          {formatPrice(order.total)}
                        </div>

                        {order.discount_total > 0 && (
                          <>
                            <div className="text-[11px] text-gray-500">
                              Subtotal: {formatPrice(order.subtotal)}
                            </div>

                            <div className="text-[11px] text-green-600">
                              −{formatPrice(order.discount_total)}
                            </div>
                          </>
                        )}
                      </td>

                      <td className="px-3 py-2 text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-2">
                        {order.delivered_at ? (
                          <span className="text-green-600">
                            {new Date(order.delivered_at).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="italic text-gray-400">Pending…</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Alert content="No orders yet" type="primary" />
          )}

          {ordersToShow < user?.orders?.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreOrders}
                className="flex items-center gap-2 rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 transition"
              >
                <span className="bi bi-arrow-clockwise"></span>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
