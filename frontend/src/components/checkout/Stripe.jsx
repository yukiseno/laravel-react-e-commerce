import React, { useEffect, useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const { token } = useSelector((state) => state.user);
  const { cartItems, validCoupon } = useSelector((state) => state.cart);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    if (!cartItems.length || !token) return;

    hasFetched.current = true;

    const fetchClientSecret = async () => {
      try {
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

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientSecret();
  }, [cartItems, validCoupon, token]);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
