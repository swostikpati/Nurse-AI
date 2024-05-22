import mongoose from "mongoose";

const patientHistorySchema = new mongoose.Schema({
  userID: String,
  patientID: String,
  transcription: String,
  helpType: String,
  response: String,
  date: String,
});

// Create a User model based on the schema
const PatientHistoryRecord = mongoose.model(
  "PatientHistoryRecord",
  patientHistorySchema
);

export default PatientHistoryRecord;
