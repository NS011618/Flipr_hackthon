import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from 'react-hot-toast';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({    
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 w-96 p-3 shadow border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-700">WELCOME BACK</h1>
        <hr />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit" onClick={login} className="primary">
          Login
        </button>
        <Link to="/register" className="text-gray-600 underline">
          Click Here To Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
