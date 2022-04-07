import React, { useEffect, useState } from "react";
import "../style/style.css";
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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [err, setErr] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");
  const [updateAbleUserData, setUpdateAbleUserData] = useState();
  const [viewUser, setViewUser] = useState();
  const [open, setOpen] = useState(false);

  // add user
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validatePhone(phone);
    if (isValid && name) {
      let getInputUser = {
        name: name,
        phone: phone,
        id: Math.floor(1000 + Math.random() * 9000),
      };
      setUser([...user, getInputUser]);
      // setName("");
      // setPhone("");
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
    setUpdateAbleUserData(findUser);
    setName(findUser.name);
    setPhone(findUser.phone);
  };

  //handle update user
  const handleUpdate = (e) => {
    let isValid = validatePhone(phone);
    if (isValid && name) {
      let updateAbleUser = [...user];
      let findUser = updateAbleUser.find((user) => user.id === updateUserId);
      findUser.name = name;
      findUser.phone = phone;
      setUser(updateAbleUser);
      setErr(false);
      setIsUpdate(false);
      setName("");
      setPhone("");
    } else {
      setErr(true);
    }
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

  return (
    <div className="main-container">
      {/* ADD User form */}
      {!isUpdate ? (
        <div className="form-container">
          <p className="form-title">Add User</p>
          <form onSubmit={handleSubmit}>
            <label className="input-label">User Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
            />
            <label className="input-label">Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              type="text"
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder={updateAbleUserData.name}
                  required
                  type="text"
                />
                <label className="input-label">Phone</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder={updateAbleUserData.phone}
                  required
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
                  <div className="data-row">{user.name}</div>
                  <div className="data-row">{user.phone}</div>
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
