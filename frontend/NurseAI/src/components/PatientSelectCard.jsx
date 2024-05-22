import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function PatientSelectCard({ patient }) {
  return (
    <>
      <Link to={`/patientdata/${patient.ID}`}>
        <div className="mx-3 bg-white hover:bg-[#8de9ec] rounded-lg p-3 my-2 font-montserrat">
          <span className="font-bold">
            {patient.firstName} {patient.lastName}
          </span>
          <p className="text-xs">Age: {patient.age}</p>
          <p className="text-xs">Gender: {patient.gender}</p>
          <p className="text-xs">ID: {patient.ID}</p>
        </div>
      </Link>
    </>
  )
}

export default PatientSelectCard
