import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  validCoupon: null,
  clientSecret: null,
  paymentIntentId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        (product) =>
          product.product_id === item.product_id &&
          product.color === item.color &&
          product.size === item.size
      );
      if (productItem) {
        toast.info("This item is already in your cart");
      } else {
        state.cartItems = [item, ...state.cartItems];
        toast.success("Item added to your cart");
      }
    },
    incrementQ(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        (product) =>
          product.product_id === item.product_id &&
          product.color === item.color &&
          product.size === item.size
      );
      if (productItem.qty === productItem.maxQty) {
        toast.info(`Only ${productItem.maxQty} available`);
      } else {
        productItem.qty += 1;
      }
    },
    decrementQ(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        (product) =>
          product.product_id === item.product_id &&
          product.color === item.color &&
          product.size === item.size
      );
      productItem.qty -= 1;
      if (productItem.qty === 0) {
        state.cartItems = state.cartItems.filter(
          (product) => product.ref !== item.ref
        );
      }
    },
    removeFromCart(state, action) {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (product) => product.ref !== item.ref
      );
      toast.success("Product removed from your cart");
    },
    setValidCoupon(state, action) {
      state.validCoupon = action.payload;
    },
    clearCoupon(state) {
      state.validCoupon = null;
    },
    addCouponIdToCartItem(state, action) {
      const coupon_id = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return { ...item, coupon_id };
      });
    },
    clearCartItems(state) {
      state.cartItems = [];
      state.clientSecret = null;
      state.paymentIntentId = null;
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    clearClientSecret: (state) => {
      state.clientSecret = null;
    },
    resetCheckout(state) {
      console.log("resetcheckout");
      state.clientSecret = null;
      state.paymentIntentId = null;
      state.validCoupon = null;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQ,
  decrementQ,
  removeFromCart,
  setValidCoupon,
  addCouponIdToCartItem,
  clearCoupon,
  clearCartItems,
  setClientSecret,
  clearClientSecret,
  resetCheckout,
} = cartSlice.actions;
export default cartReducer;
