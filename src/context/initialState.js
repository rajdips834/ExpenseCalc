import {
  fetchSessionUser,
  fetchSessionUserMode,
} from "../utils/fetchSessionData";

const sessionUser = fetchSessionUser();
const sessionUserMode = fetchSessionUserMode();
export const initialState = {
  user: sessionUser,
  expenses: null,
  income: 0,
  expense: 0,
  adminMode: sessionUserMode,
  darkMode: false,
};
