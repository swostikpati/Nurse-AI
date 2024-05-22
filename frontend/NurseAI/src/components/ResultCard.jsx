import React from 'react'
import Markdown from 'react-markdown'
import '../LineBreak.css'

function ResultCard({ resultText }) {
  return (
    <>
      <div className="font-montserrat">
        <h1 className="font-bold text-[#0c1454] text-2xl my-4">Result:</h1>
        <div className="mx-4 my-4 bg-[#F0F0F0] p-4 rounded-lg">
          <p className="display-linebreak">{resultText}</p>
        </div>
      </div>
    </>
  )
}

export default ResultCard
