import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import "../style/style.css";

const getUserFromLocalStorage = () => {
  let userData = JSON.parse(localStorage.getItem("users-data"));
  if (userData) {
    return userData;
  } else return [];
};

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
    </div>
  );
};

export default InputUser;
