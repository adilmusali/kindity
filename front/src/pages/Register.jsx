import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({name: "", email: "", password: ""});
        toast.success("Account Created Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="py-[120px]">
        <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        </Helmet>
        <form
          onSubmit={registerUser}
          className="flex flex-col w-[500px] border-2 rounded p-5 gap-2 mx-auto"
        >
          <label>Name</label>
          <input
            className="border py-2 px-3"
            type="text"
            placeholder="Enter Name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
