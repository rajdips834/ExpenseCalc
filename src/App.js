import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import { fetchExpenses, fetchSessionUser } from "./utils/fetchSessionData";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./redux/slices/loadingSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import { use } from "framer-motion/client";
import EditExpenseModal from "./components/Modal/EditExpenseModal";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchExpenses(dispatch);
  }, []);
  console.log(
    "rendered",
    useSelector((state) => state.expenses.expenses)
  );

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/random" element={<EditExpenseModal />} />
      </Routes>
    </>
  );
};

export default App;
