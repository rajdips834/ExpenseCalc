const expensesReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case "addExpenses":
      return [...state, action.payload];
    case "deleteExpense":
      return state.filter((expense) => expense.id !== action.payload);
    case "editExpense":
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    case "setExpenses":
      return action.payload;
    default:
      return state;
  }
};
export default expensesReducer;
