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

const LoginDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/doctor/login", { email, password });

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", email);

      navigate("/doctor/dashboard");
    } catch (err) {
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
          Doctor Login
        </Typography>
        {message && <Alert severity="error">{message}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginDoctor;