import React, { useState } from "react";
import ValidationErrors from "../common/ValidationErrors";
import Spinner from "../layouts/Spinner";
import { toast } from "react-toastify";
import { axiosRequest } from "../../helpers/config";
import { useNavigate, useParams } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState("email"); // "email" or "reset"
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token: urlToken } = useParams();

  // Check if there's a token in the URL (from email link)
  React.useEffect(() => {
    if (urlToken) {
      setToken(urlToken);
      setStep("reset");
    }
  }, [urlToken]);

  const requestPasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors([]);
    try {
      const response = await axiosRequest.post("user/forgot-password", {
        email,
      });
      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(
          "Password reset link sent to your email. Check your inbox!"
        );
        setEmail("");
        setStep("reset");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors([]);
    try {
      const response = await axiosRequest.post("user/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(
          "Password reset successfully! Please login with your new password."
        );
        navigate("/login");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b bg-white px-6 py-4">
            <h5 className="text-center text-lg font-semibold text-gray-900">
              {step === "email" ? "Reset Password" : "Set New Password"}
            </h5>
          </div>

          {/* Body */}
          <div className="px-6 py-8">
            {step === "email" ? (
              <form onSubmit={requestPasswordReset} className="space-y-6">
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    placeholder="your@email.com"
                  />
                  <ValidationErrors errors={validationErrors} field="email" />
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
                      Send Reset Link
                    </button>
                  )}
                </div>

                {/* Back to login */}
                <p className="text-center text-sm">
                  Remember your password?{" "}
                  <a
                    href="/login"
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            ) : (
              <form onSubmit={resetPassword} className="space-y-6">
                <p className="text-sm text-gray-600">
                  Enter your new password below.
                </p>

                {/* Email (hidden) */}
                {!urlToken && (
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="reset-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                      placeholder="your@email.com"
                    />
                    <ValidationErrors errors={validationErrors} field="email" />
                  </div>
                )}

                {/* Token (hidden for URL-based reset) */}
                {!urlToken && (
                  <div>
                    <label
                      htmlFor="token"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reset Token
                    </label>
                    <textarea
                      id="token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                      rows="3"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 font-mono text-xs"
                      placeholder="Paste the token from the reset email"
                    />
                    <ValidationErrors errors={validationErrors} field="token" />
                  </div>
                )}

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                  <ValidationErrors
                    errors={validationErrors}
                    field="password"
                  />
                </div>

                {/* Password Confirmation */}
                <div>
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                  <ValidationErrors
                    errors={validationErrors}
                    field="password_confirmation"
                  />
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
                      Reset Password
                    </button>
                  )}
                </div>

                {/* Back to login */}
                <p className="text-center text-sm">
                  <a
                    href="/login"
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Back to login
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
