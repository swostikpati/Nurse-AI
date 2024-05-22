import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function CaseSelectCard({ pCase }) {
  const truncateDescription = (description) => {
    // Split the description into words
    const words = description.split(' ')
    // If the description has more than 200 words, truncate it
    if (words.length > 200) {
      // Join the first 200 words and add an ellipsis
      return words.slice(0, 100).join(' ') + '...'
    }
    // Otherwise, return the original description
    return description
  }

  return (
    <>
      <Link to={`/practice/${pCase.caseID}`}>
        <div className="mx-3 bg-white hover:bg-[#8de9ec] rounded-lg p-3 my-2 font-montserrat">
          <h2 className="font-bold">ID: {pCase.caseID}</h2>
          <p className="text-s">
            Description: {truncateDescription(pCase.detail)}
          </p>
        </div>
      </Link>
    </>
  )
}

export default CaseSelectCard
