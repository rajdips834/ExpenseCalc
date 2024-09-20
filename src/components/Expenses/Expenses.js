import React, { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import { useSelector } from "react-redux";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  // const filteredExpenses = props?.expenses?.filter((expense) => {
  //   return new Date(expense.date).getFullYear().toString() === filteredYear;
  // });
  const [expenses, setExpenses] = useState(
    useSelector((state) => state.expenses)
  );
  const filteredExpenses = props.expenses;
  console.log("props", props.expenses);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          yearList={props.expenses}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
