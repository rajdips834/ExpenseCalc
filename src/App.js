import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import Random from "./pages/random";
import { fetchSessionUser } from "./utils/fetchSessionData";
import { useDispatch } from "react-redux";
import { actionCreators } from "./state";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = fetchSessionUser();
    if (user) {
      dispatch(actionCreators.login(user));
    }
  }, []);

  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/random" element={<Random />} />
      </Routes>
    </>
  );
};

export default App;
