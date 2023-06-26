import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container">
      <div className="py-[120px]">
        <form
          className="flex flex-col w-[500px] border border-black rounded p-5 gap-2 mx-auto"
          onSubmit={loginUser}
        >
          <label>Email</label>
          <input
            className="border py-2 px-3"
            type="email"
            placeholder="Enter Email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            className="border py-2 px-3"
            type="password"
            placeholder="Enter Password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            className="px-5 py-2 text-white bg-[#ea2c58] 
hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500 mt-[20px]"
          >
            Login
          </button>
          <div className="flex mt-[10px]">
            <p className="text-[14px] text-slate-500 font-light leading-relaxed pr-[10px]">
              Don't you have an account?
            </p>
            <Link to={"/register"}>
              <p className="text-[14px] text-[#ea2c58] font-light leading-relaxed">
                Sign Up
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
