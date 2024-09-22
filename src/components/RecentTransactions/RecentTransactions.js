import React from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import ExpenseItem from "../Expenses/ExpenseItem";

const RecentTransactions = () => {
  // Fetching recent transactions (assumed structure of incomes and expenses)
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  // Combine incomes and expenses, sort them by date (assuming date is in ISO format)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);
  const recentIncomes = [...incomes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <Container>
      <Paper
        elevation={3}
        style={{ backgroundColor: "#424242", color: "#fff", padding: "16px" }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Incomes
        </Typography>
        <List>
          {recentIncomes.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ExpenseItem
                income={true}
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                id={transaction.id}
              />
              <Divider />
            </React.Fragment>
          ))}
          <Typography variant="h5" component="h2" gutterBottom>
            Recent Expenses
          </Typography>
          {recentExpenses.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ExpenseItem
                income={false}
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                id={transaction.id}
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default RecentTransactions;
