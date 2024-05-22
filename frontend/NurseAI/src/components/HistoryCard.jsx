import React from "react";
import { Outlet, Link } from "react-router-dom";

function HistoryCard({ historyData }) {
  return (
    <>
      <Link to={`/history/${historyData._id}`}>
        <div className="mx-3 bg-white hover:bg-[#8de9ec] rounded-lg p-3 my-2 font-montserrat">
          <span className="font-bold">Date: {historyData.date}</span>
          <p className="text-xs">Patient ID: {historyData.patientID}</p>
          <p className="text-xs">Help Type: {historyData.helpType}</p>
        </div>
      </Link>
    </>
  );
}

export default HistoryCard;
