import React, { useState, useEffect } from 'react'
import CaseSelectCard from '../components/CaseSelectCard'
import BackButton from '../components/BackButton'

function CaseSelect() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getCases')
        const cases = await response.json()
        console.log(cases)
        setCases(cases)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // The empty array means this effect runs once after the initial render

  return (
    <div className="bg-[#d8e0e8]">
      <div className="min-h-screen m-auto">
        <div className="px-5 pt-1">
          <BackButton backLink={'/'} />
          <h1 className="font-montserrat font-bold text-[#0c1454] text-2xl my-4">
            Select a case:
          </h1>
          {cases.map((c) => (
            <CaseSelectCard pCase={c} key={c.caseID} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CaseSelect
