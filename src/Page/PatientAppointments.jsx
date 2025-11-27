import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import api from "../Services/api"; // adjust path if needed

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    api.get(`/appointment/patient/${email}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then((res) => setAppointments(res.data))
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      });
  }, [email]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {/* Back Button and Title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/patient/profile")} title="Go back to profile">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Your Appointments
        </Typography>
      </Box>

      {/* Appointment Cards */}
      {appointments.length > 0 ? (
        <Grid container spacing={3}>
          {appointments.map((appt, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    Doctor: {appt.doctorName || appt.doctorEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialization: {appt.specialization || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Date: {appt.date}
                  </Typography>
                  <Typography variant="body2">
                    Time: {appt.time}
                  </Typography>
                  <Typography variant="body2">
                    Reason: {appt.reason}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No appointments found.
        </Typography>
      )}
    </Container>
  );
};

export default PatientAppointments;