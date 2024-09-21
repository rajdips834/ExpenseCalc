import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { firebaseLogout } from "../../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    navigate("/");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("expenses");
    firebaseLogout();
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {/* App Title */}

        {/* Dynamic Button: Shows Login or Profile Icon based on isLoggedIn */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
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
