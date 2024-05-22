import express from "express";
import OpenAI from "openai";
import cors from "cors";
import multer from "multer";
// import fs from "fs";
import { promises as fsPromises, createReadStream } from "fs";

import dotenv from "dotenv";
import { config } from "dotenv";

// Connect to database
import connectDB from "./database/db.js";
import PatientHistoryRecord from "./database/patientHistory.js";
connectDB();

import get_soap from "./utilsSOAP.js";
import get_improved from "./utilsImproved.js";
import get_feedback from "./utilsFeedback.js";

import patientsData from "./PatientData.json" assert { type: "json" }; // Import the JSON file
import caseData from "./CaseData.json" assert { type: "json" }; // Import the JSON file
import { mimic_diagnosis, mimic_patient_id } from "./mimic-script.js";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
const port = 3000;

app.use(cors()); // Use cors so that you can do cross origin api calls (from frontend)
app.use(express.json());

app.use("/", express.static("uploads"));

// Multer setup for file upload - includes the userID in the filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const userID = req.query.userID;
    const date = new Date().toISOString().replace(/:/g, "-"); // Safe for filenames
    const uniqueSuffix = `${userID}--x--${date}`; // Using '--x--' as a unique separator
    const fileExtension = file.originalname.split(".").pop(); // Safely extracting file extension
    const newFilename = `${uniqueSuffix}--x--.${fileExtension}`; // Constructing the filename
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// API Endpoint for transcription -----------------------------------------------------
app.post("/transcribe", upload.single("audioFile"), async (req, res) => {
  try {
    // File saved locally, now read it and send to OpenAI API
    const filePath = req.file.path;
    // const fileStream = fs.createReadStream(filePath);
    const fileStream = createReadStream(filePath);

    // Call the OpenAI API with the file stream
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
    });

    console.log(transcription.text);
    // Send the transcription text back to the client
    res.json({ transcription: transcription.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    res
      .status(500)
      .json({ error: "An error occurred while transcribing audio" });
  }
});

/* NOTE:
  the json payload for the below routes is in the form:
  {
    ID: "contains the patient's ID",
    transcription: "Contains the text transcription of the audio recording"
  }
*/

// 1: Get feedback ----------------------------------------------------------------
app.post("/feedback", async (req, res) => {
  try {
    const { ID, transcription } = req.body;

    // console.log('Hello!')
    // console.log(ID, transcription)

    let chosen_case = "";
    if (ID[0] == "P") {
      chosen_case = JSON.stringify(patientsData.find((item) => item.ID === ID));
    } else if (ID[0] == "C") {
      let chosen_obj = caseData.find((item) => item.caseID === ID);
      chosen_case = chosen_obj.detail;
    } else {
      chosen_case = "";
    }
    // console.log(chosen_case)

    let response = await get_feedback(transcription, chosen_case);

    console.log(response.message.content);
    res.json({
      text: `${response.message.content}`,
    });
  } catch (error) {
    console.log(error);
  }
});

// 2: Improve the update ---------------------------------------------------------
app.post("/improve", async (req, res) => {
  const { ID, transcription } = req.body;

  // console.log('Hello!')
  // console.log(ID, transcription)

  let chosen_case = "";
  if (ID[0] == "P") {
    chosen_case = JSON.stringify(patientsData.find((item) => item.ID === ID));
  } else if (ID[0] == "C") {
    let chosen_obj = caseData.find((item) => item.caseID === ID);
    chosen_case = chosen_obj.detail;
  } else {
    chosen_case = "";
  }

  let response = await get_improved(transcription, chosen_case);
  console.log(response.message.content);
  res.json({
    text: `${response.message.content}`,
  });
});

// 3: Generate SOAP Note ---------------------------------------------------------
app.post("/soap", async (req, res) => {
  const { ID, transcription } = req.body;

  let chosen_case = "";
  if (ID[0] == "P") {
    chosen_case = JSON.stringify(patientsData.find((item) => item.ID === ID));
  } else if (ID[0] == "C") {
    let chosen_obj = caseData.find((item) => item.caseID === ID);
    chosen_case = chosen_obj.detail;
  }

  let response = await get_soap(transcription, chosen_case);

  console.log(response.message.content);
  res.json({
    text: `${response.message.content}`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/* DATA DISPLAY */
app.get("/getPatients", (req, res) => {
  res.json(patientsData);
});

app.get("/getCases", (req, res) => {
  res.json(caseData);
});
//get: sendign this data to client

// Storing patient practice session to database ------------------------------------------------

app.post("/savePatientSession", async (req, res) => {
  try {
    const { userID, patientID, transcription, helpType, response, date } =
      req.body;
    const newRecord = new PatientHistoryRecord({
      userID,
      patientID,
      transcription,
      helpType,
      response,
      date,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
    console.log("Saved to db");
  } catch (error) {
    console.log("Error saving to db", error);
  }
});

app.get("/patientSessions/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const sessions = await PatientHistoryRecord.find({ userID });
    res.json(sessions);
  } catch (error) {
    console.error("Error retrieving sessions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/specificSession/:sessionID", async (req, res) => {
  try {
    const { sessionID } = req.params;
    const session = await PatientHistoryRecord.find({ _id: sessionID });
    res.json(session);
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Retrieving audiofiles from the server ------------------------------------------------
// currently no frontend implementation for this
app.get("/user-audios", async (req, res) => {
  const userId = req.query.userID;
  try {
    const files = await fsPromises.readdir("uploads"); // Read all files in the uploads directory
    const userFiles = files.filter((file) => file.includes(userId)); // Filter files by userId
    res.json(userFiles); // Send the list of files back to the client
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading files.");
  }
});

app.get("/mimic-data", async (req, res) => {
  const patientInfo = await mimic_patient_id();

  const searchTerm = req.query.term;
  if (!searchTerm) {
      res.json([]);
      return;
  }
  const filteredData = patientInfo.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

  res.json({"IDs": filteredData});
})

app.get("/mimic-data/diagnosis/:id", async (req, res) => {
  const patientID = req.params.id;
  if (!patientID) {
      res.json([]);
      return;
  }
  console.log(patientID);

  const patientInfo = await mimic_diagnosis(parseInt(patientID));

  console.log(patientID, patientInfo);
  // const searchTerm = req.query.term;
  // if (!searchTerm) {
  //     res.json([]);
  //     return;
  // }
  // const filteredData = patientInfo.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

  res.json({"diagnosis": patientInfo});
})