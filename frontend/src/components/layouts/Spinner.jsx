import React from "react";
import { Bars } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="flex justify-center my-5">
      <Bars
        height="80"
        width="80"
        color="#000"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
}
