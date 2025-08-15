import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserInfo } from "../redux/userSlice";
import "../css/AccountPage.css"; // Create this CSS file

const AccountPage = () => {
  const { token, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(userInfo.firstname || "");
  const [lastname, setLastname] = useState(userInfo.lastname || "");

  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:5268/api/user/update",
        { firstname, lastname },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateUserInfo({ firstname, lastname }));
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed: " + err.response?.data);
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>Account Info</h2>
        <p className="username">Username: {userInfo.username}</p>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
        />

        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default AccountPage;
