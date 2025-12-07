import React, { useState } from "react";
import ValidationErrors from "../common/ValidationErrors";
import Spinner from "../layouts/Spinner";
import { toast } from "react-toastify";
import { axiosRequest } from "../../helpers/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../store/user/userSlice";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setvalidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setvalidationErrors([]);
    try {
      const response = await axiosRequest.post("user/login", user);
      setLoading(false);
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        console.log(response.data);
        dispatch(
          setAuthState({
            user: response.data.user,
            token: response.data.access_token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        setvalidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b bg-white px-6 py-4">
            <h5 className="text-center text-lg font-semibold text-gray-900">
              Login
            </h5>
          </div>

          {/* Body */}
          <div className="px-6 py-8">
            <form onSubmit={loginUser} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <ValidationErrors errors={validationErrors} field="email" />
                <p className="mt-1 text-xs text-gray-500">
                  We'll never share your email with anyone else.
                </p>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <ValidationErrors errors={validationErrors} field="password" />
              </div>

              {/* Submit */}
              <div>
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
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
