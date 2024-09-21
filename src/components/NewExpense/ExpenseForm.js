import React, { useState } from "react";
import { firebaseAddExpense } from "../../firebase";
import "./ExpenseForm.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addExpense } from "../../redux/slices/expensesSlice";

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: event.target.value };
    });
  };

  const dateChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredDate: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const { enteredTitle, enteredAmount, enteredDate } = userInput;

    // Validate if any field is empty
    if (!enteredTitle || !enteredAmount || !enteredDate) {
      toast.error("Please fill out all fields: Title, Amount, and Date.");
      return; // Stop the form submission if validation fails
    }

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate).toISOString(),
      user: user,
      id: Math.random().toString(),
    };

    firebaseAddExpense(expenseData)
      .then(() => {
        toast.success(
          props.income
            ? "Income Added Successfully"
            : "Expense Added Successfully"
        );
        dispatch(addExpense(expenseData));
      })
      .catch((error) => {
        toast.error(
          props.income
            ? `Error adding income: ${error.message}`
            : `Error adding expense: ${error.message}`
        );
      })
      .finally(() =>
        setUserInput({
          enteredTitle: "",
          enteredAmount: "",
          enteredDate: "",
        })
      );

    props.onSaveExpenseData(expenseData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={userInput.enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
