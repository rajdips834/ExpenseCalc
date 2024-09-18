const amountReducer = (state = { amount: 0 }, action) => {
  switch (action.type) {
    case "deposit":
      return {
        ...state,
        amount: state.amount + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        amount: state.amount - action.payload,
      };
    default:
      return state;
  }
};
export default amountReducer;
