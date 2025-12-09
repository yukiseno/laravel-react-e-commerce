import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosRequest, getConfig } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState } from "../../store/user/userSlice";

export default function UpdateUserInfo({ profile }) {
  const { user, token } = useSelector((state) => state.user);
  const [userInfos, setUserInfos] = useState({
    phone_number: user?.phone_number,
    address: user?.address,
    city: user?.city,
    country: user?.country,
    zip_code: user?.zip_code,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateUserInfos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosRequest.put(
        "user/profile/update",
        userInfos,
        getConfig(token)
      );
      dispatch(
        setAuthState({
          user: {
            ...user,
            ...response.data.user,
          },
          token,
        })
      );
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full md:w-2/3">
      <div className="rounded-lg border border-black/10 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-b-black/10 bg-white px-4 py-3 rounded-t-lg">
          <h5 className="mt-2 text-center text-lg font-medium text-gray-900">
            {profile ? "User Details" : "Billing Details"}
          </h5>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="mt-5 space-y-5" onSubmit={updateUserInfos}>
            {/* Phone */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number*
              </label>
              <input
                type="text"
                id="phone_number"
                required
                value={userInfos.phone_number || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    phone_number: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address*
              </label>
              <input
                type="text"
                id="address"
                required
                value={userInfos.address || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    address: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label
                htmlFor="zip_code"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code*
              </label>
              <input
                type="text"
                id="zip_code"
                required
                value={userInfos.zip_code || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    zip_code: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City*
              </label>
              <input
                type="text"
                id="city"
                required
                value={userInfos.city || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    city: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country*
              </label>
              <input
                type="text"
                id="country"
                required
                value={userInfos.country || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    country: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Submit */}
            <div>
              {loading ? (
                <Spinner />
              ) : !user?.profile_completed || profile ? (
                <button
                  type="submit"
                  className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Submit
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
