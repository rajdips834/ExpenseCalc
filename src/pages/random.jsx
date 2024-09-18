import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state/index";
export default function Random() {
  const amount = useSelector((state) => state.amount);
  const loggedIn = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(amount);
  return (
    <div>
      balance={amount.amount}
      <button onClick={() => dispatch(actionCreators.depositMoney(1000))}>
        Add
      </button>
      <button onClick={() => dispatch(actionCreators.withdrawMoney(1000))}>
        Subtract
      </button>
      logged in?:{loggedIn.isLoggedIn.toString()}
      <button
        onClick={() => {
          dispatch(actionCreators.login());
          localStorage.setItem("user", JSON.stringify(loggedIn));
        }}
      >
        Login
      </button>
      <button onClick={() => dispatch(actionCreators.logout())}>Logout</button>
    </div>
  );
}
