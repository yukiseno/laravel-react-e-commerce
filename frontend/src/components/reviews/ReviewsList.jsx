import { useContext } from "react";
import { ReviewContext } from "./context/reviewContext";
import ReviewsListItem from "./ReviewsListItem";

export default function ReviewsList() {
  const { product } = useContext(ReviewContext);
  return (
    <ul>
      {product?.reviews?.map((review) => (
        <ReviewsListItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
