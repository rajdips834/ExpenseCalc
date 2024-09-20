import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { Button, Box } from "@mui/material"; // Import MUI components
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import "./ExpenseItem.css";
import {
  firebaseDeleteExpense,
  firebaseGetExpenses,
} from "../../firebase/index";

import { useDispatch } from "react-redux";
import { deleteExpense } from "../../redux/slices/expensesSlice";
const ExpenseItem = ({ date, id, amount, title }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    firebaseDeleteExpense(id).then(() => {
      firebaseGetExpenses();
      dispatch(deleteExpense(id));
    });
  };

  const handleEdit = () => {
    // Add your edit logic here
    console.log("Edit clicked");
  };

  return (
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
  );
};

export default ExpenseItem;
