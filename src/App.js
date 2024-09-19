import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import { fetchExpenses, fetchSessionUser } from "./utils/fetchSessionData";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { setLoading } from "./redux/slices/loadingSlice";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading());
    const loadExpenses = async () => {
      await fetchExpenses(dispatch);
    };

    loadExpenses();
    fetchSessionUser();
  }, []);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
