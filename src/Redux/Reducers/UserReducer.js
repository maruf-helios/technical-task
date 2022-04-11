import * as type from "../type";

const initialState = {
  users: JSON.parse(localStorage.getItem("users-data")) || [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_USER:
      localStorage.setItem("users-data", JSON.stringify(action.payload));
      return {
        ...state,
        users: action.payload,
      };

    case type.DELETE_USER:
      localStorage.setItem("users-data", JSON.stringify(action.payload));
      return {
        ...state,
        users: action.payload,
      };

    case type.UPDATE_USER:
      localStorage.setItem("users-data", JSON.stringify(action.payload));
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
