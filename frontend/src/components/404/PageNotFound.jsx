import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-black/20">
          <div className="flex flex-col items-center justify-center p-6">
            <h3 className="text-xl font-semibold text-center mb-2">
              404 Page Not Found
            </h3>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
