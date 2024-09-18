import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import Random from "./pages/random";
import { fetchExpenses, fetchSessionUser } from "./utils/fetchSessionData";
import { useDispatch } from "react-redux";
import { actionCreators } from "./state";
import Navbar from "./components/Navbar/Navbar";
import { firebaseGetExpenses } from "./firebase";
import { useSelector } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      const expenses = firebaseGetExpenses(user.email);
      console.log("expenses", expenses);
      dispatch(actionCreators.setExpenses(expenses));
      localStorage.setItem("expenses", JSON.stringify(expenses));
      dispatch(actionCreators.login(user));
    }
  }, []);
  return (
    <>
      <ToastContainer /> <Navbar />
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
