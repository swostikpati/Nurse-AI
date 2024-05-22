import React from "react";
import { Outlet, Link } from "react-router-dom";

function SearchPatientButton({ routeLink }) {
  return (
    <>
      <Link to={routeLink}>
        <div className="bg-white rounded-lg font-montserrat p-3 text-center text-sm mt-2 mx-3 hover:bg-[#8de9ec]">
          Search Patient in MIMIC
        </div>
      </Link>
    </>
  );
}

export default SearchPatientButton;
