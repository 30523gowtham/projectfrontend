import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid
} from "@mui/material";
import api from "../Services/api"; // adjust path if needed

const BookAppointment = () => {
  const [form, setForm] = useState({
    doctorEmail: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: ""
  });

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/doctor/all")
      .then((res) => setDoctors(res.data))
      .catch((err) => {
        console.error("Doctor fetch error:", err);
        setDoctors([]);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Booking payload:", form); // ✅ Debug log
      await api.post("/appointment/book", form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      setMessage("✅ Appointment booked successfully!");
      setForm({
        doctorEmail: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: ""
      });
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("❌ Booking failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Book an Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Doctor *"
                name="doctorEmail"
                value={form.doctorEmail}
                onChange={handleChange}
                required
              >
                {doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <MenuItem key={doc.email} value={doc.email}>
                      {doc.name} ({doc.specialization})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No doctors available</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date *"
                name="appointmentDate"
                type="date"
                value={form.appointmentDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Time *"
                name="appointmentTime"
                type="time"
                value={form.appointmentTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          {message && (
            <Typography sx={{ mt: 2 }} color={message.includes("successfully") ? "green" : "error"}>
              {message}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            BOOK APPOINTMENT
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookAppointment;