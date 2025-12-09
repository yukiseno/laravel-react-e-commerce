import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Coupon from "../coupons/Coupon";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCouponIdToCartItem,
  setValidCoupon,
} from "../../store/cart/cartSlice";
import { toast } from "react-toastify";
import Alert from "../layouts/Alert";
import { TrashIcon } from "@heroicons/react/24/outline";
import UpdateUserInfo from "../user/UpdateUserInfo";
import { formatPrice } from "../../helpers/price";
export default function Checkout() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { cartItems, validCoupon } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);
  const totalOfCartItems = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  const discountAmount = validCoupon?.discount
    ? (totalOfCartItems * validCoupon.discount) / 100
    : 0;
  const totalAfterDiscount = totalOfCartItems - discountAmount;
  const removeCoupon = () => {
    dispatch(
      setValidCoupon({
        name: "",
        discount: 0,
      })
    );
    dispatch(addCouponIdToCartItem(null));
    toast.success("Coupon removed");
  };
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white">
      <div className="p-6">
        <div className="my-5 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-7">
            <UpdateUserInfo profile={false} />
          </div>

          {/* Right column */}
          <div className="md:col-span-5 space-y-4">
            <Coupon />
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
                      {formatPrice(item.price)} × {item.qty}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </li>
              ))}
              {/* Coupon row */}
              {validCoupon?.name && (
                <li className="flex justify-between p-3 text-sm">
                  <span className="font-semibold">
                    Discount {validCoupon.discount}%
                  </span>

                  <span className="flex items-center gap-2 text-gray-600">
                    {validCoupon.name}
                    <TrashIcon
                      className="h-5 w-5 cursor-pointer text-gray-400 hover:text-red-500"
                      onClick={removeCoupon}
                    ></TrashIcon>
                  </span>

                  <span className="font-semibold text-gray-900">
                    -{formatPrice(discountAmount)}
                  </span>
                </li>
              )}

              {/* Total */}
              <li className="flex justify-between p-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalAfterDiscount)}</span>
              </li>
            </ul>

            <div className="mt-4">
              {user?.profile_completed ? (
                <Link
                  to="/pay/order"
                  className="inline-block w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-white hover:bg-gray-800"
                >
                  Proceed to payment
                </Link>
              ) : (
                <Alert content="Add your billing details" type="warning" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
