import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { firebaseLogout } from "../../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleCurrencyClick = () => {
    navigate("/currency");
  };
  const handleLogoutClick = () => {
    navigate("/");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("expenses");
    localStorage.removeItem("incomes");
    firebaseLogout();
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleTransactionsClick = () => {
    navigate("/transactions");
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="regular">
        {/* Dashboard Button */}
        {isLoggedIn && (
          <Button color="inherit" onClick={handleDashboardClick}>
            Dashboard
          </Button>
        )}

        {/* Transactions Button */}
        {isLoggedIn && (
          <Button color="inherit" onClick={handleTransactionsClick}>
            Transactions
          </Button>
        )}

        {/* Dynamic Button: Shows Login or Logout based on isLoggedIn */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button color="inherit" onClick={handleCurrencyClick}>
            Currency Converter
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
