import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../style/view-style.scss";

const ViewUserData = () => {
  const { id } = useParams();

  const { users } = useSelector((state) => state.userState);
  const findUser = users.find((user) => user.id === id);

  return (
    <div className="view-container">
      <h3 className="view-user-title">User Details</h3>
      <div className="details">
        <p>
          <span>ID:</span> {findUser.id}
        </p>
        <p>
          <span>Name:</span> {findUser.name}
        </p>
        <p>
          <span>Phone: </span>
          {findUser.phone}
        </p>
      </div>
      <Link className="back-home" to="/">
        Back to home
      </Link>
    </div>
  );
};

export default ViewUserData;
