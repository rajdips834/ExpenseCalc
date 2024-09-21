import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { Button, Box } from "@mui/material"; // Import MUI components
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import "./ExpenseItem.css";
import {
  firebaseAddIncome,
  firebaseDeleteExpense,
  firebaseDeleteIncome,
  firebaseEditExpense,
  firebaseGetExpenses,
  firebaseGetIncomes,
} from "../../firebase/index";
import EditExpenseModal from "../Modal/EditExpenseModal";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteExpense, editExpense } from "../../redux/slices/expensesSlice";
import { fetchExpenses } from "../../utils/fetchSessionData";
import { deleteIncome, editIncome } from "../../redux/slices/incomesSlice";
const ExpenseItem = ({ date, id, amount, title, income }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveExpense = (updatedExpense) => {
    if (income) {
      console.log("Updated Income:", updatedExpense);
      dispatch(editIncome(updatedExpense)); // Dispatch the updated income to the Redux store
      firebaseAddIncome(updatedExpense); // Add or update income in Firebase Firestore
    } else {
      console.log("Updated Expense:", updatedExpense);
      dispatch(editExpense(updatedExpense)); // Dispatch the updated expense to the Redux store
      firebaseEditExpense(updatedExpense); // Update the expense in Firebase Firestore
    }

    fetchExpenses(dispatch); // Fetch the updated expenses and refresh
    handleCloseModal(); // Close the modal
  };
  const handleDelete = () => {
    if (income) {
      firebaseDeleteIncome(id).then(() => {
        firebaseGetIncomes();
        dispatch(deleteIncome(id));
      });
    } else {
      firebaseDeleteExpense(id).then(() => {
        firebaseGetExpenses();
        dispatch(deleteExpense(id));
      });
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return !isModalOpen ? (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>
      {/* MUI Buttons for Edit and Delete */}
      <Box display="flex" justifyContent="flex-end" margin={1} gap={1}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          <EditIcon />
        </Button>

        <Button variant="contained" color="secondary" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  ) : (
    <EditExpenseModal
      open={isModalOpen}
      handleClose={handleCloseModal}
      expense={{ date, id, amount, title }}
      handleSave={handleSaveExpense}
    />
  );
};

export default ExpenseItem;
