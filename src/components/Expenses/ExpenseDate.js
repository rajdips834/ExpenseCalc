import "./ExpenseDate.css";
const ExpenseDate = ({ date }) => {
  // Convert the string date to a Date object
  const parsedDate = new Date(date);

  // Extract the month, day, and year from the Date object
  const month = parsedDate.toLocaleString("en-US", { month: "long" });
  const day = parsedDate.toLocaleString("en-US", { day: "2-digit" });
  const year = parsedDate.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
