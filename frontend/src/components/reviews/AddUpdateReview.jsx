import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { axiosRequest, getConfig } from "../../helpers/config";
import { useSelector } from "react-redux";
import { ReviewContext } from "./context/reviewContext";
import { Rating } from "react-simple-star-rating";
export default function AddUpdateReview() {
  const { token } = useSelector((state) => state.user);
  const {
    product,
    review,
    setReview,
    setLoading,
    handleRating,
    clearReview,
    updating,
  } = useContext(ReviewContext);

  const [validationErrors, setvalidationErrors] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setReview((prev) => ({ ...prev, [id]: value }));
  };

  const addReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosRequest.post(
        "review/store",
        review,
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        clearReview();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosRequest.put(
        "review/update",
        review,
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        product.reviews = product.reviews.filter(
          (item) => item.id !== review.id
        );
        toast.success(response.data.message);
        clearReview();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(review);
  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-black/10 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-black/10 bg-white py-3 text-center">
            <h5 className="text-base font-medium">
              {updating ? "Edit" : "Add"} Review
            </h5>
          </div>

          {/* Body */}
          <div className="p-6">
            <form
              onSubmit={updating ? updateReview : addReview}
              className="space-y-5"
            >
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={review.title}
                  onChange={handleChange}
                  required
                  placeholder="Title"
                  className="w-full rounded-md border border-black/20 px-3 py-2 text-sm
                         focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              {/* Body */}
              <div>
                <label
                  htmlFor="body"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Review<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="body"
                  value={review.body}
                  onChange={handleChange}
                  placeholder="Review"
                  className="w-full rounded-md border border-black/20 px-3 py-2 text-sm
                         focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  rows={4}
                />
              </div>

              {/* Rating */}
              <div>
                <Rating
                  initialValue={review.rating}
                  onClick={handleRating}
                  size={32}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {updating ? (
                  <>
                    <button
                      type="submit"
                      disabled={
                        !review.title || !review.body || review.rating === 0
                      }
                      className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white
                             hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-300"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={clearReview}
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white
                             hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    disabled={
                      !review.title || !review.body || review.rating === 0
                    }
                    className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white
                           hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
