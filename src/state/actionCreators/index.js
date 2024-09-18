const depositMoney = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "deposit",
      payload: amount,
    });
  };
};
const withdrawMoney = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "withdraw",
      payload: amount,
    });
  };
};
const login = (data) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: data,
    });
  };
};
const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "logout",
    });
  };
};
export { depositMoney, withdrawMoney, login, logout };
