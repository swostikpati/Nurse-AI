import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BackButton from "../components/BackButton";
import DiagnosisCard from '../components/DiagnosisCard';

function MIMICPatient (){
    const [diagnoses, setDiagnoses] = useState([]);

    const fetchDiagnoses = async (searchTerm) => {
        const response = await fetch(`http://localhost:3000/mimic-data/diagnosis/${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setDiagnoses(data.diagnosis);
    };

    const fetchSuggestions = async (searchTerm) => {
        // Optionally handle live suggestions here
        console.log('Fetching suggestions for:', searchTerm);
    };

    return (
      <div className="bg-[#d8e0e8]">
        <div className="min-h-screen m-auto">
          <div className="px-5 pt-1">
            <BackButton backLink={"/patientdata"} />
            <h1 className="font-montserrat font-bold text-[#0c1454] text-2xl mt-4">
              Enter patient registration:
              <SearchBar onSuggest={fetchSuggestions} onSearch={fetchDiagnoses} />
            </h1>
                {diagnoses.map((diagnosis, index) => (
                    <DiagnosisCard key={index} patient={diagnosis} />
                ))}
          </div>
        </div>
      </div>
    );
};

export default MIMICPatient;
