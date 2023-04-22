import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
function ProtectedRoute({ children }) {
  const {user}= useSelector(state => state.user)
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = React.useState(false);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "api/users/get-user-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        alert(response.data.message);
      }
      setReadyToRender(true);
    } catch (error) {
      localStorage.removeItem("token");
      setReadyToRender(true);
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (user== null) {
      getUserData();
    }
  }, []);
  return <div>
    {readyToRender ? children : <div>Loading...</div>}
  </div>;
}

export default ProtectedRoute;
