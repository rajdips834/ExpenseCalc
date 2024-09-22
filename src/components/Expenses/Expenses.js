import React, { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import { useSelector } from "react-redux";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2024");
  const allExpenses = useSelector((state) => ({
    income: state.incomes.incomes,
    expenses: state.expenses.expenses,
  }));
  const expenses = props.income ? allExpenses.income : allExpenses.expenses;

  const filteredExpenses = expenses.filter((expense) => {
    return new Date(expense.date).getFullYear().toString() === filteredYear;
  });
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          yearList={expenses}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList income={props.income} items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
