import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import ResultCard from "../components/ResultCard";

function HistoryPage() {
  const [historyData, setHistoryData] = useState({});
  const { dataID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/specificSession/${dataID}`
        );
        const data = await response.json();
        console.log(data[0]);
        setHistoryData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#d8e0e8]">
        <div className="min-h-screen m-auto">
          <div className="px-5 pt-1 pb-16">
            <BackButton backLink={"/patientHistory"} />
            <h1 className="font-montserrat font-bold text-[#0c1454] text-2xl mt-4">
              Session on {historyData.date}
            </h1>
            <h1 className="my-3 font-montserrat text-[#0c1454] text-lg">
              <span className="font-bold">Patient ID:</span>{" "}
              {historyData.patientID}
            </h1>
            <h1 className="my-3 font-montserrat text-[#0c1454] text-lg">
              <span className="font-bold">Help Type:</span>{" "}
              {historyData.helpType}
            </h1>
            <h1 className="my-3 font-montserrat text-[#0c1454] text-lg">
              <span className="font-bold">Your Input:</span> "
              {historyData.transcription}"
            </h1>

            <ResultCard resultText={historyData.response} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
