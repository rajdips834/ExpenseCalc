import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
