import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditExpenseModal = ({ open, handleClose, expense, handleSave }) => {
  // Initialize state for editing the expense
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  // Handle date change and convert it to ISO format
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value).toISOString();
    setEditedExpense((prevExpense) => ({
      ...prevExpense,
      date: newDate,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={editedExpense.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Amount"
          name="amount"
          value={editedExpense.amount}
          onChange={handleChange}
          type="number"
          fullWidth
        />

        <TextField
          margin="dense"
          label="Date"
          name="date"
          type="date"
          value={editedExpense?.date?.split("T")[0]} // Format for date input
          onChange={handleDateChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSave(editedExpense)}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseModal;
