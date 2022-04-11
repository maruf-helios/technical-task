import React, { useEffect, useState } from "react";
import "../style/style.scss";
import { BiEdit, BiTrash, BiShow } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  setAddUser,
  updateUser,
} from "../Redux/Actions/UserAction";

//phone number validate function
const validatePhone = (phone) => {
  return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phone);
};

const InputUserAndTable = () => {
  const { users } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const [user, setUser] = useState(users);
  const [getUserData, setGetUserData] = useState({});
  const [err, setErr] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");

  const navigate = useNavigate();

  //handle form data
  const handleOnChange = (e) => {
    const newUser = { ...getUserData };
    newUser[e.target.name] = e.target.value;
    setGetUserData(newUser);
  };

  // add user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhone(getUserData.phone)) {
      const id = {
        id: uuidv4(),
      };
      setUser([...users, { ...getUserData, ...id }]);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  //handle delete user
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  //get updateable user
  const getUpdateUser = (id) => {
    setIsUpdate(true);
    setUpdateUserId(id);
    const findUser = users.find((user) => user.id === id);
    setGetUserData(findUser);
  };
  //handle update user
  const handleUpdate = (e) => {
    e.preventDefault();
    if (validatePhone(getUserData.phone)) {
      dispatch(updateUser(updateUserId, getUserData.name, getUserData.phone));
      setIsUpdate(false);
      setErr(false);
    } else setErr(true);
  };

  useEffect(() => {
    dispatch(setAddUser(user));
  }, [user, dispatch]);

  return (
    <div className="main-container">
      {/* ADD User form */}
      {!isUpdate ? (
        <div className="form-container">
          <p className="form-title">Add User</p>
          <form onSubmit={handleSubmit}>
            <label className="input-label">User Name</label>
            <input onChange={handleOnChange} required type="text" name="name" />
            <label className="input-label">Phone</label>
            <input
              onChange={handleOnChange}
              required
              type="text"
              name="phone"
            />
            <label>
              {err && <p className="err-msg">Enter valid number!</p>}
            </label>
            <button className="input-btn" type="submit">
              ADD USER
            </button>
          </form>
        </div>
      ) : (
        // Update User form
        <>
          {users.length ? (
            <div className="form-container">
              <p className="form-title">Update User</p>
              <form onSubmit={handleUpdate}>
                <label className="input-label">User Name</label>
                <input
                  onChange={handleOnChange}
                  value={getUserData.name}
                  required
                  name="name"
                  type="text"
                />
                <label className="input-label">Phone</label>
                <input
                  onChange={handleOnChange}
                  value={getUserData.phone}
                  required
                  name="phone"
                  type="text"
                />
                <label>
                  {err && <p className="err-msg">Enter valid number!</p>}
                </label>
                <button className="input-btn" type="submit">
                  UPDATE USER
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {/* User Data Table */}
      <div className="main-table-container">
        <div className="user-table-container">
          <p className="table-title">User Data</p>
          {users.length ? (
            <div className="table-container">
              <div className="table-header">
                <div className="data-row">NAME</div>
                <div className="data-row">PHONE</div>
                <div className="data-row">ACTION</div>
              </div>
              {users.map((user) => (
                <div className="user-data user-data-content" key={user.id}>
                  <div className="data-row data-overflow">
                    <span>Name:</span>
                    {user.name}
                  </div>
                  <div className="data-row data-overflow">
                    <span>Phone:</span>
                    {user.phone}
                  </div>
                  <div className="data-row">
                    <span>Actions:</span>
                    <button onClick={() => navigate(`/view/${user.id}`)}>
                      <BiShow className="icon-btn" />
                    </button>
                    <button onClick={() => getUpdateUser(user.id)}>
                      <BiEdit className="icon-btn" />
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <BiTrash className="icon-btn" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="user-not-found">
              No user found!{" "}
              <span onClick={() => setIsUpdate(false)} className="add-user-req">
                Add user
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputUserAndTable;
