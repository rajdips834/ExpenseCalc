const authReducer = (state = { isLoggedIn: false, user: null }, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
