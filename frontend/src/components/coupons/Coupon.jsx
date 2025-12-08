import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../../helpers/config";
import {
  addCouponIdToCartItem,
  setValidCoupon,
} from "../../store/cart/cartSlice";
import { toast } from "react-toastify";

export default function Coupon() {
  const { token } = useSelector((state) => state.user);
  const [coupon, setCoupon] = useState({
    name: "",
  });

  const dispatch = useDispatch();

  const applyCoupon = async () => {
    try {
      const response = await axiosRequest.post(
        "apply/coupon",
        coupon,
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
        setCoupon({
          name: "",
        });
      } else {
        dispatch(setValidCoupon(response.data.coupon));
        dispatch(addCouponIdToCartItem(response.data.coupon.id));
        setCoupon({
          name: "",
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex">
        <input
          type="text"
          value={coupon.name}
          onChange={(e) =>
            setCoupon({
              ...coupon,
              name: e.target.value,
            })
          }
          className="flex-1 rounded-1-none border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter a promo code"
        />
        <button
          className="rounded-r-none bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!coupon.name}
          onClick={() => applyCoupon()}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
