import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const PatientSettings = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    address: ""
  });

  const [message, setMessage] = useState("");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/patient/${email}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then((res) => setForm(res.data))
      .catch(() => setMessage("❌ Failed to load profile."));
  }, [email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    api
      .put("/patient/update", form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      })
      .then(() => setMessage("✅ Profile updated successfully!"))
      .catch(() => setMessage("❌ Update failed. Please try again."));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate("/patient/profile")} title="Back to Dashboard">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Settings
        </Typography>
      </Box>

      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} multiline rows={2} />
          </Grid>
        </Grid>

        {message && (
          <Typography sx={{ mt: 2 }} color={message.includes("✅") ? "green" : "error"}>
            {message}
          </Typography>
        )}

        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default PatientSettings;