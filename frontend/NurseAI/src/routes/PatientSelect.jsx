import React, { useState, useEffect } from "react";
import PatientSelectCard from "../components/PatientSelectCard";
import BackButton from "../components/BackButton";

import NewPatientButton from "../components/NewPatientButton";
import RouteButton from "../components/RouteButton";
import SearchPatientButton from "../components/SearchPatientButton";

function PatientSelect() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getPatients");
        const patients = await response.json();
        console.log(patients);
        setPatients(patients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

  return (
    <div className="bg-[#d8e0e8]">
      <div className="min-h-screen m-auto">
        <div className="px-5 pt-1">
          <div className="flex justify-between">
            <BackButton backLink={"/"} />
            <RouteButton routeLink={"/patientHistory"} btnText={"History"} />
          </div>

          <h1 className="font-montserrat mt-8 mx-3 font-bold text-[#0c1454] text-2xl my-4">
            Select a patient:
          </h1>
          <NewPatientButton routeLink={"/newpatient"} />
          <SearchPatientButton routeLink={"/mimicpatient"} />
          {patients.slice(1).map((p) => (
            <PatientSelectCard patient={p} key={p.ID} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientSelect;
