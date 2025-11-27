import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const navigate = useNavigate();
  const patientEmail = sessionStorage.getItem("email");

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, backgroundColor: "#1976d2", color: "#fff", p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Patient Menu
        </Typography>
        <List>
          <ListItem button onClick={() => navigate("/book")}>
            <ListItemText primary="Book Appointment" />
          </ListItem>
          <ListItem button onClick={() => navigate("/patient/appointments")}>
            <ListItemText primary="View Appointments" />
          </ListItem>
          <Divider sx={{ my: 1, borderColor: "#fff" }} />
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          Welcome, Patient
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Here you can book appointments, view history, and manage your profile.
        </Typography>
        <Typography sx={{ mt: 4 }} color="text.secondary">
          Logged in as: {patientEmail}
        </Typography>
      </Box>
    </Box>
  );
};

export default PatientProfile;