import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {/* App Title */}

        {/* Dynamic Button: Shows Login or Profile Icon based on isLoggedIn */}
        {isLoggedIn ? (
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
