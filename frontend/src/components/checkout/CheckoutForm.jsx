import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartItems,
  clearCoupon,
  clearClientSecret,
} from "../../store/cart/cartSlice";
import { addOrder, setAuthState } from "../../store/user/userSlice";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { cartItems, validCoupon } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const storeOrder = async (paymentIntentId) => {
    try {
      const response = await axiosRequest.post(
        "store/order",
        {
          payment_intent_id: paymentIntentId,
          products: cartItems.map((item) => ({
            ...item,
            coupon_id: validCoupon ? validCoupon.id : null,
          })),
        },
        getConfig(token)
      );

      dispatch(clearClientSecret());
      dispatch(clearCartItems());
      dispatch(clearCoupon());
      //dispatch(setAuthState({ user: response.data.user, token }));
      dispatch(addOrder(response.data.order));
      setIsProcessing(false);
      toast.success("Payment done successfully");
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    setMessage(null);

    try {
      const response = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      if (response.paymentIntent?.status === "succeeded") {
        await storeOrder(response.paymentIntent.id);
      } else {
        setMessage("Payment was not completed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6"
    >
      <div className="mb-6">
        <PaymentElement />
      </div>

      <button
        disabled={isProcessing || !stripe || !elements}
        className={`w-full rounded-md px-4 py-3 text-white font-semibold transition
      ${
        isProcessing || !stripe || !elements
          ? "bg-indigo-300 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
      >
        {isProcessing ? "Processing..." : "Pay now"}
      </button>

      {message && (
        <div className="text-center text-sm text-gray-600 mt-3">{message}</div>
      )}
    </form>
  );
}
