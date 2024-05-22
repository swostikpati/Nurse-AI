import React from "react";
import { Outlet, Link } from "react-router-dom";

function RouteButton({ routeLink, btnText }) {
  return (
    <>
      <Link to={routeLink}>
        <div className="bg-white rounded-lg font-montserrat p-3 max-w-fit text-center text-sm mt-2 mx-3 hover:bg-[#8de9ec]">
          {btnText}
        </div>
      </Link>
    </>
  );
}

export default RouteButton;
