import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Home from "./routes/Home.jsx";

import Update from "./routes/Update.jsx"; // Assuming you have a component for the /update route
import Practice from "./routes/Practice.jsx";
import PatientData from "./routes/PatientData.jsx";

import PatientSelect from "./routes/PatientSelect.jsx";
import CaseSelect from "./routes/CaseSelect.jsx";
import MIMICPatient from "./routes/MIMICPatient.jsx"


import { ClerkProvider, SignUp, SignIn } from "@clerk/clerk-react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NewPatient from "./routes/NewPatient.jsx";
import PatientHistory from "./routes/PatientHistory.jsx";
import HistoryPage from "./routes/HistoryPage.jsx";
import AudioHistory from "./routes/AudioHistory.jsx";
// import { dark, shadesOfPurple } from "@clerk/themes";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={"/"} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={"/"} routing="path" path="/sign-up" />}
        />
        <Route element={<ProtectedRoute />}>
          {/* Place all protected routes as children here */}
          <Route path="/update" element={<Update />} />
          <Route path="/patientdata/:patientID" element={<PatientData />} />
          <Route path="/practice" element={<CaseSelect />} />
          <Route path="/practice/:caseID" element={<Practice />} />
          <Route path="/newpatient" element={<NewPatient />} />
          <Route path="/mimicpatient" element={<MIMICPatient />} />
          <Route path="/patientHistory" element={<PatientHistory />} />
          <Route path="/history/:dataID" element={<HistoryPage />} />
          <Route path="/patientdata" element={<PatientSelect />} />
          <Route path="/audioHistory" element={<AudioHistory />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ClerkWithRoutes />
    </Router>
  </React.StrictMode>
);
