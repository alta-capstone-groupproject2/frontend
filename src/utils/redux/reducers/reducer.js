const initialState = {
  isLoggedIn: false,
  role:'',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "ROLE":
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};