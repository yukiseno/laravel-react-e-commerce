import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ValidationErrors from "../../common/ValidationErrors";
import { Link } from "react-router-dom";
import { axiosRequest, getConfig } from "../../../helpers/config";
import { setAuthState } from "../../../store/user/userSlice";
import { toast } from "react-toastify";
import {
  EnvelopeIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function ProfileSidebar() {
  const { user, token } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInput = useRef();
  const updateProfileImage = async () => {
    setValidationErrors([]);
    setLoading(true);
    const formData = new FormData();
    formData.append("profile_image", image);
    formData.append("_method", "PUT");
    try {
      const response = await axiosRequest.post(
        "user/profile/update",
        formData,
        getConfig(token, "multipart/form-data")
      );
      dispatch(setAuthState({ user: response.data.user, token }));
      setImage("");
      setLoading(false);
      fileInput.current.value = "";
      toast.success(response.data.message);
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full md:w-1/3">
      {/* Profile Card */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <img
            src={user?.profile_image}
            alt={user?.name}
            className="h-36 w-36 rounded-full object-cover"
          />

          {/* Upload */}
          <div className="mt-4 w-full space-y-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full rounded-md border border-gray-300 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-gray-200"
            />

            <ValidationErrors errors={validationErrors} field="profile_image" />

            {loading ? (
              <p className="text-sm font-medium text-red-600">Uploading…</p>
            ) : (
              <button
                type="button"
                onClick={updateProfileImage}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info List */}
      <ul className="mt-4 divide-y rounded-lg border bg-white text-sm">
        <li className="flex items-center gap-2 p-3">
          <UserIcon className="h-4 w-4 text-gray-500" />
          <span>{user?.name}</span>
        </li>

        <li className="flex items-center gap-2 p-3">
          <EnvelopeIcon className="h-4 w-4 text-gray-500" />
          <span>{user?.email}</span>
        </li>

        <li className="p-3">
          <Link
            to="/user/orders"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <ShoppingBagIcon className="h-4 w-4" />
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}
