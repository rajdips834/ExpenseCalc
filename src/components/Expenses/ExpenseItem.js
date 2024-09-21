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
const ExpenseItem = ({ date, id, amount, title }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expense, setExpense] = useState({
    amount: "1234",
    user: "rajdips834@gmail.com",
    date: "2024-06-20T00:00:00.000Z",
    id: "0.5139935396659225",
    title: "table",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveExpense = (updatedExpense) => {
    console.log("Updated Expense:", updatedExpense);
    setExpense(updatedExpense); // Save the updated expense
    dispatch(editExpense(updatedExpense)); // Dispatch the updated expense to the Redux store
    firebaseEditExpense(updatedExpense); // Update the expense in Firebase Firestore
    handleCloseModal();
  };
  const handleDelete = () => {
    firebaseDeleteExpense(id).then(() => {
      firebaseGetExpenses();
    });
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
