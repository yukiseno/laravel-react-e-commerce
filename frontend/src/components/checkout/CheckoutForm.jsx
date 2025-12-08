import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, clearCoupon } from "../../store/cart/cartSlice";
import { setAuthState } from "../../store/user/userSlice";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { cartItems, validCoupon } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const storeOrder = async () => {
    try {
      const response = await axiosRequest.post(
        "store/order",
        {
          products: cartItems.map((item) => ({
            ...item,
            coupon_id: validCoupon ? validCoupon.id : null,
          })),
        },
        getConfig(token)
      );

      dispatch(clearCartItems());
      dispatch(clearCoupon());
      dispatch(setAuthState({ user: response.data.user, token }));
      setIsProcessing(false);
      toast.success("Payment done successfully");
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
      },
      redirect: "if_required",
    });

    if (
      (response.error && response.error.type === "card_error") ||
      (response.error && response.error.type === "validation_error")
    ) {
      setMessage(response.error.message);
    } else if (response.paymentIntent.id) {
      //display success message or redirect user
      storeOrder();
    }

    setIsProcessing(false);
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
