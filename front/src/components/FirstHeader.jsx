import React from "react";
import { FaFacebookF, FaTwitter, FaDribbble, FaBehance } from "react-icons/fa";
import { Button1, Button2 } from "./Button";

const FirstHeader = () => {
  return (
    <div className="container hidden sm:block">
      <div className="flex justify-between items-center py-[10px] text-[12px]">
        <div className="flex gap-4 text-gray-400">
          <a href="#">
            <FaFacebookF className="hover:text-[#ea2c58] transition duration-500" />
          </a>
          <a href="#">
            <FaTwitter className="hover:text-[#ea2c58] transition duration-500" />
          </a>
          <a href="#">
            <FaDribbble className="hover:text-[#ea2c58] transition duration-500" />
          </a>
          <a href="#">
            <FaBehance className="hover:text-[#ea2c58] transition duration-500" />
          </a>
        </div>
        <div className="flex font-[Poppins] gap-2">
          <select className="bg-slate-100 px-5 py-1 border text-slate-500 cursor-pointer">
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
            <option value="Indian">Indian</option>
            <option value="Aus">Aus</option>
          </select>
          <Button1 />
          <Button2 />
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;
