import React, { useEffect, useState } from "react";
import "../style/style.scss";
import { BiEdit, BiTrash, BiShow } from "react-icons/bi";

//get user from localstorage
const getUserFromLocalStorage = () => {
  let userData = JSON.parse(localStorage.getItem("users-data"));
  if (userData) {
    return userData;
  } else return [];
};

//phone number validate function
const validatePhone = (phone) => {
  let phoneValid = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phone);
  if (phoneValid) {
    return true;
  } else {
    return false;
  }
};

const InputUserAndTable = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const [getUserData, setGetUserData] = useState({});

  const [err, setErr] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");
  const [viewUser, setViewUser] = useState();
  const [open, setOpen] = useState(false);

  const handleOnChange = (e) => {
    const newUser = { ...getUserData };
    newUser[e.target.name] = e.target.value;
    setGetUserData(newUser);
  };
  console.log(getUserData);

  // add user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhone(getUserData.phone)) {
      const userData = { ...getUserData };
      userData.id = Math.floor(1000 + Math.random() * 9000);
      setGetUserData(userData);
      setUser([...user, getUserData]);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  //handle delete user
  const handleDelete = (id) => {
    let deleteUser = user.filter((user) => user.id !== id);
    setUser(deleteUser);
  };

  //get updateable user
  const getUpdateUser = (id) => {
    setIsUpdate(true);
    setUpdateUserId(id);
    const findUser = user.find((user) => user.id === id);
    setGetUserData(findUser);
  };

  //handle update user
  const handleUpdate = (e) => {
    if (validatePhone(getUserData.phone)) {
      let updateAbleUser = [...user];
      let findUser = updateAbleUser.find((user) => user.id === updateUserId);
      findUser.name = getUserData.name;
      findUser.phone = getUserData.phone;
      setUser(updateAbleUser);
      setIsUpdate(false);
      setErr(false);
    } else setErr(true);
    e.preventDefault();
  };

  // handle ViewUser
  const viewUpdateUser = (id) => {
    const findUser = user.find((user) => user.id === id);
    setViewUser(findUser);
    setOpen(true);
  };

  // save user in localstorage
  useEffect(() => {
    localStorage.setItem("users-data", JSON.stringify(user));
  }, [user]);

  // console.log("hit get", getUserData);

  return (
    <div className="main-container">
      {/* ADD User form */}
      {!isUpdate ? (
        <div className="form-container">
          <p className="form-title">Add User</p>
          <form onSubmit={handleSubmit}>
            <label className="input-label">User Name</label>
            <input
              onChange={handleOnChange}
              // value={name}
              required
              type="text"
              name="name"
            />
            <label className="input-label">Phone</label>
            <input
              onChange={handleOnChange}
              // value={phone}
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
          {user.length ? (
            <div className="form-container">
              <p className="form-title">Update User</p>
              <form onSubmit={handleUpdate}>
                <label className="input-label">User Name</label>
                <input
                  onChange={handleOnChange}
                  value={getUserData.name}
                  // placeholder={updateAbleUserData.name}
                  required
                  name="name"
                  type="text"
                />
                <label className="input-label">Phone</label>
                <input
                  onChange={handleOnChange}
                  value={getUserData.phone}
                  // placeholder={updateAbleUserData.phone}
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
      <div className="table-container">
        <div className="user-table-container">
          <p className="table-title">User Data</p>
          {user.length ? (
            <div className="table-container">
              <div className="user-data table-header">
                <div className="data-row">NAME</div>
                <div className="data-row">PHONE</div>
                <div className="data-row">ACTION</div>
              </div>
              {user.map((user) => (
                <div className="user-data user-data-content" key={user.id}>
                  <div className="data-row" style={{ overflow: "auto" }}>
                    {user.name}
                  </div>
                  <div className="data-row" style={{ padding: "0px 5px" }}>
                    {user.phone}
                  </div>
                  <div className="data-row">
                    <button onClick={() => viewUpdateUser(user.id)}>
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
      <div className="modal" style={{ display: open ? "block" : "none" }}>
        <div className="modal-content">
          <div className="close-btn">
            <button onClick={() => setOpen(!open)}>X</button>
          </div>
          <p className="view-title">User Info</p>
          {open && (
            <div>
              <p>User ID: {viewUser.id}</p>
              <p>User Name: {viewUser.name}</p>
              <p>Phone NO: {viewUser.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputUserAndTable;
