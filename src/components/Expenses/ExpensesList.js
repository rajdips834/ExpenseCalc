import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = ({ items, income, ...props }) => {
  if (items.length === 0) {
    return (
      <h2 className="expenses-list__fallback">
        {income ? "Found no incomes" : "Found no expenses."}
      </h2>
    );
  }

  return (
    <ul className="expenses-list">
      {items?.map((expense) => (
        <ExpenseItem
          income={true}
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          id={expense.id}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
