import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import { fetchExpenses, fetchSessionUser } from "./utils/fetchSessionData";
import Navbar from "./components/Navbar/Navbar";
import { firebaseGetExpenses } from "./firebase";
const App = () => {
  const user = fetchSessionUser();
  useEffect(() => {
    if (user) {
      const expenses = firebaseGetExpenses(user.email);
      console.log("expenses", expenses);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, []);
  return (
    <>
      <ToastContainer /> <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
