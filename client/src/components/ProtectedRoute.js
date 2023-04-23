import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "./DefaultLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
function ProtectedRoute({ children }) {
  const {user}= useSelector(state => state.user)
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = React.useState(false);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post(
        "api/users/get-user-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading())
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        alert(response.data.message);
      }
      setReadyToRender(true);
    } catch (error) {
      dispatch(HideLoading())
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
    {readyToRender && <DefaultLayout>{children}</DefaultLayout>}
  </div>;
}

export default ProtectedRoute;
