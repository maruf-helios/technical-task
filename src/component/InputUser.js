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
  let phoneValid = /^(?:\+88|01)?\d{11}\r?$/.test(phone);
  if (phoneValid) {
    return true;
  } else {
    return false;
  }
};

const InputUser = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [err, setErr] = useState(false);

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
      console.log(getInputUser);
      setUser([...user, getInputUser]);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const handleDelete = (id) => {
    let deleteUser = user.filter((user) => user.id !== id);
    setUser(deleteUser);
  };

  // save user in localstorage
  useEffect(() => {
    localStorage.setItem("users-data", JSON.stringify(user));
  }, [user]);

  console.log(user);
  return (
    <div className="main-container">
      <div className="form-container">
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
          <label>{err && <p>Enter valid number</p>}</label>
          <button className="input-btn" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
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
                    <button>
                      <BiShow className="icon-btn" />
                    </button>
                    <button>
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
            <div className="user-not-found">No user found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputUser;
