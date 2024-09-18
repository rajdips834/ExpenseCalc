const amountReducer = (state = { amount: 0 }, action) => {
  switch (action.type) {
    case "deposit":
      return {
        amount: state.amount + action.payload,
        ...state,
      };
    case "withdraw":
      return {
        amount: state.amount - action.payload,
        ...state,
      };
    default:
      return state;
  }
};
export default amountReducer;
