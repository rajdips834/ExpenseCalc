import firebase from "firebase/compat/app";
import { firebaseGetExpenses } from "../firebase";
import { addExpense } from "../redux/slices/expensesSlice";
import { setLoading } from "../redux/slices/loadingSlice";
import { useSelector } from "react-redux";
import { fetchUserExpenses } from "../redux/slices/expensesSlice";
export const fetchSessionUser = () => {
  const user = localStorage.getItem("user");

  if (user && user != "undefined") {
    return JSON.parse(user);
  } else {
    localStorage.removeItem("user"); // Clear only the specific item
    return null; // Or handle this case differently if needed
  }
};
export const fetchExpenses = async (dispatch) => {
  dispatch(setLoading(true));
  const user = fetchSessionUser();
  if (!user) {
    console.error("No user found in session.");
    return;
  }

  console.log("Fetching expenses for user:", user);

  const expenses = await firebaseGetExpenses(user).then((expenses) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses fetched:", expenses);
    dispatch(fetchUserExpenses(expenses));
  });
  dispatch(setLoading(false));

  return expenses;
};
