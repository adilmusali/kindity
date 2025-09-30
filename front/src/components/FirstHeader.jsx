import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaDribbble, FaBehance } from "react-icons/fa";
import { Button2 } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const FirstHeader = () => {
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container hidden sm:block">
      <div className="flex justify-between items-center py-[10px] text-[12px]">
        {/* Social Icons */}
        <div className="flex gap-4 text-gray-400">
          <a href="#"><FaFacebookF className="hover:text-[#ea2c58] transition duration-500" /></a>
          <a href="#"><FaTwitter className="hover:text-[#ea2c58] transition duration-500" /></a>
          <a href="#"><FaDribbble className="hover:text-[#ea2c58] transition duration-500" /></a>
          <a href="#"><FaBehance className="hover:text-[#ea2c58] transition duration-500" /></a>
        </div>

        <div className="flex font-[Poppins] gap-2 items-center">
          <select className="bg-slate-100 px-5 py-1 border text-slate-500 cursor-pointer">
            <option value="English">English</option>
          </select>
          
          {/*Check if user exists */}
          {user ? (
            <>
              <span className="text-slate-600 font-medium">Welcome, {user.name}!</span>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="px-4 py-1 font-bold text-[#ea2c58] hover:underline">Admin</Link>
              )}
              <Link to="/profile" className="px-4 py-1 text-slate-500 hover:text-[#ea2c58]">Profile</Link>
              <Link to="/donations" className="px-4 py-1 text-slate-500 hover:text-[#ea2c58]">History</Link>
              <button
                onClick={handleLogout}
                className="bg-slate-100 px-5 py-1 border text-slate-500 hover:bg-[#ea2c58] hover:border-[#ea2c58] hover:text-white transition duration-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"}>
              <button className="bg-slate-100 px-5 py-1 border text-slate-500 hover:bg-[#ea2c58] hover:border-[#ea2c58] hover:text-white transition duration-500">
                Login
              </button>
            </Link>
          )}

          <Link to={"/donation"}>
            <Button2 />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;