import React, { useState, useEffect, useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useParams } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import BackButton from "../components/BackButton";
import "../LineBreak.css";
import { useUser } from "@clerk/clerk-react";

function Practice({ params }) {
  const { caseID } = useParams();
  const [audioElement, setAudioElement] = useState(null); // For audio player
  const [transcribedText, setTranscribedText] = useState(""); // For displaying transcription
  const selectedDropdown = useRef("Feedback"); // For the "select type of help" dropdown
  const [helpText, setHelpText] = useState(""); // for the final result that's generated
  const [loadingResult, setLoadingResult] = useState(false);
  const { user } = useUser(); // Get the clerk user data

  // Creates the playable audio element and also receives transcription from backend:
  const addAudioElement = async (blob) => {
    console.log(blob); // For testing purposes
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(blob);
    audio.controls = true;
    setAudioElement(audio); // Creates the audio player

    const formData = new FormData(); // To send to backend
    formData.append("audioFile", blob, "recording.webm");
    try {
      const res = await fetch(
        `http://localhost:3000/transcribe?userID=${user.id}`,
        {
          // Get transcription of audio
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setTranscribedText(data.transcription);
      console.log(data.transcription);
    } catch (error) {
      console.log("Error making fetch request", error);
    }
  };

  // To handle the dropdown for selecting what kind of help is needed:
  const handleDropdownChange = (event) => {
    selectedDropdown.current = event.target.value;
  };

  // For getting help response from backend, based on user input
  const generateHelp = async () => {
    setLoadingResult(true);

    try {
      // Payload for backend
      const dataForBackend = {
        ID: caseID,
        transcription: transcribedText,
      };
      const res = await fetch(
        `http://localhost:3000/${selectedDropdown.current}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
          },
          body: JSON.stringify(dataForBackend),
        }
      );

      const data = await res.json();
      setHelpText(data.text); // Set helpText so result is shown on the screen
    } catch (error) {
      console.log("Error generating help", error);
    }
    setLoadingResult(false);
  };

  const [cases, setCases] = useState([]);
  const [caseDetail, setCaseDetail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getCases");
        const cases = await response.json();
        console.log(cases);
        setCases(cases);

        const case1 = cases.find((item) => item.caseID === caseID);
        const caseDetail = case1.detail;
        setCaseDetail(caseDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

  return (
    <div className="bg-[#d8e0e8]">
      <div className="min-h-screen m-auto">
        <div className="font-montserrat px-5 pt-1 pb-16">
          <BackButton backLink={"/practice"} />
          <h1 className="font-bold text-[#0c1454] text-2xl mt-4">
            Practice an update with a case
          </h1>
          <br />
          <p className="font-bold text-[#0c1454] text-l mt-4">Case: {caseID}</p>
          <br />
          <p className="display-linebreak">{caseDetail}</p>
          <br />
          <h1 className="my-3 text-[#0c1454] text-lg">Record Audio:</h1>
          <div>
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              onNotAllowedOrFound={(err) => console.table(err)}
              downloadOnSavePress={false}
              downloadFileExtension="webm"
              mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
              }}
            />
          </div>
          {audioElement && (
            <div className="mt-3 mb-3">
              <h1 className="font-montserrat text-[#0c1454] text-lg mb-3">
                Recorded Audio:
              </h1>
              <audio controls src={audioElement.src}></audio>
            </div>
          )}
          {transcribedText && (
            <>
              <div className="font-montserrat text-lg mt-4 text-[#0c1454]">
                <label htmlFor="dropdown">Select an option:</label>
                {/* Dropdown select element */}
                <select
                  id="dropdown"
                  className="mx-2 p-1 rounded-lg"
                  onChange={handleDropdownChange}
                >
                  {/* Dropdown options */}
                  <option value="Feedback">Feedback</option>
                  <option value="Improve">Improve</option>
                  <option value="SOAP">SOAP Note</option>
                </select>
              </div>
              <div className="">
                <button
                  onClick={generateHelp}
                  className="font-montserrat text-xl text-white bg-[#00A67E] p-2 rounded-lg mt-8 w-48 hover:bg-[#8de9ec]"
                >
                  Generate Help
                </button>
              </div>
            </>
          )}

          {loadingResult && (
            <>
              <div className="font-montserrat text-lg text-[#0c1454] my-4">
                Loading...
              </div>
            </>
          )}
          {helpText && (
            <>
              <ResultCard resultText={helpText} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Practice;
