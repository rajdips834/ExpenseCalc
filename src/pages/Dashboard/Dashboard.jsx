import React, { useEffect, useState } from "react";
import NewExpense from "../../components/NewExpense/NewExpense";
import Expenses from "../../components/Expenses/Expenses";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import PieChart from "../../components/PieChart/PieChart";
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";
import SavingsGoal from "../../components/Savings/SavingsGoals";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
export default function Dashboard() {
  const [editModal, setEditModal] = useState(false);
  const [expenses, setExpenses] = useState(
    useSelector((state) => state.expenses.expenses)
  );
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const data = useSelector((state) => ({
    income: state.incomes.incomes,
    expenses: state.expenses.expenses,
  }));
  const savings = useSelector((state) => state.savings.savingGoals);
  console.log(savings);
  useEffect(() => {
    const totalIncome = data.income.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    setTotalIncome(totalIncome);
    const totalExpenses = data.expenses.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    setTotalExpenses(totalExpenses);
  }, []);

  const isLoading = useSelector((state) => state.loading);
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  const addIncomeHandler = (income) => {
    setExpenses((prevExpenses) => {
      return [income, ...prevExpenses];
    });
  };

  return (
    isLoading && (
      <>
        <div className="container">
          <RecentTransactions />
          <div className="chart__container">
            {" "}
            <PieChart
              data={[totalIncome, totalExpenses]}
              titles={["Income", "Expenses"]}
            />
            <PieChart
              data={[totalIncome, totalExpenses, savings]}
              titles={["Remaining Money", "Expenses", "Savings"]}
            />
          </div>

          <div>
            <SavingsGoal />
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses expenses={expenses} />
          </div>
          <div>
            <NewExpense income={true} onAddExpense={addIncomeHandler} />
            <Expenses income={true} />
          </div>
        </div>
      </>
    )
  );
}
