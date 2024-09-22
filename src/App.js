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
import Transactions from "./pages/Transactions/Transactions";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import PieChart from "./components/PieChart/PieChart";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchExpenses(dispatch);
  }, []);

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
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit" element={<PieChart />} />
      </Routes>
    </>
  );
};

export default App;
