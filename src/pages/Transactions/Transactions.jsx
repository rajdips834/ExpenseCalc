import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesList from "../../components/Expenses/ExpensesList";
import "./Transactions.css";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import { setTotalIncome } from "../../redux/slices/incomesSlice";
import { setTotalExpense } from "../../redux/slices/expensesSlice";

export default function Transactions() {
  const data = useSelector((state) => ({
    income: state.incomes.incomes,
    expenses: state.expenses.expenses,
  }));
  const dispatch = useDispatch();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  // Use useEffect to calculate total income when data.income changes
  useEffect(() => {
    const totalIncome = data.income.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    setIncome(totalIncome);
    const totalExpenses = data.expenses.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    setExpenses(totalExpenses);
    dispatch(setTotalIncome());
    dispatch(setTotalExpense());
  }, [data]); // Run only when data.income changes

  return (
    <>
      <CurrencyConverter />

      <div>
        {" "}
        <h1 className="container__transactions">Transactions</h1>
      </div>
      <div className="container__transactions"></div>
      <div className="container__transactions">
        <div className="sub__container__transactions">
          <div>
            <h1>Expenses</h1>
            <h2>Total Expenses:$ {expenses}</h2> {/* Display total income */}
          </div>
          <ExpensesList items={data.expenses} income={false} />
        </div>
        <div className="sub__container__transactions">
          <div className="sub__container__transactions">
            <h1>Incomes</h1>
            <h2>Total Income:$ {income}</h2> {/* Display total income */}
          </div>
          <ExpensesList items={data.income} income={true} />
        </div>
      </div>
    </>
  );
}
