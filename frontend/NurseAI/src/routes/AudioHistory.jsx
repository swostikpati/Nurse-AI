import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function AudioHistory() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    const url = `http://localhost:3000/user-audios?userID=${user.id}`;

    // Fetch the audio files using axios
    axios
      .get(url)
      .then((response) => {
        setAudioFiles(response.data); // Directly setting with response.data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [user.id]); // Dependency array to ensure the effect runs when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-[#d8e0e8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Audio History</h1>
      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map((file, index) => (
            <li key={index} className="mb-4">
              <p className="text-gray-500">Recording: {index + 1}</p>
              <audio
                controls
                src={`http://localhost:3000/${file}`}
                className="mb-2"
              >
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No audio files found.</p>
      )}
    </div>
  );
}

export default AudioHistory;
