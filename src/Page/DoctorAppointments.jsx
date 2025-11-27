import React, { useEffect, useState } from "react";
import {
  Container, Typography, Card, CardContent, Grid, CircularProgress, Alert
} from "@mui/material";
import api from "../Services/api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const doctorEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (!doctorEmail) {
      setError("No doctor email found. Please log in again.");
      setLoading(false);
      return;
    }

    api.get(`/appointment/doctor/${doctorEmail}`)
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments.");
        setLoading(false);
      });
  }, [doctorEmail]);

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Your Appointments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {appointments.map((appt, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={3}>
                <CardContent sx={{ backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                  <Typography variant="h6" color="primary">
                    Patient: {appt.patientName}
                  </Typography>
                  <Typography>Date: {appt.date}</Typography>
                  <Typography>Time: {appt.time}</Typography>
                  <Typography>Reason: {appt.reason}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DoctorAppointments;