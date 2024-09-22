import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSavingGoals } from "../../redux/slices/savingsSlice"; // Adjust the import based on your Redux setup

const SavingsGoal = () => {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (goal) {
      dispatch(setSavingGoals(parseFloat(goal))); // Ensure goal is a number
      setGoal("");
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", backgroundColor: "#424242" }}
    >
      <Typography variant="h5" style={{ color: "#fff", marginBottom: "20px" }}>
        Set Savings Goal
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Savings Goal"
          variant="outlined"
          value={goal}
          onChange={handleGoalChange}
          InputLabelProps={{ style: { color: "#fff" } }} // Label color
          InputProps={{ style: { color: "#fff" } }} // Input text color
          style={{ marginBottom: "20px", width: "100%" }}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Set Goal
        </Button>
      </form>
    </Paper>
  );
};

export default SavingsGoal;
