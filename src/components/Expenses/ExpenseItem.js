import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { Button, Box } from "@mui/material"; // Import MUI components
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import "./ExpenseItem.css";
import {
  firebaseDeleteExpense,
  firebaseEditExpense,
  firebaseGetExpenses,
} from "../../firebase/index";
import EditExpenseModal from "../Modal/EditExpenseModal";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteExpense, editExpense } from "../../redux/slices/expensesSlice";
import { fetchExpenses } from "../../utils/fetchSessionData";
const ExpenseItem = ({ date, id, amount, title }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveExpense = (updatedExpense) => {
    console.log("Updated Expense:", updatedExpense);
    dispatch(editExpense(updatedExpense)); // Dispatch the updated expense to the Redux store
    firebaseEditExpense(updatedExpense); // Update the expense in Firebase Firestore
    fetchExpenses(dispatch);
    handleCloseModal();
  };
  const handleDelete = () => {
    firebaseDeleteExpense(id).then(() => {
      firebaseGetExpenses();
    });
    dispatch(deleteExpense(id));
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
