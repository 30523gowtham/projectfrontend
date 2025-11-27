import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Home
import HomePage from "./Page/HomePage";

// Patient
import LoginPatient from "./Page/LoginPatient";
import RegisterPatient from "./Page/RegisterPatient";
import PatientAppointments from "./Page/PatientAppointments";
import PatientProfile from "./Profile/PatientProfile";
import PatientSettings from "./Profile/PatientSetting";

// Doctor
import LoginDoctor from "./Page/LoginDoctor";
import RegisterDoctor from "./Page/RegisterDoctor";
import DoctorDashboard from "./Page/DoctorDashboard";
import DoctorAppointments from "./Page/DoctorAppointments";

// Booking
import BookAppointment from "./Page/BookAppointment";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Patient Routes */}
        <Route path="/login/patient" element={<LoginPatient />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/settings" element={<PatientSettings />} />

        {/* Doctor Routes */}
        <Route path="/login/doctor" element={<LoginDoctor />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />

        {/* Booking Route */}
        <Route path="/book" element={<BookAppointment />} />

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;