import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReviewContext } from "./context/reviewContext";
import AddUpdateReview from "./AddUpdateReview";
import ReviewsList from "./ReviewsList.jsx";
export default function Reviews({ product, setLoading }) {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [review, setReview] = useState({
    product_id: product?.id,
    user_id: user?.id,
    title: "",
    body: "",
    rating: 0,
  });
  const [updating, setUpdating] = useState(false);
  const handleRating = (rating) => {
    setReview((prev) => ({
      ...prev,
      rating,
    }));
  };
  const editReview = (data) => {
    console.log("editreview called");
    setReview(data);
    setUpdating(true);
  };
  const clearReview = () => {
    setReview({
      product_id: product?.id,
      user_id: user?.id,
      title: "",
      body: "",
      rating: 0,
    });

    if (updating) {
      setUpdating(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        product,
        review,
        setReview,
        setLoading,
        handleRating,
        clearReview,
        updating,
        setUpdating,
        editReview,
      }}
    >
      <ReviewsList />
      {isLoggedIn && <AddUpdateReview />}
    </ReviewContext.Provider>
  );
}
