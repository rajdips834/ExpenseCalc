import firebase from "firebase/compat/app";
import { firebaseGetExpenses } from "../firebase";
import { addExpense } from "../redux/slices/expensesSlice";
import { setLoading } from "../redux/slices/loadingSlice";
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
  const user = fetchSessionUser();
  const expenses = await firebaseGetExpenses(user);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenses.forEach((expense) => {
    dispatch(addExpense(expense));
  });

  return expenses;
};
