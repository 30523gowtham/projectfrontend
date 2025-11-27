import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Welcome, Doctor
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate("/doctor/appointments")}
        >
          View Appointments
        </Button>
        {/* Add more dashboard actions here */}
      </Box>
    </Container>
  );
};

export default DoctorDashboard;