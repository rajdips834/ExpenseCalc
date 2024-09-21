import firebase from "firebase/compat/app";
import { firebaseGetExpenses, firebaseGetIncomes } from "../firebase";
import { addExpense } from "../redux/slices/expensesSlice";
import { setLoading } from "../redux/slices/loadingSlice";
import { useSelector } from "react-redux";
import { fetchUserExpenses } from "../redux/slices/expensesSlice";
import { fetchUserIncomes } from "../redux/slices/incomesSlice";
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

  const expenses = await firebaseGetExpenses(user).then((expenses) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("expenses", expenses);

    dispatch(fetchUserExpenses(expenses));
  });
  const incomes = await firebaseGetIncomes(user).then((incomes) => {
    console.log("incomes", incomes);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    dispatch(fetchUserIncomes(incomes));
  });
  dispatch(setLoading(false));
};
