import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function DiagnosisSelectCard({ patient }) {
    // console.log(patient)
  return (
    <>
      {/* <Link to={`/patientdata/${patient.ID}`}> */}
        <div className="mx-3 bg-white hover:bg-[#8de9ec] rounded-lg p-3 my-2 font-montserrat">
          <span className="font-bold">
            Diagnosis: {patient.long_title}
          </span>
          <p className="text-xs">Patient ID: {patient.subject_id}</p>
        </div>
      {/* </Link> */}
    </>
  )
}

export default DiagnosisSelectCard