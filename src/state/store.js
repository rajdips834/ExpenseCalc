import { thunk } from "redux-thunk";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(
  reducers,
  {
    user: null,
    expenses: [],
    amount: 0,
    isLoggedIn: false,
  },
  applyMiddleware(thunk)
);
export default store;
