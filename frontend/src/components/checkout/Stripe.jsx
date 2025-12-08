import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useSelector, useDispatch } from "react-redux";
import { setClientSecret } from "../../store/cart/cartSlice";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Stripe() {
  const { token } = useSelector((state) => state.user);
  const { cartItems, validCoupon, clientSecret } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    if (!cartItems.length || !token) return;

    hasFetched.current = true;

    const fetchClientSecret = async () => {
      try {
        if (clientSecret) return;
        const response = await axiosRequest.post(
          "pay/order",
          {
            cartItems: cartItems.map((item) => ({
              ...item,
              coupon_id: validCoupon ? validCoupon.id : null,
            })),
          },
          getConfig(token)
        );

        dispatch(setClientSecret(response.data.clientSecret));
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientSecret();
  }, [cartItems, validCoupon, token, clientSecret, dispatch]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#4f46e5", // indigo-600
      colorText: "#1f2937", // gray-800
      colorDanger: "#dc2626", // red-600
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: "6px",
    },
  };

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
