import React from "react";
import BackButton from "../components/BackButton";

function NewPatient() {
  return (
    <>
      <div className="bg-[#d8e0e8]">
        <div className="min-h-screen m-auto">
          <div className="px-5 pt-1">
            <BackButton backLink={"/patientdata"} />
            <h1 className="font-montserrat font-bold text-[#0c1454] text-2xl mt-4">
              New patient registration:
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPatient;
