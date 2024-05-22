import React from "react";
import { Outlet, Link } from "react-router-dom";

function BackButton({ backLink }) {
  return (
    <>
      <Link to={backLink}>
        <div className="bg-white rounded-lg font-montserrat p-3 w-20 text-center text-sm mt-2 mx-3 hover:bg-[#8de9ec]">
          Back
        </div>
      </Link>
    </>
  );
}

export default BackButton;
