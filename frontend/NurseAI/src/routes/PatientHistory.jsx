import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import BackButton from "../components/BackButton";
import HistoryCard from "../components/HistoryCard";

// This page shows a list of previous sessions (history)
function PatientHistory() {
  const [history, setHistory] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser(); // Get the clerk user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/patientSessions/${user.id}`
        );
        const data = await response.json();
        data.reverse();
        console.log(data);
        setHistory(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once after the initial render
  return (
    <>
      <div className="bg-[#d8e0e8]">
        <div className="min-h-screen m-auto">
          <div className="px-5 pt-1">
            <div className="flex justify-between">
              <BackButton backLink={"/patientdata"} />
            </div>

            <h1 className="font-montserrat mt-8 mx-3 font-bold text-[#0c1454] text-2xl my-4">
              Patient History:
            </h1>
            {history.map((h) => {
              return <HistoryCard historyData={h} key={h.date} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientHistory;
