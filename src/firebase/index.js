import { app, firestore, storage, auth } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  addDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { toast } from "react-toastify";
import { fetchExpenses, fetchSessionUser } from "../utils/fetchSessionData";

// Signup with email and password

// Function to sign up a user with email and password
export const EMAILSIGNUP = async (email, password) => {
  const firebaseAuth = getAuth(app);

  try {
    // Create a new user with the email and password
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    // The signed-in user information
    const user = userCredential.user;
    console.log("User signed up successfully:", user);

    // You can return or handle the user data as needed
    return user;
  } catch (error) {
    // Handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error during sign up:", errorCode, errorMessage);

    // Handle specific errors or return a message
    throw error;
  }
};
//  Signin with email and password
export const EMAILSIGNIN = async (email, password) => {
  const firebaseAuth = getAuth(app);
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );

  return result;
};

// Fetch All Food Products  from Firestore

// Logout user
export const firebaseLogout = async () => {
  await getAuth(app).signOut();
};

export const firebaseAddExpense = async (data) => {
  await setDoc(doc(firestore, "Expenses", `${data.id}`), data, {
    merge: true,
  });
};

export const firebaseAddIncome = async (data) => {
  await setDoc(doc(firestore, "Income", `${data.id}`), data, {
    merge: true,
  });
};

export const firebaseDeleteExpense = async (uid) => {
  await deleteDoc(doc(firestore, "Expenses", `${uid}`)).then(() => {
    toast.success("Expense deleted successfully");
  });
};
export const firebaseDeleteIncome = async (uid) => {
  await deleteDoc(doc(firestore, "Income", `${uid}`)).then((result) => {
    console.log("result", result);
    toast.success("Income deleted successfully");
  });
};

export const firebaseEditExpense = async (expense) => {
  try {
    const expenseRef = doc(firestore, "Expenses", expense.id);
    await updateDoc(expenseRef, expense);
  } catch (error) {
    console.error("Error updating expense: ", error);
  }
};
export const firebaseGetExpenses = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("No user found in local storage");
    return [];
  }

  try {
    const expensesSnapshot = await getDocs(
      query(collection(firestore, "Expenses"))
    );
    const expenses = expensesSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Filter the expenses by user and return only relevant ones
      return data.user === user ? data : null;
    });
    // Remove null values from the result
    const filteredExpenses = expenses.filter((expense) => expense !== null);
    return filteredExpenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};
export const firebaseGetIncomes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("No user found in local storage");
    return [];
  }

  try {
    const expensesSnapshot = await getDocs(
      query(collection(firestore, "Income"))
    );
    const incomes = expensesSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Filter the expenses by user and return only relevant ones
      return data.user === user ? data : null;
    });
    // Remove null values from the result
    const filteredIncomes = incomes.filter((income) => income !== null);
    return filteredIncomes;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};
