import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const LoginPatient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/patient/login", { email, password });

      // ✅ Store token and email for future use
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", email);

      navigate("/patient/profile");
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed. Check credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Patient Login
        </Typography>

        {message && <Alert severity="error">{message}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPatient;