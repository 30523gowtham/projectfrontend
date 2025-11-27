import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLoginClick = (event) => setAnchorEl(event.currentTarget);
  const handleLoginClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        backgroundImage: "url('https://images.unsplash.com/photo-1588776814546-ec7d2c9b6b1b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            LifeBridge Hospital
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>
            LOGIN
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleLoginClose}>
            <MenuItem onClick={() => navigate("/login/patient")}>Login as Patient</MenuItem>
            <MenuItem onClick={() => navigate("/login/doctor")}>Login as Doctor</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Center Content */}
      <Box sx={{ textAlign: "center", pt: 20 }}>
        <Typography variant="h3" fontWeight={700}>Welcome to LifeBridge</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Your health, our priority</Typography>

        <Stack spacing={2} sx={{ mt: 4 }} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register/patient")}
          >
            REGISTER AS PATIENT
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/register/doctor")}
          >
            REGISTER AS DOCTOR
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;