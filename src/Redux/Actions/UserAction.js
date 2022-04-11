import * as type from "../type";

export const setAddUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: type.ADD_USER, payload: user });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: type.DELETE_USER,
      payload: JSON.parse(localStorage.getItem("users-data")).filter(
        (user) => user.id !== id
      ),
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (id, name, phone) => async (dispatch) => {
  try {
    let updateAbleUser = [...JSON.parse(localStorage.getItem("users-data"))];
    let findUser = updateAbleUser.find((user) => user.id === id);
    findUser.name = name;
    findUser.phone = phone;
    dispatch({ type: type.UPDATE_USER, payload: updateAbleUser });
  } catch (err) {
    console.log(err);
  }
};
