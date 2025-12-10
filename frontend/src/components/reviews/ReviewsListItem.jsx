import React, { useContext, useState } from "react";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { ReviewContext } from "./context/reviewContext";
import { toast } from "react-toastify";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function ReviewsListItem({ review }) {
  const { user, token } = useSelector((state) => state.user);
  const { product, setLoading, clearReview, editReview } =
    useContext(ReviewContext);
  const [open, setOpen] = useState(false);

  const renderReviewActions = () =>
    review?.user_id === user?.id && (
      <div className="relative ml-auto">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black/5">
            <button
              onClick={() => {
                setOpen(false);
                editReview(review);
              }}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <i className="bi bi-pen mr-2" />
              Update
            </button>

            <button
              onClick={() => {
                setOpen(false);
                deleteReview(review);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <i className="bi bi-trash mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    );

  const deleteReview = async (review) => {
    if (confirm("Are you sure ?")) {
      setLoading(true);
      try {
        const response = await axiosRequest.post(
          "review/delete",
          review,
          getConfig(token)
        );

        if (response.data.error) {
          setLoading(false);
          toast.error(response.data.error);
          clearReview();
        } else {
          product.reviews = product.reviews.filter(
            (item) => item.id !== review.id
          );
          toast.success(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <li className="mb-2 flex items-start gap-3 rounded-lg bg-gray-50 p-3 shadow-sm">
      {/* Avatar */}
      <img
        src={review?.user?.image_path}
        alt={review?.user?.name}
        className="h-[60px] w-[60px] flex-shrink-0 rounded object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1">
        <h6 className="text-sm font-semibold text-gray-900">{review?.title}</h6>

        <p className="text-sm text-gray-700">{review?.body}</p>

        <Rating initialValue={review?.rating} readonly size={24} />

        <span className="text-xs text-gray-500">
          {review?.created_at} by{" "}
          <span className="font-semibold text-gray-700">
            {review?.user?.name}
          </span>
        </span>
      </div>

      {/* Actions */}
      {renderReviewActions()}
    </li>
  );
}
