import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useParams } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import BackButton from "../components/BackButton";

function PatientData({ params }) {
  const { patientID } = useParams();
  const [audioElement, setAudioElement] = useState(null); // For audio player
  const [transcribedText, setTranscribedText] = useState(""); // For displaying transcription
  const selectedDropdown = useRef("Feedback"); // For the "select type of help" dropdown
  const [helpText, setHelpText] = useState(""); // for the final result that's generated
  const [loadingResult, setLoadingResult] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser(); // Get the clerk user data

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
        ID: patientID,
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

  // Function to save the generated response to database
  const saveResponse = async (helpType) => {
    try {
      const date = new Date();
      const currentTime = date.toLocaleString();

      const dataToSave = {
        userID: user.id,
        patientID: patientID,
        transcription: transcribedText,
        helpType: helpType,
        response: helpText,
        date: currentTime,
      };
      const res = await fetch(`http://localhost:3000/savePatientSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify(dataToSave),
      });
      const resData = await res.json();
      console.log("Saved", resData);
    } catch (error) {
      console.log("Error saving the data", error);
    }
  };

  useEffect(() => {
    if (helpText !== "") {
      // Only call saveResponse if helpText is not empty
      saveResponse(selectedDropdown.current);
    }
  }, [helpText]);

  return (
    <div className="bg-[#d8e0e8]">
      <div className="min-h-screen m-auto">
        <div className="px-5 pt-1 pb-16">
          <BackButton backLink={"/patientdata"} />
          <h1 className="font-montserrat font-bold text-[#0c1454] text-2xl mt-4">
            Get help with new update
          </h1>
          <h1 className="my-3 font-montserrat text-[#0c1454] text-lg">
            Record Audio:
          </h1>
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

export default PatientData;
