import firebase from "firebase/compat/app";
import { firebaseGetExpenses } from "../firebase";
export const fetchSessionUser = () => {
  const user = localStorage.getItem("user");

  if (user && user != "undefined") {
    return JSON.parse(user);
  } else {
    localStorage.removeItem("user"); // Clear only the specific item
    return null; // Or handle this case differently if needed
  }
};
export const fetchExpenses = async () => {
  const user = fetchSessionUser();
  console.log(user);
  const expenses = await firebaseGetExpenses(user.email);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  console.log(expenses);
  return expenses;
};
