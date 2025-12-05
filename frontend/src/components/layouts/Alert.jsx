import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Alert({ type = "info", content }) {
  const baseStyles =
    "flex items-center gap-3 px-4 py-3 rounded-lg border text-sm";

  const typeStyles = {
    success: "bg-green-50 text-green-800 border-green-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  const icons = {
    success: faCircleCheck,
    danger: faCircleXmark,
    warning: faTriangleExclamation,
    info: faCircleInfo,
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-full max-w-xl">
        <div className={`${baseStyles} ${typeStyles[type]}`}>
          <FontAwesomeIcon icon={icons[type]} className="w-5 h-5" />
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
